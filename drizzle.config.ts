const config = {
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    connectionString: process.env.DATABASE_URL!
}

export default config
