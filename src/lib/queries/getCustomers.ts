import { db } from "@/db";
import { customers } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getCustomers() {
    const results = await db.select()
        .from(customers)
        .orderBy(asc(customers.lastName))

    return results
}