# Cozy Corner – Application Architecture Proposal

**Status:** Draft – Pending Team Review  
**Project:** WDD430 – Web Full-Stack Development

## 1. Purpose

This document proposes the initial application architecture for Cozy Corner.

The goal is to establish a clear, maintainable, and scalable project structure that supports the application's requirements while allowing team members to work independently on different features.

The proposed architecture follows a **feature-based organization**, where each major application feature contains its own components, types, and logic.

This structure is a proposal and may be adjusted based on team feedback and implementation needs.

## 2. Technology Stack

The application will use the following technologies:

- **Next.js:** Application framework using the App Router.
- **React:** User interface development.
- **TypeScript:** Static typing and improved code reliability.
- **Tailwind CSS:** Styling and responsive layouts.
- **ESLint and Prettier:** Code quality and formatting.

## 3. Main Application Modules

The application will be organized around the following functional areas:

| Module | Responsibility |
|---|---|
| Authentication | User registration and sign-in. |
| Dashboard | Overview of academic activities and enabled widgets. |
| Classes | Class schedules and class information management. |
| Assignments | Assignment creation, tracking, and management. |
| Notes | Class notes and independent quick notes. |
| Settings | Dashboard preferences and personalization. |
| Study Tracking | Study sessions and study streaks. |
| Wellness | Hydration check-ins and break timer functionality. |

### Implementation Priorities

Features will follow the priorities established in the project specification:

- **P1 – Core functionality:** Authentication, classes, assignments, notes, and the main dashboard.
- **P2 – Additional functionality:** Deleting records, study tracking, hydration, and break timer.
- **P3 – Enhancements:** Additional customization and improvements.

Wellness features should remain optional and should not interfere with the main academic experience.

## 4. Proposed Folder Structure

The following structure is proposed for the project:

```text
cozy-corner/
│
├── .github/                         # GitHub project configuration and instructions
│   └── copilot-instructions.md      # Guidelines for GitHub Copilot
│
├── app/                             # Application routes and layouts (Next.js App Router)
│   │
│   ├── (auth)/                      # Authentication routes
│   │   ├── signup/
│   │   │   └── page.tsx             # User registration page
│   │   └── signin/
│   │       └── page.tsx             # User sign-in page
│   │
│   ├── (dashboard)/                 # Main application routes
│   │   ├── page.tsx                 # Main dashboard page
│   │   ├── classes/
│   │   │   └── page.tsx             # Classes page
│   │   ├── assignments/
│   │   │   └── page.tsx             # Assignments page
│   │   ├── notes/
│   │   │   └── page.tsx             # Notes page
│   │   └── settings/
│   │       └── page.tsx             # User preferences page
│   │
│   ├── api/                         # API route handlers
│   │   └── v1/                      # Version 1 of the API
│   │       ├── auth/                # Authentication endpoints
│   │       ├── classes/             # Class management endpoints
│   │       ├── assignments/         # Assignment management endpoints
│   │       ├── notes/               # Notes management endpoints
│   │       ├── preferences/         # Dashboard preferences endpoints
│   │       ├── study-sessions/      # Study session endpoints
│   │       └── wellness/            # Wellness activity endpoints
│   │
│   ├── layout.tsx                   # Root application layout
│   └── globals.css                 # Global styles
│
├── components/                      # Reusable components shared across features
│   ├── layout/                      # Navigation, headers, and page layouts
│   ├── ui/                          # Basic interface elements (buttons, inputs, dialogs)
│   └── shared/                      # General-purpose shared components
│
├── features/                        # Feature-based application modules
│   │
│   ├── auth/                        # Authentication functionality
│   │   ├── components/              # Sign-up and sign-in components
│   │   ├── types/                   # Authentication TypeScript types
│   │   └── services/                # Authentication-related operations
│   │
│   ├── dashboard/                   # Dashboard functionality
│   │   └── components/              # Dashboard widgets and sections
│   │
│   ├── classes/                     # Class management functionality
│   │   ├── components/              # Class list, cards, and forms
│   │   ├── types/                   # Class TypeScript types
│   │   └── services/                # Class-related operations
│   │
│   ├── assignments/                 # Assignment management functionality
│   │   ├── components/              # Assignment list, cards, and forms
│   │   ├── types/                   # Assignment TypeScript types
│   │   └── services/                # Assignment-related operations
│   │
│   ├── notes/                       # Notes management functionality
│   │   ├── components/              # Note cards, forms, and note views
│   │   ├── types/                   # Note TypeScript types
│   │   └── services/                # Notes-related operations
│   │
│   ├── settings/                    # User preferences and customization
│   │   ├── components/              # Settings and preference components
│   │   └── types/                   # Settings TypeScript types
│   │
│   ├── study-tracking/              # Study sessions and streak tracking
│   │   ├── components/              # Study tracking interface components
│   │   ├── types/                   # Study tracking TypeScript types
│   │   └── services/                # Study tracking operations
│   │
│   └── wellness/                    # Optional wellness functionality
│       ├── components/              # Hydration and break timer components
│       ├── types/                   # Wellness TypeScript types
│       └── services/                # Wellness-related operations
│
├── lib/                             # Shared utilities and configurations
│
├── public/                          # Static assets (images, icons, fonts)
│
├── docs/                            # Project documentation
│   └── architecture.md              # Application architecture proposal
│
├── package.json                     # Project dependencies and scripts
├── package-lock.json                # Dependency version lockfile
├── next.config.ts                   # Next.js configuration
└── tsconfig.json                    # TypeScript configuration
```

