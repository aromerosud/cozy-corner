
import Link from "next/link";

import LoginForm from "@/src/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-serif text-3xl font-bold text-brand"
          >
            Cozy Corner
          </Link>

          <h1 className="mt-6 font-serif text-2xl font-semibold">
            Welcome back!
          </h1>

          <p className="mt-2 text-sm text-muted">
            Sign in to continue to your cozy workspace.
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
