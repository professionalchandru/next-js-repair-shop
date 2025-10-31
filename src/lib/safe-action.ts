import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e, utils) {
        const { clientInput, metadata } = utils

        // Helper function to extract database error details
        const extractDbError = (error: unknown): { code?: string; detail?: string } | null => {
            if (error && typeof error === 'object' && 'code' in error && 'detail' in error) {
                return error as { code: string; detail: string }
            }
            return null
        }

        // Check for database constraint violations (unique key violations)
        let dbError: { code?: string; detail?: string } | null = null

        if (e.constructor.name === 'NeonDbError') {
            dbError = extractDbError(e)
        } else if (e.constructor.name === 'DrizzleQueryError') {
            // DrizzleQueryError wraps the original error in its cause property
            const errorWithCause = e as Error & { cause?: unknown }
            dbError = extractDbError(errorWithCause.cause)
        }

        // Handle unique constraint violation
        if (dbError?.code === '23505') {
            return `Unique entry required. ${dbError.detail}`
        }

        // Log error to Sentry for monitoring
        Sentry.captureException(e, (scope) => {
            scope.clear()
            scope.setContext("serverError", { message: e.message })
            scope.setContext("metadata", { actionName: metadata?.actionName })
            scope.setContext("clientInput", { clientInput })
            return scope
        })

        // Return user-friendly error messages
        if (e.constructor.name === 'NeonDbError' || e.constructor.name === 'DrizzleQueryError') {
            return "Database Error: Your data did not save. Support will be notified."
        }

        return e.message
    }
})