**Note:** This is a proposed target structure. Folders should be created as the corresponding features are implemented, rather than creating empty folders for every module immediately.

## 5. Architecture Responsibilities

### App Router (`app/`)

The `app/` directory will manage application routes, layouts, and API endpoints.

Responsibilities:

- Define application pages and navigation.
- Separate authentication pages from the main dashboard experience.
- Provide API route handlers under `/api/v1`.
- Keep page files focused on composing feature components.

Route groups such as `(auth)` and `(dashboard)` organize pages without adding those group names to the URL.

### Features (`features/`)

Each feature will contain the components and logic related to its functionality.

For example, the Classes feature may contain:

```text
features/classes/
├── components/          # Class-related interface components
│   ├── ClassList.tsx
│   ├── ClassCard.tsx
│   └── ClassForm.tsx
│
├── types/               # TypeScript definitions for classes
│   └── class.ts
│
└── services/            # Class-related operations
    └── class-service.ts
```

This organization keeps related code together and reduces unnecessary dependencies between features.

### Shared Components (`components/`)

Components used across multiple features should be placed in shared directories.

- `ui/`: Basic reusable interface elements, such as buttons, inputs, and dialogs.
- `layout/`: Application-wide layout components, such as navigation and page containers.
- `shared/`: Reusable components that do not belong to a single feature.

Feature-specific components should remain inside their respective feature folders.

### Shared Utilities (`lib/`)

The `lib/` directory will contain shared utilities and infrastructure code, such as common helpers and application-wide configurations.

## 6. Component Organization Examples

### Dashboard

The dashboard will combine information from different features.

```text
Dashboard
├── WelcomeSection             # Personalized welcome message
├── TodaySchedule              # Classes scheduled for today
│   └── ClassCard              # Individual class information
├── UpcomingAssignments        # Upcoming academic tasks
│   └── AssignmentCard         # Individual assignment information
├── NotesPreview               # Recent notes preview
├── StudyStreak                # Current study streak
└── OptionalWellnessWidgets    # Optional wellness features
    ├── HydrationReminder      # Hydration check-in
    └── BreakTimer             # Study break timer
```

The dashboard should support empty states and display optional widgets according to user preferences.

### Classes

```text
Classes
├── ClassList                  # Displays the student's classes
│   └── ClassCard              # Displays individual class information
├── ClassForm                  # Creates or edits a class
└── ClassDetails               # Displays class information
    └── ClassNotesList         # Notes associated with a class
```

### Assignments

```text
Assignments
├── AssignmentList             # Displays assignments
│   └── AssignmentCard         # Displays individual assignment information
├── AssignmentForm             # Creates or edits an assignment
└── AssignmentDetails          # Displays assignment information
```

### Notes

```text
Notes
├── NotesTabs                  # Switches between note categories
├── ClassNotes                 # Displays notes linked to classes
├── QuickNotes                 # Displays independent notes
├── NoteCard                   # Displays individual note information
└── NoteForm                   # Creates or edits a note
```

These examples represent conceptual component responsibilities. The final component breakdown may change during implementation.

## 7. Development Guidelines

To maintain consistency across the team, the following guidelines are proposed:

1. Use TypeScript for application code.
2. Avoid `any`; define explicit types when necessary.
3. Prefer reusable components when they provide clear value.
4. Keep components focused on a single responsibility.
5. Follow the existing Next.js App Router conventions.
6. Use Tailwind CSS for styling.
7. Keep feature-specific code inside its corresponding feature directory.
8. Place shared components in the appropriate shared directory.
9. Avoid unnecessary dependencies and overengineering.
10. Follow the project's Git branch and Pull Request workflow.

## 8. Data and Feature Integration

Each feature should interact with its own data and services while following the common application requirements.

The architecture should support the main entities defined in the project specification:

- Student Account
- Class
- Assignment
- Note
- Dashboard Preferences
- Study Session and Streak
- Wellness Activity

User-specific information must remain private and associated with the correct student account.

The detailed data model and relationships will be documented separately as part of the team's data modeling work.

## 9. Pending Team Decisions

The following items require team discussion and agreement:

- Review and approve the proposed folder structure.
- Confirm the responsibilities of shared and feature-specific components.
- Review the component hierarchy and identify reusable elements.
- Align the architecture with the data model.
- Confirm the implementation order based on feature priorities.

## 10. Conclusion

This proposal establishes an initial foundation for Cozy Corner using a feature-based architecture.

