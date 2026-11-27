import Link from "next/link";
import { logout } from "@/src/lib/actions/auth";

export default function DashboardHeader() {
  return (
    <header className="border-b border-[#E8E2D5] bg-[#F7F4EC]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="font-serif text-2xl font-bold text-[#2C2420]"
        >
          Cozy Corner
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#6B5E55] hover:text-[#A36B49]"
          >
            Dashboard
          </Link>

          <Link
            href="/academic"
            className="text-sm font-medium text-[#6B5E55] hover:text-[#A36B49]"
          >
            Academic
          </Link>

          <Link
            href="/calendar"
            className="text-sm font-medium text-[#6B5E55] hover:text-[#A36B49]"
          >
            Calendar
          </Link>

          <Link
            href="/notes"
            className="text-sm font-medium text-[#6B5E55] hover:text-[#A36B49]"
          >
            Notes
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-xl bg-[#A36B49] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8F5B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A36B49] focus-visible:ring-offset-2"
            >
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
