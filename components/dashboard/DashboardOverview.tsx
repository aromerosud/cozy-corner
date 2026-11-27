"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { DashboardOverviewData } from "@/types/dashboard";
import { EmptyState } from "@/components/ui/EmptyState";

interface DashboardOverviewProps {
    data: DashboardOverviewData;
    onStartStudySession?: () => void;
}

export function DashboardOverview({
    data,
    onStartStudySession,
}: DashboardOverviewProps) {
    const [sessionStatus, setSessionStatus] = useState<string | null>(null);
    const [dismissedIds, setDismissedIds] = useState<string[]>([]);

    const activeWellness = data.wellnessPrompts.filter(
        (item) => item.enabled && !dismissedIds.includes(item.id)
    );

    const lectureNotesCount = data.notes.filter(
        (note) => note.category === "lecture"
    ).length;
    const studyNotesCount = data.notes.filter(
        (note) => note.category === "study"
    ).length;

    const handleStartSession = () => {
        if (onStartStudySession) {
            onStartStudySession();
        }
        setSessionStatus("Focus session started — stay cozy and steady!");
    };

    const handleDismissPrompt = (id: string) => {
        setDismissedIds((prev) => [...prev, id]);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2C2420]">
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Top Banner & Header */}
                <section
                    aria-label="Dashboard header"
                    className="rounded-2xl border border-[#E8E2D5] bg-[#F7F4EC] p-5 sm:p-6"
                >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-[#6B5E55]">
                                Cozy Corner Dashboard
                            </p>
                            <h1 className="mt-1 font-serif text-2xl font-bold text-[#2C2420] sm:text-3xl">
                                Welcome back, {data.studentName}
                            </h1>
                            <p className="mt-1 text-sm text-[#6B5E55]">{data.programSummary}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-xl border border-[#E8E2D5] bg-white px-4 py-2 text-sm">
                                <span className="text-[#6B5E55]">Streak: </span>
                                <span className="font-semibold text-[#A36B49]">
                                    {data.streakDays} {data.streakDays === 1 ? "day" : "days"}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleStartSession}
                                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#A36B49] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8F5B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A36B49] focus-visible:ring-offset-2"
                            >
                                Start Study Session
                            </button>
                        </div>
                    </div>

                    {sessionStatus && (
                        <p
                            role="status"
                            className="mt-4 rounded-xl border border-[#7B8B6F]/30 bg-[#7B8B6F]/10 px-4 py-2 text-sm text-[#2C2420]"
                        >
                            {sessionStatus}
                        </p>
                    )}

                    {/* Non-blocking Wellness Prompts */}
                    {activeWellness.length > 0 && (
                        <div
                            aria-label="Wellness prompts"
                            className="mt-4 flex flex-wrap gap-2.5"
                        >
                            {activeWellness.map((prompt) => (
                                <div
                                    key={prompt.id}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[#E8E2D5] bg-white px-3.5 py-2 text-xs text-[#2C2420]"
                                >
                                    <span
                                        className="h-2 w-2 rounded-full bg-[#7B8B6F]"
                                        aria-hidden="true"
                                    />
                                    <span className="font-medium">{prompt.label}:</span>
                                    <span className="text-[#6B5E55]">{prompt.detail}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleDismissPrompt(prompt.id)}
                                        aria-label={`Dismiss ${prompt.label}`}
                                        className="ml-1 rounded px-1.5 py-0.5 text-[#6B5E55] hover:bg-[#F7F4EC] hover:text-[#2C2420]"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Main 12-Column Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Column: Schedule & Assignments */}
                    <div className="space-y-6 lg:col-span-8">
                        {/* Today's Schedule */}
                        <section
                            aria-labelledby="schedule-heading"
                            className="rounded-2xl border border-[#E8E2D5] bg-white p-5 shadow-sm sm:p-6"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2
                                    id="schedule-heading"
                                    className="font-serif text-xl font-semibold text-[#2C2420]"
                                >
                                    Today&apos;s Schedule
                                </h2>
                                <Link
                                    href="/calendar"
                                    className="text-sm font-medium text-[#A36B49] hover:underline"
                                >
                                    Full calendar
                                </Link>
                            </div>

                            {data.schedule.length === 0 ? (
                                <EmptyState
                                    title="No classes scheduled today"
                                    description="Add your classes or study blocks so your next session is always easy to spot."
                                    actionLabel="Add Class"
                                    actionHref="/academic"
                                />
                            ) : (
                                <ul className="space-y-3">
                                    {data.schedule.map((slot) => (
                                        <li
                                            key={slot.id}
                                            className={`flex flex-col justify-between gap-2 rounded-xl border p-4 sm:flex-row sm:items-center ${slot.isNext
                                                    ? "border-[#A36B49]/50 bg-[#F7F4EC]"
                                                    : "border-[#E8E2D5] bg-white"
                                                }`}
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    {slot.isNext && (
                                                        <span className="rounded-full bg-[#7B8B6F]/15 px-2.5 py-0.5 text-xs font-medium text-[#2C2420]">
                                                            Up Next
                                                        </span>
                                                    )}
                                                    <span className="text-xs font-medium text-[#6B5E55]">
                                                        {slot.courseCode}
                                                    </span>
                                                </div>
                                                <p className="mt-1 font-medium text-[#2C2420]">
                                                    {slot.title}
                                                </p>
                                            </div>
                                            <div className="text-left text-xs text-[#6B5E55] sm:text-right">
                                                <p className="font-medium text-[#2C2420]">
                                                    {slot.timeLabel}
                                                </p>
                                                <p>{slot.locationOrMode}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        {/* Upcoming Assignments */}
                        <section
                            aria-labelledby="assignments-heading"
                            className="rounded-2xl border border-[#E8E2D5] bg-white p-5 shadow-sm sm:p-6"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2
                                    id="assignments-heading"
                                    className="font-serif text-xl font-semibold text-[#2C2420]"
                                >
                                    Upcoming Assignments
                                </h2>
                                <Link
                                    href="/academic"
                                    className="text-sm font-medium text-[#A36B49] hover:underline"
                                >
                                    View all
                                </Link>
                            </div>

                            {data.assignments.length === 0 ? (
                                <EmptyState
                                    title="No upcoming assignments"
                                    description="You are all caught up—or add your next assignment to track due dates and status."
                                    actionLabel="Add Assignment"
                                    actionHref="/academic"
                                />
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-[#E8E2D5]">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-[#F7F4EC] text-xs uppercase text-[#6B5E55]">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Assignment</th>
                                                <th className="px-4 py-3 font-medium">Course</th>
                                                <th className="px-4 py-3 font-medium">Due Date</th>
                                                <th className="px-4 py-3 font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#E8E2D5]">
                                            {data.assignments.map((item) => (
                                                <tr key={item.id} className="bg-white">
                                                    <td className="px-4 py-3 font-medium text-[#2C2420]">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-4 py-3 text-[#6B5E55]">
                                                        {item.courseCode}
                                                    </td>
                                                    <td className="px-4 py-3 text-[#6B5E55]">
                                                        {item.dueDateLabel}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === "completed"
                                                                    ? "bg-[#7B8B6F]/15 text-[#2C2420]"
                                                                    : "bg-[#A36B49]/15 text-[#8F5B3A]"
                                                                }`}
                                                        >
                                                            {item.status === "completed"
                                                                ? "✓ Completed"
                                                                : "✕ Pending"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Note Summaries */}
                    <aside
                        aria-labelledby="notes-heading"
                        className="space-y-6 lg:col-span-4"
                    >
                        <section className="rounded-2xl border border-[#E8E2D5] bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-3 flex items-center justify-between">
                                <h2
                                    id="notes-heading"
                                    className="font-serif text-xl font-semibold text-[#2C2420]"
                                >
                                    Notes Summary
                                </h2>
                                <Link
                                    href="/notes"
                                    className="text-sm font-medium text-[#A36B49] hover:underline"
                                >
                                    All notes
                                </Link>
                            </div>

                            <div className="mb-4 grid grid-cols-2 gap-3 text-center">
                                <div className="rounded-xl border border-[#E8E2D5] bg-[#F7F4EC] p-3">
                                    <p className="text-lg font-bold text-[#2C2420]">
                                        {lectureNotesCount}
                                    </p>
                                    <p className="text-xs text-[#6B5E55]">Lecture Notes</p>
                                </div>
                                <div className="rounded-xl border border-[#E8E2D5] bg-[#F7F4EC] p-3">
                                    <p className="text-lg font-bold text-[#2C2420]">
                                        {studyNotesCount}
                                    </p>
                                    <p className="text-xs text-[#6B5E55]">Study Notes</p>
                                </div>
                            </div>

                            {data.notes.length === 0 ? (
                                <EmptyState
                                    title="No notes yet"
                                    description="Capture lecture takeaways or study summaries so they are ready when you review."
                                    actionLabel="Create Note"
                                    actionHref="/notes"
                                />
                            ) : (
                                <ul className="space-y-3">
                                    {data.notes.map((note) => (
                                        <li
                                            key={note.id}
                                            className="rounded-xl border border-[#E8E2D5] bg-[#FDFBF7] p-3.5"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="rounded-full bg-[#F7F4EC] px-2.5 py-0.5 text-[11px] font-medium capitalize text-[#6B5E55]">
                                                    {note.category}
                                                </span>
                                                <span className="text-[11px] text-[#6B5E55]">
                                                    {note.updatedAtLabel}
                                                </span>
                                            </div>
                                            <p className="mt-1.5 text-sm font-semibold text-[#2C2420]">
                                                {note.title}
                                            </p>
                                            <p className="mt-1 line-clamp-2 text-xs text-[#6B5E55]">
                                                {note.excerpt}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}
