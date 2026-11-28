export type BreakTimerStatus =
  "idle" | "running" | "paused" | "completed" | "cancelled";

export interface BreakTimerState {
  status: BreakTimerStatus;
  /** Chosen break length, in whole minutes. */
  durationMinutes: number;
  /** Time left in the current break, in milliseconds. */
  remainingMs: number;
  /** Epoch time (ms) when the running break ends, or null when not running. */
  endsAt: number | null;
}

export type BreakTimerAction =
  | { type: "set-duration"; minutes: number }
  | { type: "start"; now: number }
  | { type: "tick"; now: number }
  | { type: "pause"; now: number }
  | { type: "resume"; now: number }
  | { type: "complete" }
  | { type: "cancel" }
  | { type: "reset" };
