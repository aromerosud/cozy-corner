export type AssignmentStatus = "pending" | "completed";

export type NoteCategory = "lecture" | "study";

export interface ScheduleSlot {
    id: string;
    title: string;
    courseCode: string;
    timeLabel: string;
    locationOrMode: string;
    isNext?: boolean;
}

export interface AssignmentItem {
    id: string;
    title: string;
    courseCode: string;
    dueDateLabel: string;
    status: AssignmentStatus;
}

export interface NoteSummaryItem {
    id: string;
    title: string;
    excerpt: string;
    category: NoteCategory;
    updatedAtLabel: string;
}

export interface WellnessPromptItem {
    id: string;
    label: string;
    detail: string;
    kind: "hydration" | "meal" | "break";
    enabled: boolean;
}

export interface DashboardOverviewData {
    studentName: string;
    programSummary: string;
    streakDays: number;
    schedule: ScheduleSlot[];
    assignments: AssignmentItem[];
    notes: NoteSummaryItem[];
    wellnessPrompts: WellnessPromptItem[];
}