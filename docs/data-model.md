# Cozy Corner — Data Model

## 1. Overview

This document defines the initial data model for Cozy Corner, a customizable student dashboard developed as part of WDD430 – Web Full-Stack Development.

The data model describes the main entities, their attributes, relationships, and integrity constraints required to support the application's academic features.

The initial model focuses on student accounts, classes, assignments, notes, and dashboard preferences. Additional entities will be introduced as future features are implemented.

## 2. Technology Stack

The current database implementation will use:

- **Database:** PostgreSQL
- **Database Hosting:** Neon
- **ORM:** Drizzle ORM
- **Backend:** Next.js Route Handlers
- **Deployment:** Vercel

This stack provides relational data integrity, cloud database hosting, and type-safe database access through TypeScript.

## 3. Core Data Entities

### 3.1 User

Stores student account information.

| Field        | Type         | Constraints                                |
| ------------ | ------------ | ------------------------------------------ |
| id           | UUID         | Primary Key                                |
| displayName  | VARCHAR(100) | Required                                   |
| email        | VARCHAR(255) | Required, Unique                           |
| passwordHash | TEXT         | Required for password-based authentication |
| createdAt    | TIMESTAMP    | Default current time                       |

**Relationships:**

- One user can have multiple classes.
- One user can have multiple assignments.
- One user can have multiple notes.
- One user has one dashboard preferences record.

**Business rules:**

- Email addresses must be unique.
- Passwords must never be stored in plaintext.
- User-owned records must only be accessible by their authenticated owner.

### 3.2 Class

Stores student class schedules.

| Field       | Type         | Constraints                  |
| ----------- | ------------ | ---------------------------- |
| id          | UUID         | Primary Key                  |
| userId      | UUID         | Required, Foreign Key → User |
| name        | VARCHAR(150) | Required                     |
| meetingDays | TEXT[]       | Required                     |
| startTime   | TIME         | Required                     |
| endTime     | TIME         | Required                     |
| location    | VARCHAR(255) | Optional                     |
| color       | VARCHAR(20)  | Optional                     |

**Relationships:**

- Each class belongs to one user.
- A user can create multiple classes.
- A class can have multiple assignments.
- A class can have multiple class notes.

**Business rules:**

- A class must belong to an authenticated user.
- The end time must be later than the start time for the supported same-day schedule model.
- Deleting a class with linked notes requires explicit confirmation.
- The application must not silently delete linked notes.

### 3.3 Assignment

Stores academic tasks and deadlines.

| Field       | Type         | Constraints                  |
| ----------- | ------------ | ---------------------------- |
| id          | UUID         | Primary Key                  |
| userId      | UUID         | Required, Foreign Key → User |
| classId     | UUID         | Optional Foreign Key → Class |
| title       | VARCHAR(200) | Required                     |
| description | TEXT         | Optional                     |
| dueDate     | TIMESTAMPTZ  | Optional                     |
| completed   | BOOLEAN      | Default false                |
| createdAt   | TIMESTAMP    | Default current time         |

**Relationships:**

- Each assignment belongs to one user.
- An assignment can optionally belong to one class.
- A class can have multiple assignments.

**Business rules:**

- Assignments can exist without an associated class.
- If an assignment references a class, that class must belong to the same user.
- Users can create, view, update, complete, and delete their own assignments.

### 3.4 Note

Stores class notes and quick notes.

| Field     | Type         | Constraints                  |
| --------- | ------------ | ---------------------------- |
| id        | UUID         | Primary Key                  |
| userId    | UUID         | Required, Foreign Key → User |
| classId   | UUID         | Optional Foreign Key → Class |
| kind      | VARCHAR(10)  | Required, 'class' or 'quick' |
| title     | VARCHAR(200) | Required                     |
| content   | TEXT         | Required                     |
| createdAt | TIMESTAMP    | Default current time         |
| updatedAt | TIMESTAMP    | Updated on modification      |

**Relationships:**

- Each note belongs to one user.
- A note may reference one class.
- A class can have multiple class notes.

**Business rules:**

- Class notes (`kind = 'class'`) must have a valid `classId`.
- Quick notes (`kind = 'quick'`) must have a NULL `classId`.
- A note referencing a class must belong to the same user as that class.
- Updating a note must refresh its `updatedAt` value.
- Deleting a class with associated class notes requires confirmation and must explain the impact.

**Data integrity constraint:**

The application and database validation should enforce the following condition:

- `kind = 'class'` requires `classId IS NOT NULL`.
- `kind = 'quick'` requires `classId IS NULL`.

