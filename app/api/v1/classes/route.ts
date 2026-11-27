
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { getDb } from "@/src/db";
import { classes } from "@/src/db/schema";
import { createClassSchema } from "@/src/lib/validations/classes";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = getDb();

    const userClasses = await db
      .select()
      .from(classes)
      .where(eq(classes.userId, session.user.id));

    return NextResponse.json(userClasses, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to retrieve classes:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Read and validate the request body
    const body: unknown = await request.json();
    const result = createClassSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid class data.",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = getDb();

    // Create the class for the authenticated student
    const [newClass] = await db
      .insert(classes)
      .values({
        ...result.data,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Class created successfully.",
        class: newClass,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create class:", error);

    return NextResponse.json(
      { error: "Unable to create class." },
      { status: 500 }
    );
  }
}
