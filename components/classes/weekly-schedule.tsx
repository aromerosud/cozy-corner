type ClassScheduleItem = {
  id: string;
  name: string;
  meetingDays: string[];
  startTime: string;
  endTime: string;
  location: string | null;
  color: string | null;
};

type WeeklyScheduleProps = {
  classes: ClassScheduleItem[];
};

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklySchedule({ classes }: WeeklyScheduleProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {weekdays.map((day) => {
        const dayClasses = classes
          .filter((classItem) => classItem.meetingDays.includes(day))
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

        const conflictingIds = new Set<string>();

        for (let i = 0; i < dayClasses.length; i++) {
          for (let j = i + 1; j < dayClasses.length; j++) {
            const first = dayClasses[i];
            const second = dayClasses[j];

            if (
              first.startTime < second.endTime &&
              second.startTime < first.endTime
            ) {
              conflictingIds.add(first.id);
              conflictingIds.add(second.id);
            }
          }
        }

        return (
          <section key={day} className="min-h-40 rounded-xl border p-4">
            <h3 className="mb-4 font-semibold">{day}</h3>

            {dayClasses.length === 0 ? (
              <p className="text-sm text-muted">No classes scheduled.</p>
            ) : (
              <div className="space-y-3">
                {dayClasses.map((classItem) => (
                  <div key={classItem.id} className="rounded-lg border p-3">
                    <p className="font-semibold">{classItem.name}</p>

                    <p className="mt-1 text-sm text-muted">
                      {classItem.startTime} – {classItem.endTime}
                    </p>
                    {conflictingIds.has(classItem.id) && (
                      <p
                        role="alert"
                        className="mt-1 text-sm font-semibold text-red-600"
                      >
                        ⚠ Schedule conflict
                      </p>
                    )}

                    {classItem.location && (
                      <p className="mt-1 text-sm text-muted">
                        {classItem.location}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
