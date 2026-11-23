
import { z } from "zod";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const timeSchema = z.string().regex(
  /^([01]\d|2[0-3]):[0-5]\d$/,
  "Time must be in HH:mm format."
);


const classFieldsSchema = z.object({
  name: z.string().trim().min(1).max(150),
  meetingDays: z.array(z.enum(weekdays))
    .min(1, "Select at least one meeting day.")
    .refine(
      (days) => new Set(days).size === days.length,
      "Meeting days cannot contain duplicates."
    ),
  startTime: timeSchema,
  endTime: timeSchema,
  location: z.string().trim().optional(),
  color: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format.")
    .optional(),
});

export const createClassSchema = classFieldsSchema.refine(
  (data) => data.endTime > data.startTime,
  {
    message: "End time must be later than start time.",
    path: ["endTime"],
  }
);

export const updateClassSchema = classFieldsSchema
  .partial()
  .refine(
    (data) =>
      !data.startTime ||
      !data.endTime ||
      data.endTime > data.startTime,
    {
      message: "End time must be later than start time.",
      path: ["endTime"],
    }
  );
