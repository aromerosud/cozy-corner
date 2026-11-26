ALTER TABLE "classes" ADD CONSTRAINT "classes_meeting_days_check" CHECK (array_length("classes"."meeting_days", 1) > 0
        AND "classes"."meeting_days" <@ ARRAY[
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday'
        ]::text[]);