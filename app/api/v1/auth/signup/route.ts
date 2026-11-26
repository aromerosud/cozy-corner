import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/src/db";
import { users } from "@/src/db/schema";
import { hashPassword } from "@/src/lib/password";

const signupSchema = z.object({
  displayName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid registration data.",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const displayName = result.data.displayName;
    const email = result.data.email.toLowerCase();
    const password = result.data.password;

    const db = getDb();

    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        displayName,
        email,
        passwordHash,
      })
      .returning({
        id: users.id,
        displayName: users.displayName,
        email: users.email,
      });

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 },
    );
  }
}
