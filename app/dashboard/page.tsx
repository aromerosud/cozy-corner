import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logout } from "@/src/lib/actions/auth";

export const instant = false;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold">
          Welcome to Cozy Corner!
        </h1>

        <p className="mt-3 text-muted">Your cozy workspace is ready.</p>

        <p className="mt-4 text-sm text-muted">
          Signed in as {session.user.email}
        </p>
        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  );
}
