import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations' //absoulte path
        })
        console.log('migrtaion completed')
    } catch (error) {
        console.error("Error during mirgation: ", error)
        process.exit(1)
    }
}

main()