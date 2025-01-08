// import db from "@/db";
// import { ATTENDANCE, STUDENTS } from "@/db/schema";
// import { and, desc, eq, sql } from "drizzle-orm";

// export async function GET(req) {
//   try {
//     const searchParams = requestAnimationFrame.nextUrl.searchParams;
//     const date = searchParams.get("date");
//     const grade = searchParams.get("grade");

//     const result = await db
//       .select({
//         day: ATTENDANCE.day,
//         presentCount: sql`count($ATTENDANCE.day)`,
//       })
//       .from(ATTENDANCE)
//       .innerJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
//       .groupBy(ATTENDANCE.day)
//       .where(and(eq(ATTENDANCE.date, date), eq(STUDENTS.grade, grade)))
//       .orderBy(desc(ATTENDANCE.day))
//       .limit(7);

//     return Response.json(result, { status: 200 });
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

import db from "@/db";
import { ATTENDANCE, STUDENTS } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export async function GET(req) {
  try {
    // Extract search parameters from the request
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get("date");
    const grade = searchParams.get("grade");

    // Validate input parameters
    if (!date || !grade) {
      return new Response(
        JSON.stringify({ error: "Date and grade are required parameters." }),
        { status: 400 }
      );
    }

    // Query the database
    const result = await db
      .select({
        day: ATTENDANCE.day,
        presentCount: sql`COUNT(${ATTENDANCE.day})`,
      })
      .from(ATTENDANCE)
      .leftJoin(
        STUDENTS,
        and(eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date, date))
      )
      .where(eq(STUDENTS.grade, grade))
      .groupBy(ATTENDANCE.day)
      .orderBy(desc(ATTENDANCE.day))
      .limit(7);

    // Return the result
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching attendance data.",
      }),
      { status: 500 }
    );
  }
}
