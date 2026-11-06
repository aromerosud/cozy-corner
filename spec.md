# Feature Specification: Cozy Corner

**Feature Branch**: `001-cozy-corner-dashboard`  
**Created**: 2026-11-06  
**Status**: Draft  
**Input**: User request: Create a project specification for Cozy Corner, an aesthetic student dashboard with customizable class schedules, assignment tracking, study streaks, hydration reminders, break timers, and a dual notes system.

## Description

Cozy Corner is a welcoming, customizable student dashboard that brings academic planning and supportive study habits into one place. Students can organize classes and assignments, track study activity, manage hydration and break reminders, and keep two kinds of notes.

## Purpose and Target Audience

**Purpose**: Help students see what needs attention, organize their academic work, and sustain healthy study routines without making wellness tracking feel punitive.

**Target audience**: Students who want a calm, personal home for class schedules, assignments, study sessions, reminders, and notes. The dashboard should remain legible and usable across supported screen sizes and with keyboard navigation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign up for a personal workspace (Priority: P1)

As a student, I want to create a personal Cozy Corner account so my schedules, assignments, preferences, and notes are private to me and available when I return.

**Why this priority**: Personal data ownership is necessary before students can save and manage their workspace.

**Independent Test**: Submit valid account details and verify a personal workspace is created; retry with an already-registered email and verify a clear, non-duplicating error.

**Acceptance Scenarios**:

1. **Given** I am not signed up, **When** I submit a valid email, password, and display name, **Then** an account is created and I can access my empty dashboard.
2. **Given** I submit incomplete or invalid sign-up details, **When** I attempt to sign up, **Then** the missing or invalid fields are identified and no account is created.
3. **Given** an account already uses my email, **When** I try to sign up with that email, **Then** I receive a clear message and the existing account is not changed.
4. **Given** I already have an account, **When** I provide valid sign-in credentials, **Then** I return to my own saved workspace; invalid credentials do not expose workspace information.

### User Story 2 - Create classes, assignments, and notes (Priority: P1)

As a student, I want to add my class schedule, assignments, and notes so the dashboard reflects the work I need to manage.

**Why this priority**: The dashboard's core value depends on students being able to enter their own academic information.

**Independent Test**: In a signed-in workspace, create one class, one assignment, one class note linked to it, and one quick note; verify each is saved and shown in its appropriate view.

**Acceptance Scenarios**:

1. **Given** I am signed in, **When** I enter a class name, meeting days, start and end times, and optional location and appearance choices, **Then** the class appears on my schedule at the selected times.
2. **Given** I am signed in, **When** I enter an assignment title, course, due date, and optional details, **Then** it appears in my assignment list with its due date and an incomplete status.
3. **Given** I choose class notes, **When** I save a note with a title and content for a class, **Then** the note is associated with that class.
4. **Given** I choose quick notes, **When** I save a note with a title and content without selecting a class, **Then** the note is available in my independent quick-notes collection.
5. **Given** required information is missing or a class meeting time is invalid, **When** I try to save, **Then** I am told what to correct and no invalid record is created.

### User Story 3 - Read today's dashboard and saved information (Priority: P1)

As a student, I want to see today's classes, upcoming assignments, study streak, wellness prompts, and my notes so I can decide what to focus on.

**Why this priority**: A clear, current overview is the primary reason to return to the dashboard.

**Independent Test**: Seed a workspace with classes, assignments, notes, and study activity, then verify the student can find each item in its relevant dashboard or collection view.

**Acceptance Scenarios**:

1. **Given** I have saved classes and assignments, **When** I open my dashboard, **Then** I see today's schedule and upcoming assignments with clear dates and statuses.
2. **Given** I have study activity, **When** I view my dashboard, **Then** I see my current study streak and a clear way to start a study session.
3. **Given** I have enabled hydration or break reminders, **When** the relevant reminder is due, **Then** I see a dismissible or snoozable prompt that does not block academic information.
4. **Given** I have class notes and quick notes, **When** I open notes, **Then** I can distinguish and browse both types and find class notes through their associated class.
5. **Given** I have no saved information, **When** I open the dashboard, **Then** I see useful empty states with clear actions to add classes, assignments, or notes.

