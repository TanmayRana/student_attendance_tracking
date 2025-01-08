import db from "@/db";

import { GRADES } from "@/db/schema";

export async function GET(req) {
  try {
    const result = await db.select().from(GRADES);

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return Response.json(
      { error: "An error occurred while fetching grades" },
      { status: 500 }
    );
  }
}