The intention is to keep the project organized, encourage collaboration, reduce code duplication, and make future development easier.

The architecture will be updated as the team reviews the proposal and implementation decisions are finalized.

## 11. Folder and Naming Conventions

To maintain consistency and readability across the project, all team members should follow the same folder organization and naming conventions.

### Folder Naming

- Use **kebab-case** for folder names.
- Use descriptive names that clearly identify the folder's purpose.
- Keep feature-related files inside their corresponding feature directories.

Examples:

```text
features/
├── study-tracking/
├── assignments/
└── classes/
```

### File Naming

| File Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `ClassCard.tsx` |
| Custom hooks | camelCase with `use` prefix | `useClasses.ts` |
| Functions and variables | camelCase | `getAssignments()` |
| Types and interfaces | PascalCase | `Class`, `Assignment` |
| Service files | kebab-case | `class-service.ts` |
| Next.js page files | Next.js convention | `page.tsx` |
| Layout files | Next.js convention | `layout.tsx` |

### Component Organization

The following rules should be followed:

1. Keep feature-specific components inside their corresponding `features/` directory.
2. Place reusable components shared by multiple features inside `components/`.
3. Use the `ui/` directory for basic reusable interface elements.
4. Use the `layout/` directory for application-wide layout components.
5. Avoid duplicating components or business logic.
6. Keep components focused on a single responsibility.
7. Define explicit TypeScript types for component props and application data.
8. Follow the existing project structure before introducing new folders.

### Styling Guidelines

- Use Tailwind CSS for component styling.
- Follow the design guidelines agreed upon by the team.
- Maintain consistency in colors, typography, spacing, and responsive behavior.
- Avoid unnecessary inline styles and duplicated CSS rules.

## 12. Git Workflow and Pull Request Guidelines

The team will follow a branch-based Git workflow to keep the main branch stable and make collaboration easier.

### Branch Strategy

The `main` branch will contain the approved and integrated project code.

Each team member should create a separate branch for each task or feature.

Use the following naming conventions:

| Branch Type | Naming Convention | Example |
|---|---|---|
| Feature | `feature/description` | `feature/classes-management` |
| Bug Fix | `fix/description` | `fix/assignment-validation` |
| Documentation | `docs/description` | `docs/update-architecture` |
| Refactoring | `refactor/description` | `refactor/shared-components` |

### Development Workflow

The expected workflow for each contribution is:

1. **Update the main branch:** Pull the latest changes from the remote `main` branch.
2. **Create a branch:** Create a new branch for the assigned task.
3. **Develop:** Implement the feature or modification.
4. **Commit changes:** Use clear and descriptive commit messages.
5. **Push changes:** Publish the branch to the remote repository.
6. **Open a Pull Request:** Create a PR targeting `main`.
7. **Request a code review:** Ask another team member to review the changes.
8. **Address feedback:** Make the necessary corrections and push additional commits.
9. **Merge:** Merge the PR after the required approval and successful checks.

### Pull Request Guidelines

Every Pull Request should:

- Have a clear and descriptive title.
- Explain the purpose of the changes.
- Include a summary of the implemented work.
- Reference the related GitHub issue when applicable.
- Avoid unrelated modifications.
- Include screenshots when visual changes are relevant.
- Confirm that the application builds successfully.
- Confirm that ESLint checks pass.

### Code Review and Approval

To maintain code quality and encourage collaboration:

- Every PR should receive at least one review from another team member.
- Reviewers should check code readability, functionality, consistency, and potential issues.
- Feedback should be specific, respectful, and actionable.
- Authors should address requested changes before merging.
- PRs should not be merged without the required approval.

The team should use GitHub Pull Requests as the primary mechanism for integrating code changes into `main`.

## 13. Team Collaboration Guidelines

To coordinate development and avoid conflicts, the team will follow these collaboration guidelines.

### Responsibilities

The following responsibilities define the initial areas of coordination for each team member:

| Team Member | Primary Responsibility |
|---|---|
| Arturo Romero | Component architecture, project structure, development conventions, and Pull Request coordination. |
| Nelson Georges | Data models, TypeScript types, and academic feature integration. |
| Jelina Alexandrine Concha | UI design, visual components, styling guidelines, and user experience consistency. |
| Nephi Ulimuke-Ebegim | GitHub issues, project board organization, and project documentation. |

These responsibilities establish areas of coordination and do not prevent team members from contributing to other parts of the application.

### Communication

- Team members should provide regular progress updates.
- Blockers and technical questions should be communicated as soon as possible.
- Important technical decisions should be documented.
- Team members should request assistance when necessary.
- Changes that affect shared components or project structure should be discussed before implementation.

### Task Coordination

- Development tasks should be tracked using the GitHub Project Board.
- Each task should have a clear description and acceptance criteria.
- Tasks should be assigned to the responsible team member.
- Related Pull Requests should reference their corresponding GitHub issues.
- Team members should keep issue statuses updated to reflect their progress.

These guidelines aim to promote transparency, accountability, and effective collaboration throughout the project.