### User Story 4 - Update academic information and preferences (Priority: P1)

As a student, I want to change my classes, assignments, notes, and dashboard preferences so Cozy Corner stays accurate as my term and routines change.

**Why this priority**: Academic details and personal routines change; users must be able to correct and customize their workspace.

**Independent Test**: Edit each supported record type and a dashboard preference, then verify the updated values appear in all relevant views.

**Acceptance Scenarios**:

1. **Given** I have a saved class, **When** I change its meeting times, days, location, or appearance, **Then** the schedule shows the updated class without retaining the old time.
2. **Given** I have a saved assignment, **When** I change its title, due date, details, or completion status, **Then** the updated values appear in the assignment list and dashboard.
3. **Given** I have a saved note, **When** I edit its title or content, **Then** the saved note displays the new values and retains its class association or quick-note type.
4. **Given** I can customize my dashboard, **When** I change supported appearance, widget visibility, reminder interval, or timer duration preferences, **Then** those preferences are reflected in subsequent dashboard use.
5. **Given** an update contains invalid values, **When** I save it, **Then** I receive a clear validation message and the last valid information remains intact.

### User Story 5 - Delete information I no longer need (Priority: P2)

As a student, I want to remove outdated classes, assignments, and notes so my dashboard stays relevant and uncluttered.

**Why this priority**: Cleanup is important for maintaining an accurate workspace, but follows account setup and core planning.

**Independent Test**: Delete one record of each supported type and verify it is absent from the dashboard and its collection afterward.

**Acceptance Scenarios**:

1. **Given** I own a saved class, assignment, or note, **When** I confirm its deletion, **Then** it is removed from my workspace and no longer appears in related views.
2. **Given** a class has linked class notes, **When** I request deletion of that class, **Then** I am informed that linked notes are affected and must confirm before the class and its linked notes are removed.
3. **Given** I cancel a deletion confirmation, **When** I return to the collection, **Then** the record remains unchanged.
4. **Given** I try to access or delete another student's record, **When** the request is evaluated, **Then** the record is not disclosed or changed.

### User Story 6 - Support focused study and healthy routines (Priority: P2)

As a student, I want optional study streaks, hydration reminders, and break timers so I can build supportive routines around my schoolwork.

**Why this priority**: These features add personal value and support well-being, while the academic dashboard remains useful without them.

**Independent Test**: Start and complete a study session, record a hydration check-in, and use a break timer; verify each result and the student's reminder controls independently.

**Acceptance Scenarios**:

1. **Given** I start and complete a study session on a calendar day, **When** my study activity is shown, **Then** the day counts toward my streak and I can see my current and longest streak.
2. **Given** I have enabled hydration reminders, **When** a reminder appears, **Then** I can record a check-in, snooze it, or dismiss it; disabling reminders stops future prompts.
3. **Given** I start a break timer, **When** I pause, resume, complete, or cancel it, **Then** the timer reflects that action and does not alter my academic records.
4. **Given** I miss a study goal or dismiss a wellness reminder, **When** I next use Cozy Corner, **Then** I receive no shaming or punitive message and can continue using all features.

### Edge Cases

