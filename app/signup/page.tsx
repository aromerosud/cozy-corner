import Link from "next/link";

import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <Link href="/" className="font-serif text-3xl font-bold text-brand">
            Cozy Corner
          </Link>

          <h1 className="mt-6 font-serif text-2xl font-semibold">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted">
            Start organizing your academic life in your cozy workspace.
          </p>
        </div>

        <SignupForm />

        <p className="mt-8 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
