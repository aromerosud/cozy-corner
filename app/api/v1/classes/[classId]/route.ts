
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/auth";
import { getDb } from "@/src/db";
import { classes } from "@/src/db/schema";
import { updateClassSchema } from "@/src/lib/validations/classes";


type RouteContext = {
  params: Promise<{ classId: string }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Verify authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get the class ID from the URL
    const { classId } = await params;

    // 3. Validate the class ID
    const result = z.uuid().safeParse(classId);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid class ID." },
        { status: 400 }
      );
    }

    // 4. Query the database
    const db = getDb();

    const [classRecord] = await db
      .select()
      .from(classes)
      .where(
        and(
          eq(classes.id, classId),
          eq(classes.userId, session.user.id)
        )
      )
      .limit(1);

    // 5. Handle a class that doesn't exist
    if (!classRecord) {
      return NextResponse.json(
        { error: "Class not found." },
        { status: 404 }
      );
    }

    // 6. Return the class
    return NextResponse.json(classRecord, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to retrieve class:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Validate the class ID
    const { classId } = await params;

    if (!z.uuid().safeParse(classId).success) {
      return NextResponse.json(
        { error: "Invalid class ID." },
        { status: 400 }
      );
    }

    // 3. Parse and validate request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const result = updateClassSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid class data.",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updates = result.data;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Provide at least one field to update." },
        { status: 400 }
      );
    }

    // 4. Find the class belonging to this student
    const db = getDb();

    const [existingClass] = await db
      .select()
      .from(classes)
      .where(
        and(
          eq(classes.id, classId),
          eq(classes.userId, session.user.id)
        )
      )
      .limit(1);

    if (!existingClass) {
      return NextResponse.json(
        { error: "Class not found." },
        { status: 404 }
      );
    }

    // 5. Validate the final schedule after merging updates
    const startTime = updates.startTime ?? existingClass.startTime;
    const endTime = updates.endTime ?? existingClass.endTime;

    if (endTime <= startTime) {
      return NextResponse.json(
        { error: "End time must be later than start time." },
        { status: 400 }
      );
    }

    // 6. Update only the provided fields
    const [updatedClass] = await db
      .update(classes)
      .set(updates)
      .where(
        and(
          eq(classes.id, classId),
          eq(classes.userId, session.user.id)
        )
      )
      .returning();

    return NextResponse.json(
      {
        message: "Class updated successfully.",
        class: updatedClass,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update class:", error);

    return NextResponse.json(
      { error: "Unable to update class." },
      { status: 500 }
    );
  }
}



export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Validate the class ID
    const { classId } = await params;

    if (!z.uuid().safeParse(classId).success) {
      return NextResponse.json(
        { error: "Invalid class ID." },
        { status: 400 }
      );
    }

    // 3. Delete only a class belonging to this user
    const db = getDb();

    const [deletedClass] = await db
      .delete(classes)
      .where(
        and(
          eq(classes.id, classId),
          eq(classes.userId, session.user.id)
        )
      )
      .returning();

    // 4. Handle a missing or unauthorized class
    if (!deletedClass) {
      return NextResponse.json(
        { error: "Class not found." },
        { status: 404 }
      );
    }

    // 5. Return success
    return NextResponse.json(
      { message: "Class deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete class:", error);

    return NextResponse.json(
      { error: "Unable to delete class." },
      { status: 500 }
    );
  }
}
