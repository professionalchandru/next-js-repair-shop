import { db } from '@/db'
import { customers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getCustomer(id: number) {
    try {
        const customer = await db.select()
            .from(customers)
            .where(eq(customers.id, id))

        return customer[0]
    } catch (error) {
        console.error('Database connection error:', error)
        throw new Error(`Failed to fetch customer with id ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}