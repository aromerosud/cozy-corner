import React from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import type { DashboardOverviewData } from "@/types/dashboard";

const sampleDashboardData: DashboardOverviewData = {
    studentName: "Jelina",
    programSummary: "WDD430 • Web Full-Stack Development",
    streakDays: 4,
    schedule: [
        {
            id: "sched-1",
            title: "Full-Stack Architecture & Next.js",
            courseCode: "WDD430",
            timeLabel: "5:00 PM – 6:30 PM",
            locationOrMode: "Online Lab",
            isNext: true,
        },
    ],
    assignments: [
        {
            id: "assign-1",
            title: "Week 04 Team Project & Feature PR",
            courseCode: "WDD430",
            dueDateLabel: "Nov 28, 2026",
            status: "pending",
        },
    ],
    notes: [
        {
            id: "note-1",
            title: "App Router & Server Components",
            excerpt: "Keep data fetching clean and use client state only for interactive UI.",
            category: "lecture",
            updatedAtLabel: "Today",
        },
        {
            id: "note-2",
            title: "Tailwind Palette & Spacing Checklist",
            excerpt: "Warm cream canvas (#FDFBF7), terracotta accents (#A36B49), sage status (#7B8B6F).",
            category: "study",
            updatedAtLabel: "Yesterday",
        },
    ],
    wellnessPrompts: [
        {
            id: "well-1",
            label: "Hydration",
            detail: "Drink a glass of water in 30 minutes",
            kind: "hydration",
            enabled: true,
        },
        {
            id: "well-2",
            label: "Break",
            detail: "Short stretch after your next study block",
            kind: "break",
            enabled: true,
        },
    ],
};

export default function DashboardPage() {
    return <DashboardOverview data={sampleDashboardData} />;
}

