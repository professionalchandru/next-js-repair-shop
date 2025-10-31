import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { config } from 'dotenv'


// For development: disable SSL certificate validation
if (process.env.NODE_ENV === 'development') {
    config({ path: '.env.local' })
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

// Configure neon with SSL options for development
const sql = neon(process.env.DATABASE_URL!, {
    fetchOptions: {
        cache: 'no-store',
    },
})

// const db = drizzle(sql, {logger: true})
const db = drizzle(sql)

export { db }