import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { customers } from '@/db/schema'
import { z } from 'zod'

export const insertCustomerSchema = createInsertSchema(customers, {
    firstName: (schema) => schema.min(1, "First name is required"),
    lastName: (schema) => schema.min(1, "Last name is required"),
    email: (schema) => schema.email("Invalid email"),
    phone: (schema) => schema.regex(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Invalid phone number"),
    address1: (schema) => schema.min(1, "Address 1 is required"),
    city: (schema) => schema.min(1, "City is required"),
    state: (schema) => schema.length(2, "State must be exactly 2 characters"),
    zip: (schema) => schema.length(6, "Zip must be exactly 6 characters"),
})

export const selectCustomerSchema = createSelectSchema(customers)

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>

export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>

