
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { getDb } from "@/src/db";
import { classes } from "@/src/db/schema";

import WeeklySchedule from "@/features/classes/components/WeeklySchedule";
import ClassForm from "@/features/classes/components/ClassForm";

async function ClassesContent() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const db = getDb();

  const userClasses = await db
    .select()
    .from(classes)
    .where(eq(classes.userId, session.user.id));

  return (
    <>
      <div className="mb-8">
        <ClassForm />
      </div>

      <section className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Weekly Schedule
        </h2>

        <WeeklySchedule classes={userClasses} />
      </section>
    </>
  );
}

export default function ClassesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">
          My Classes
        </h1>

        <p className="mt-2 text-muted">
          Organize your classes and manage your weekly schedule.
        </p>
      </div>

      <Suspense
        fallback={
          <p className="text-sm text-muted" role="status">
            Loading your classes...
          </p>
        }
      >
        <ClassesContent />
      </Suspense>
    </main>
  );
}
