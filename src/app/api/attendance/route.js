import db from "@/db";
import { ATTENDANCE, STUDENTS } from "@/db/schema";
import { eq, and, or, isNull } from "drizzle-orm";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Extract query parameters
    const month = searchParams.get("month");
    const grade = searchParams.get("grade");

    // Perform the query
    const result = await db
      .select({
        name: STUDENTS.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(
        ATTENDANCE,
        and(eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month))
      )
      .where(eq(STUDENTS.grade, grade));

    // Return the result
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return Response.json(
      { error: "Failed to fetch attendance data. Please try again later." },
      { status: 500 }
    );
  }
}

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const result = await db.insert(ATTENDANCE).values({
//       studentId: data.studentId,
//       present: data.present,
//       day: data.day,
//       date: data.date,
//     });
//     return Response.json(result, { status: 200 });
//   } catch (error) {
//     console.error("Error adding attendance:", error);
//     return Response.json(
//       { error: "Failed to add attendance. Please try again later." },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const data = await req.json();

    // Attempt to insert the record
    const result = await db.insert(ATTENDANCE).values({
      studentId: data.studentId,
      present: data.present,
      day: data.day,
      date: data.date,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    // Handle duplicate key errors specifically
    if (error.code === "23505") {
      // 23505 is the PostgreSQL error code for unique violation
      console.error("Duplicate key error:", error);
      return Response.json(
        {
          error:
            "Attendance record already exists for this student on the specified date.",
        },
        { status: 409 } // 409 Conflict
      );
    }

    console.error("Error adding attendance:", error);
    return Response.json(
      { error: "Failed to add attendance. Please try again later." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const studentId = searchParams.get("studentId");
    const day = searchParams.get("day");
    const date = searchParams.get("date");

    if (!studentId || !day || !date) {
      return Response.json(
        { error: "Missing required query parameters: studentId, day, or date" },
        { status: 400 } // Bad Request
      );
    }

    const result = await db
      .delete(ATTENDANCE)
      .where(
        and(
          eq(ATTENDANCE.studentId, studentId),
          eq(ATTENDANCE.day, day),
          eq(ATTENDANCE.date, date)
        )
      );

    return Response.json(
      { message: "Attendance deleted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return Response.json(
      { error: "Failed to delete attendance. Please try again later." },
      { status: 500 }
    );
  }
}