### 3.5 Dashboard Preferences

Stores individual dashboard customization settings.

| Field             | Type        | Constraints                          |
| ----------------- | ----------- | ------------------------------------ |
| id                | UUID        | Primary Key                          |
| userId            | UUID        | Required, Foreign Key → User, Unique |
| theme             | VARCHAR(30) | Default theme                        |
| visibleWidgets    | JSONB       | Widget visibility settings           |
| hydrationEnabled  | BOOLEAN     | Default false                        |
| hydrationInterval | INTEGER     | Optional, minutes                    |
| breakDuration     | INTEGER     | Default 5 minutes                    |
| timeZone          | VARCHAR(64) | Student's selected time zone         |

**Relationships:**

- Each preferences record belongs to one user.
- Each user can have only one preferences record.

**Business rules:**

- Preferences must belong to the authenticated user.
- The `userId` field must be unique.
- Hydration and break settings are optional wellness preferences.
- The selected time zone should be used when calculating local study days and streaks.

## 4. Entity Relationships

The initial data model defines the following relationships:

| Relationship                 | Cardinality | Description                            |
| ---------------------------- | ----------- | -------------------------------------- |
| User → Class                 | One-to-Many | A user can have multiple classes.      |
| User → Assignment            | One-to-Many | A user can have multiple assignments.  |
| User → Note                  | One-to-Many | A user can have multiple notes.        |
| User → Dashboard Preferences | One-to-One  | A user has one preferences record.     |
| Class → Assignment           | One-to-Many | A class can have multiple assignments. |
| Class → Note                 | One-to-Many | A class can have multiple class notes. |

An assignment may exist without a class association. A quick note must remain independent of any class.

## 5. Data Integrity and Security

The following rules apply across all entities:

1. Every student-owned record must be associated with an authenticated user.
2. Users must only access and modify their own records.
3. Email addresses must be unique.
4. Passwords must never be stored in plaintext.
5. Assignment and note references must point to classes owned by the same user.
6. Class notes require a valid class association.
7. Quick notes must not have a class association.
8. Each user must have only one dashboard preferences record.
9. Invalid updates must not overwrite existing valid records.
10. Deleting a class with linked notes must require explicit confirmation.
11. Database operations must validate record ownership on the server.
12. Client-provided user identifiers must never be trusted as the source of authorization.

Where practical, enforce important integrity rules using database constraints and foreign keys in addition to application-level validation.

For relationships involving both `userId` and `classId`, consider database constraints that prevent records from referencing classes owned by another user.

## 6. Future Data Models

The following entities are part of the overall Cozy Corner specification but are not included in the initial database implementation.

They will be introduced as their corresponding features are developed.

### 6.1 Study Session

Stores individual study sessions.

Potential responsibilities:

- Record completed study sessions.
- Associate sessions with the authenticated user.
- Store session dates and durations.
- Provide data for study streak calculations.

### 6.2 Study Streak

Supports tracking consecutive days of study activity.

Potential responsibilities:

- Calculate the current study streak.
- Track the longest study streak.
- Use the student's local calendar day and selected time zone.
- Count a day when at least one study session is completed.

The final implementation may calculate streaks from study session records instead of maintaining a separate table.

### 6.3 Hydration Check-in

Stores hydration activity.

Potential responsibilities:

- Record hydration check-ins.
- Associate check-ins with the authenticated user.
- Support hydration reminders and related preferences.

### 6.4 Break Session

Stores break timer activity.

Potential responsibilities:

- Record started, paused, resumed, completed, or cancelled break sessions.
- Associate sessions with the authenticated user.
- Store session duration and status.

Break sessions must not modify academic records.

## 7. Database Implementation Guidelines

When implementing the database:

- Use UUID identifiers for primary keys.
- Define foreign keys for entity relationships.
- Use unique constraints where required.
- Use appropriate PostgreSQL data types.
- Define sensible defaults for fields such as `createdAt` and `completed`.
- Validate required fields and relationships.
- Use Drizzle ORM for database queries and schema definitions.
- Keep database schema definitions organized in the database module.
- Use migrations to track database schema changes.
- Avoid modifying existing data structures without considering their impact on implemented features.

Database implementation details may evolve as the application develops, but changes must preserve the documented business rules and data integrity requirements.

## 8. Document Maintenance

This document is the working reference for the Cozy Corner database model.

Update it whenever significant changes are made to:

- Entity definitions.
- Database fields or data types.
- Relationships.
- Constraints and business rules.
- Database technologies.
- Future data models.

Keep the implementation, database migrations, and documentation consistent.
