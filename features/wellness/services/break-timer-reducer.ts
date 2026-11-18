import type {
  BreakTimerAction,
  BreakTimerState,
} from "@/features/wellness/types/break-timer";

export const DEFAULT_BREAK_MINUTES = 5;
export const MIN_BREAK_MINUTES = 1;
export const MAX_BREAK_MINUTES = 60;

const MS_PER_MINUTE = 60_000;

export function clampMinutes(minutes: number): number {
  if (!Number.isFinite(minutes)) {
    return DEFAULT_BREAK_MINUTES;
  }

  return Math.min(
    MAX_BREAK_MINUTES,
    Math.max(MIN_BREAK_MINUTES, Math.round(minutes)),
  );
}

export function createInitialState(
  minutes: number = DEFAULT_BREAK_MINUTES,
): BreakTimerState {
  const durationMinutes = clampMinutes(minutes);

  return {
    status: "idle",
    durationMinutes,
    remainingMs: durationMinutes * MS_PER_MINUTE,
    endsAt: null,
  };
}

export function breakTimerReducer(
  state: BreakTimerState,
  action: BreakTimerAction,
): BreakTimerState {
  switch (action.type) {
    case "set-duration": {
      // The length can only change while no break is in progress.
      if (state.status === "running" || state.status === "paused") {
        return state;
      }

      return createInitialState(action.minutes);
    }

    case "start": {
      if (state.status === "running" || state.status === "paused") {
        return state;
      }

      const remainingMs = state.durationMinutes * MS_PER_MINUTE;

      return {
        ...state,
        status: "running",
        remainingMs,
        endsAt: action.now + remainingMs,
      };
    }

    case "tick": {
      if (state.status !== "running" || state.endsAt === null) {
        return state;
      }

      const remainingMs = Math.max(0, state.endsAt - action.now);

      if (remainingMs === 0) {
        return { ...state, status: "completed", remainingMs: 0, endsAt: null };
      }

      return { ...state, remainingMs };
    }

    case "pause": {
      if (state.status !== "running" || state.endsAt === null) {
        return state;
      }

      return {
        ...state,
        status: "paused",
        remainingMs: Math.max(0, state.endsAt - action.now),
        endsAt: null,
      };
    }

    case "resume": {
      if (state.status !== "paused") {
        return state;
      }

      return {
        ...state,
        status: "running",
        endsAt: action.now + state.remainingMs,
      };
    }

    case "complete": {
      if (state.status !== "running" && state.status !== "paused") {
        return state;
      }

      return { ...state, status: "completed", remainingMs: 0, endsAt: null };
    }

    case "cancel": {
      if (state.status !== "running" && state.status !== "paused") {
        return state;
      }

      return { ...state, status: "cancelled", endsAt: null };
    }

    case "reset": {
      return createInitialState(state.durationMinutes);
    }

    default: {
      return state;
    }
  }
}

export function formatRemaining(remainingMs: number): string {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
