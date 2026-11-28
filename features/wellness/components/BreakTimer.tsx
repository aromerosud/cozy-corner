"use client";

import { useEffect, useId, useReducer, useState } from "react";
import {
  DEFAULT_BREAK_MINUTES,
  MAX_BREAK_MINUTES,
  MIN_BREAK_MINUTES,
  breakTimerReducer,
  clampMinutes,
  createInitialState,
  formatRemaining,
} from "@/features/wellness/services/break-timer-reducer";
import type { BreakTimerStatus } from "@/features/wellness/types/break-timer";

const PRESET_MINUTES = [5, 10, 15] as const;

const STATUS_MESSAGES: Record<BreakTimerStatus, string> = {
  idle: "Ready when you are. Pick a length and take a moment for yourself.",
  running: "Enjoy your break. Stretch, sip some water, rest your eyes.",
  paused: "Break paused. Resume whenever you like.",
  completed: "Break complete. Nice work taking care of yourself!",
  cancelled: "No worries. You can start another break whenever you like.",
};

const primaryButton =
  "rounded-xl bg-[#A36B49] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#8F5B3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36B49]";

const secondaryButton =
  "rounded-xl border border-[#E8E2D5] bg-white px-5 py-2.5 text-sm font-medium text-[#2C2420] transition-colors hover:bg-[#F7F4EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36B49]";

export default function BreakTimer() {
  const [state, dispatch] = useReducer(breakTimerReducer, undefined, () =>
    createInitialState(),
  );
  // The custom field keeps its own text while the student is typing, so
  // clearing it or typing a partial number does not reset the length. The
  // value is validated and applied when it is a valid number, and corrected
  // when the student leaves the field.
  const [customInput, setCustomInput] = useState(() =>
    String(DEFAULT_BREAK_MINUTES),
  );
  const durationInputId = useId();
  const { status, durationMinutes, remainingMs } = state;

  function handleCustomChange(value: string) {
    setCustomInput(value);

    const minutes = Number(value);
    const isValid =
      value.trim() !== "" &&
      Number.isInteger(minutes) &&
      minutes >= MIN_BREAK_MINUTES &&
      minutes <= MAX_BREAK_MINUTES;

    if (isValid) {
      dispatch({ type: "set-duration", minutes });
    }
  }

  function handleCustomBlur() {
    // An empty field goes back to the last valid length.
    if (customInput.trim() === "") {
      setCustomInput(String(durationMinutes));
      return;
    }

    const minutes = clampMinutes(Number(customInput));

    dispatch({ type: "set-duration", minutes });
    setCustomInput(String(minutes));
  }

  function handlePresetClick(minutes: number) {
    dispatch({ type: "set-duration", minutes });
    setCustomInput(String(minutes));
  }

  // Recompute from the end timestamp on every tick so the display stays
  // accurate even if the tab is throttled in the background.
  useEffect(() => {
    if (status !== "running") {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: "tick", now: Date.now() });
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [status]);

  const isActive = status === "running" || status === "paused";
  const totalMs = durationMinutes * 60_000;
  const progress = Math.min(
    100,
    Math.max(0, ((totalMs - remainingMs) / totalMs) * 100),
  );

  return (
    <section
      aria-labelledby="break-timer-heading"
      className="rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-sm"
    >
      <h2
        id="break-timer-heading"
        className="font-serif text-2xl font-semibold text-[#2C2420]"
      >
        Break Timer
      </h2>
      <p className="mt-1 text-sm text-[#6B5E55]">
        An optional, gentle reminder to rest. It never affects your classes,
        assignments, or notes.
      </p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <p
          role="timer"
          aria-label="Time remaining in your break"
          className="font-serif text-6xl font-semibold tabular-nums text-[#2C2420]"
        >
          {formatRemaining(remainingMs)}
        </p>

        <div
          aria-hidden="true"
          className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-[#F7F4EC]"
        >
          <div
            className="h-full rounded-full bg-[#7B8B6F] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p role="status" className="text-center text-sm text-[#6B5E55]">
          {STATUS_MESSAGES[status]}
        </p>
      </div>

      <fieldset
        disabled={isActive}
        className="mt-6 border-t border-[#E8E2D5] pt-5 disabled:opacity-60"
      >
        <legend className="sr-only">Break length</legend>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-[#2C2420]">Length:</span>
          {PRESET_MINUTES.map((minutes) => (
            <button
              key={minutes}
              type="button"
              aria-pressed={durationMinutes === minutes}
              onClick={() => handlePresetClick(minutes)}
              className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36B49] ${
                durationMinutes === minutes
                  ? "border-[#A36B49] bg-[#A36B49] text-white"
                  : "border-[#E8E2D5] bg-white text-[#2C2420] hover:bg-[#F7F4EC]"
              }`}
            >
              {minutes} min
            </button>
          ))}

          <label
            htmlFor={durationInputId}
            className="ml-2 text-sm text-[#6B5E55]"
          >
            Custom (minutes)
          </label>
          <input
            id={durationInputId}
            type="number"
            inputMode="numeric"
            min={MIN_BREAK_MINUTES}
            max={MAX_BREAK_MINUTES}
            value={customInput}
            onChange={(event) => handleCustomChange(event.target.value)}
            onBlur={handleCustomBlur}
            className="w-20 rounded-xl border border-[#E8E2D5] bg-white px-3 py-1.5 text-sm text-[#2C2420] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A36B49]"
          />
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {status === "running" && (
          <button
            type="button"
            onClick={() => dispatch({ type: "pause", now: Date.now() })}
            className={primaryButton}
          >
            Pause
          </button>
        )}

        {status === "paused" && (
          <button
            type="button"
            onClick={() => dispatch({ type: "resume", now: Date.now() })}
            className={primaryButton}
          >
            Resume
          </button>
        )}

        {isActive && (
          <>
            <button
              type="button"
              onClick={() => dispatch({ type: "complete" })}
              className={secondaryButton}
            >
              Finish break
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "cancel" })}
              className={secondaryButton}
            >
              Cancel
            </button>
          </>
        )}

        {(status === "idle" ||
          status === "completed" ||
          status === "cancelled") && (
          <button
            type="button"
            onClick={() => dispatch({ type: "start", now: Date.now() })}
            className={primaryButton}
          >
            {status === "idle" ? "Start break" : "Start another break"}
          </button>
        )}

        {(status === "completed" || status === "cancelled") && (
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            className={secondaryButton}
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
}