- If two classes overlap, the schedule MUST display both and indicate the conflict without silently moving or deleting either class.
- If an assignment has no due date, it MUST remain accessible in the assignment list and be clearly identified as undated rather than assigned a fabricated date.
- If a due date or meeting time crosses a local date boundary, the dashboard MUST display it consistently using the student's selected/local time context.
- If a student changes the device date or time zone, saved dates and recurrence rules MUST remain understandable and must not silently shift to a different class day.
- If a reminder is due while the student is away, the student MUST be able to dismiss or snooze it later; missed reminders MUST NOT stack into blocking alerts.
- If saved content is temporarily unavailable, the dashboard MUST communicate that state and MUST NOT present an unsaved edit as persisted.
- If a class with linked notes is deleted, the confirmation MUST disclose the impact before either the class or linked notes are removed.
- If a user supplies blank, excessively long, or unsupported values, the system MUST provide actionable validation without losing other valid input.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow a student to create a personal account using a display name, email address, and password, and return to it using valid sign-in credentials; it MUST reject invalid or duplicate email addresses and invalid sign-in credentials.
- **FR-002**: The system MUST keep each student's schedule, assignments, notes, preferences, and wellness activity private to that student.
- **FR-003**: Students MUST be able to create, view, update, and delete their own class schedule entries, including class name, meeting days and times, and optional location and appearance.
- **FR-004**: Students MUST be able to create, view, update, and delete their own assignments, including title, optional course association, optional due date, details, and completion status.
- **FR-005**: Students MUST be able to create, view, update, and delete two distinct note types: class notes associated with a class and independent quick notes.
- **FR-006**: The system MUST provide a dashboard overview of today's classes, upcoming assignments, study streak, and enabled wellness prompts, with empty states when the student has no saved items.
- **FR-007**: Students MUST be able to customize supported dashboard appearance, widget visibility, hydration reminder settings, and break timer duration.
- **FR-008**: Students MUST be able to start and complete study sessions; the system MUST calculate current and longest consecutive-day study streaks based on at least one completed session per local calendar day.
- **FR-009**: Students MUST be able to enable, disable, snooze, dismiss, and record hydration reminder check-ins without being required to use the reminder feature.
- **FR-010**: Students MUST be able to start, pause, resume, complete, and cancel a break timer without changing academic records.
- **FR-011**: Wellness features MUST be optional, user-controlled, and encouraging; missing a goal MUST NOT trigger punitive language or restrict access to academic features.
- **FR-012**: The system MUST validate required fields and meaningful date/time constraints before saving and MUST preserve the last valid saved record when an update fails validation.
- **FR-013**: Deleting a class with linked class notes MUST require confirmation that explains the effect on those notes; canceling confirmation MUST leave both intact.
- **FR-014**: The dashboard MUST prioritize legibility and accessible interaction, provide responsive layouts, and MUST NOT let decorative styling obscure essential information or controls.

### Key Entities *(include if feature involves data)*

- **Student Account**: A student's identity and privately owned workspace, including display name and contact email.
- **Class**: A student's course schedule entry, including title, recurring meeting days and times, optional location, and optional visual choice.
- **Assignment**: A student's task, optionally linked to a class, with title, due date, details, and completion status.
- **Note**: Student-authored title and content in either class-note form (linked to a class) or independent quick-note form.
- **Dashboard Preferences**: Student-selected appearance, visible dashboard sections, reminder settings, and timer duration.
- **Study Session and Streak**: A completed period of study and its date, used to calculate current and longest consecutive-day activity.
- **Wellness Activity**: A hydration check-in, reminder state, or break-timer session controlled by the student.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of first-time students in usability testing can complete sign-up and reach their dashboard without assistance in under 2 minutes.
- **SC-002**: At least 90% of students in usability testing can create a class, an assignment, and both note types without assistance in under 5 minutes total.
- **SC-003**: At least 90% of students can identify their next class and nearest upcoming assignment from the dashboard within 30 seconds.
- **SC-004**: At least 95% of valid edits and deletions are reflected correctly in all related views during acceptance testing.
- **SC-005**: At least 90% of students can find and change reminder and timer preferences without assistance in under 1 minute.
- **SC-006**: In accessibility review, all primary flows can be completed using keyboard navigation and essential text and controls remain legible at supported screen sizes.
- **SC-007**: At least 85% of students testing wellness features report that prompts feel optional and supportive rather than punitive.

