import db from "@/db";
import { STUDENTS } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    // Parse and validate incoming JSON
    const data = await req.json();
    if (!data.name || !data.grade || !data.address || !data.phone) {
      throw new Error(
        "Missing required fields: name, grade, address, or phone."
      );
    }

    // Insert student into the database
    const result = await db.insert(STUDENTS).values({
      name: data.name,
      grade: data.grade,
      address: data.address,
      phone: data.phone,
    });

    // Return success response
    return Response.json(
      { message: "Student Added successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting student:", error);

    // Return error response
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
  try {
    const result = await db.select().from(STUDENTS);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return Response.json(
      { error: "Internal Server Error in fetching students" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));
    return Response.json(
      { message: "Student Deleted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Internal Server Error in deleting students" },
      { status: 500 }
    );
  }
}
