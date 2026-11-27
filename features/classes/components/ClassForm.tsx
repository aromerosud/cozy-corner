"use client";

import { useState } from "react";
type ClassApiError = {
  error?: string;
  message?: string;
  details?: Record<string, string[]>;
};
import { useRouter } from "next/navigation";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ClassForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  setError(null);
  setSuccess(null);

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = String(formData.get("name") ?? "").trim();
  const meetingDays = formData.getAll("meetingDays").map(String);
  const startTime = String(formData.get("startTime") ?? "");
  const endTime = String(formData.get("endTime") ?? "");
  const location = String(formData.get("location") ?? "").trim();
  const color = String(formData.get("color") ?? "");

  if (!name) {
    setError("Please enter a class name.");
    return;
  }

  if (meetingDays.length === 0) {
    setError("Please select at least one meeting day.");
    return;
  }

  if (!startTime || !endTime || endTime <= startTime) {
    setError("End time must be later than start time.");
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/v1/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        meetingDays,
        startTime,
        endTime,
        location: location || undefined,
        color: color || undefined,
      }),
    });

    if (!response.ok) {
  if (response.status === 401) {
    setError("Please sign in to add a class.");
    return;
  }

  const data: ClassApiError = await response
    .json()
    .catch(() => ({}));

  const validationErrors = Object.values(
    data.details ?? {}
  ).flat();

  setError(
    validationErrors.length > 0
      ? validationErrors.join(" ")
      : data.error ||
        data.message ||
        "Unable to create class. Please try again."
  );

  return;
}

    setSuccess("Class created successfully!");
    form.reset();
    router.refresh();
  } catch {
    setError("Unable to connect to the server.");
  } finally {
    setIsSubmitting(false);
  }
}


  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Add a Class</h2>

        <div>
          <label htmlFor="class-name" className="mb-2 block font-medium">
            Class Name
          </label>
          <input
            id="class-name"
            name="name"
            type="text"
            required
            maxLength={150}
            placeholder="e.g. Web Development"
            className="w-full rounded-lg border p-3"
          />
          </div>

          <fieldset>
            <legend className="mb-2 font-medium">Meeting Days</legend>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {weekdays.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <input
                    type="checkbox"
                    name="meetingDays"
                    value={day}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">{day}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="start-time" className="mb-2 block font-medium">
                Start Time
              </label>

              <input
                id="start-time"
                name="startTime"
                type="time"
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label htmlFor="end-time" className="mb-2 block font-medium">
                End Time
              </label>

              <input
                id="end-time"
                name="endTime"
                type="time"
                required
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>
        <div>
          <label htmlFor="class-location" className="mb-2 block font-medium">
            Location (Optional)
          </label>

          <input
            id="class-location"
            name="location"
            type="text"
            placeholder="e.g. Room 205 or Online"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="class-color" className="mb-2 block font-medium">
            Class Color (Optional)
          </label>

          <input
            id="class-color"
            name="color"
            type="color"
            defaultValue="#A66B49"
            className="h-12 w-24 cursor-pointer rounded-lg border p-1"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="text-sm font-medium text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Class"}
        </button>
      </form>
    );
}