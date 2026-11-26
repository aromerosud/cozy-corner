"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function SignupForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true);

    const formData = new FormData(form);

    const signupData = {
      displayName: formData.get("displayName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data: unknown = await response.json();

      if (typeof data !== "object" || data === null) {
        throw new Error("Unexpected server response.");
      }

      const result = data as {
        error?: unknown;
        message?: unknown;
      };

      if (!response.ok) {
        setErrorMessage(
          typeof result.error === "string"
            ? result.error
            : "Unable to create your account.",
        );
        return;
      }

      setSuccessMessage(
        typeof result.message === "string"
          ? result.message
          : "Account created successfully.",
      );

      form.reset();
    } catch {
      setErrorMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="displayName"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Full name
        </label>

        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          placeholder="Your full name"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={255}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          placeholder="At least 8 characters"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <div
          role="status"
          className="space-y-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          <p>{successMessage}</p>
          <Link
            href="/login"
            className="inline-block font-semibold text-brand hover:text-brand-hover"
          >
            Continue to sign in
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
