import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Create a SQL client with the Neon connection string
const sql = neon(process.env.NEON_POSTGRES_URL!)

// Create a drizzle client
export const db = drizzle(sql)

// Helper function for direct SQL queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
