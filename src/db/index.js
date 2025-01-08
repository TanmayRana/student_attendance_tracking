import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// import { drizzle } from "drizzle-orm/neon-serverless";

const sql = neon(process.env.NEON_DATABASE_URL);
const db = drizzle({ client: sql });

export default db;