## API Endpoints

The following user-requested endpoint catalog describes the expected resource operations and behavior, not a required framework, hosting model, or data-storage design. All student-owned resources are scoped to the signed-in student's workspace.

| Method | Endpoint | Purpose and expected behavior |
|---|---|---|
| `POST` | `/api/v1/auth/signup` | Create a student account and personal workspace; validate required sign-up fields and reject duplicate email addresses. |
| `POST` | `/api/v1/auth/signin` | Sign in to the student's own workspace using valid credentials. |
| `GET` | `/api/v1/dashboard` | Read the student's dashboard overview, including today's classes, upcoming assignments, streak summary, enabled reminders, and note summaries. |
| `GET`, `POST` | `/api/v1/classes` | List the student's classes or create a class schedule entry. |
| `GET`, `PATCH`, `DELETE` | `/api/v1/classes/{classId}` | Read, update, or delete one owned class; deletion requires confirmation when linked notes exist. |
| `GET`, `POST` | `/api/v1/assignments` | List or create the student's assignments. |
| `GET`, `PATCH`, `DELETE` | `/api/v1/assignments/{assignmentId}` | Read, update, or delete one owned assignment. |
| `GET`, `POST` | `/api/v1/notes?kind=class\|quick` | List or create class notes and quick notes; class notes require a valid class association. |
| `GET`, `PATCH`, `DELETE` | `/api/v1/notes/{noteId}` | Read, update, or delete one owned note while preserving its type and association unless deliberately changed. |
| `GET`, `PATCH` | `/api/v1/preferences` | Read or update the student's appearance, dashboard visibility, hydration reminder, and timer preferences. |
| `POST` | `/api/v1/study-sessions` | Start a study session for the student. |
| `PATCH` | `/api/v1/study-sessions/{sessionId}` | Complete or cancel an owned study session; completed sessions contribute to the local-day streak calculation. |
| `GET` | `/api/v1/study-streak` | Read current and longest streak summaries and completed study dates. |
| `POST` | `/api/v1/wellness/hydration-check-ins` | Record a student-initiated hydration check-in. |
| `POST` | `/api/v1/wellness/break-sessions` | Start a break-timer session. |
| `PATCH` | `/api/v1/wellness/break-sessions/{sessionId}` | Pause, resume, complete, or cancel an owned break-timer session. |

## Implementation Priority

1. **P1 — Student workspace foundation**: Sign-up, private student data, create/read/update for classes, assignments, and both note types; dashboard overview and empty states.
2. **P2 — Data cleanup and wellness**: Confirmed deletion, study-session and streak tracking, optional hydration reminders and check-ins, and break timers.
3. **P3 — Personalization polish**: Expanded appearance and widget customization beyond the core preferences needed for a usable, legible dashboard.

This priority order does not remove any feature from the stated product scope. P1 provides a useful academic dashboard; wellness and deeper personalization follow while remaining optional.

## Technical Requirements

- **Framework:** Next.js with App Router.
- **Language:** TypeScript with strict mode enabled.
- **UI Library:** React.
- **Styling:** Tailwind CSS.
- **Code Quality:** ESLint and Prettier.
- **Version Control:** Git and GitHub using feature branches and pull requests.
- **Architecture:** Next.js App Router with reusable components and a clear separation of concerns.
- **API:** RESTful API endpoints for managing application resources.

## Assumptions

- Sign-up uses email, password, and display name; a specific identity provider or password recovery flow is not defined in this product specification.
- “Dual notes system” means class notes linked to a class and quick notes that are not linked to a class.
- A study streak day is earned by at least one completed study session on that student's local calendar day; study goals and penalties are not required.
- Hydration and break reminders are optional, configurable, and dismissible or snoozable.
- Class entries may recur on selected weekdays. Importing from learning-management systems or external calendars is outside this initial scope.
- The feature does not include collaboration, sharing, medical advice, or automatic wellness tracking.
