import { auth } from "@/auth";
import { redirect } from "next/navigation";
import WeeklySchedule from "@/components/classes/weekly-schedule";
import ClassForm from "@/components/classes/class-form";

const sampleClasses = [
  {
    id: "1",
    name: "Web Development",
    meetingDays: ["Monday", "Wednesday", "Friday"],
    startTime: "09:00",
    endTime: "10:30",
    location: "Room 201",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Database Systems",
    meetingDays: ["Monday", "Thursday"],
    startTime: "11:00",
    endTime: "12:30",
    location: "Room 305",
    color: "#10B981",
  },
];


export default async function ClassesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">My Classes</h1>

        <p className="mt-2 text-muted">
          Organize your classes and manage your weekly schedule.
        </p>
      </div>

      <section className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        <div className="mb-8">
          <ClassForm />
        </div>

        <WeeklySchedule classes={sampleClasses} />
        <div className="mt-6">
          <WeeklySchedule classes={sampleClasses} />
        </div>
      </section>
    </main>
  );
}
