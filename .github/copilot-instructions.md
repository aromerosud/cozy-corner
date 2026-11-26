# GitHub Copilot Instructions

## 1. Project Context

Cozy Corner is a customizable student dashboard developed as part of WDD430 – Web Full-Stack Development.

The application helps students organize their academic activities, manage assignments, take notes, and develop productive study habits in a calm, personalized environment.

The main features include:

- Student registration and authentication.
- Academic dashboard.
- Class schedule management.
- Assignment management.
- Class notes and quick notes.
- Dashboard customization.
- Study sessions and streak tracking.
- Optional wellness features, including hydration reminders and break timers.

Prioritize a clean, accessible, responsive, and maintainable application.

## 2. Project Documentation

Before implementing a feature, consult the relevant project documentation:

| Document               | Purpose                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `spec.md`              | Functional requirements, user stories, business behavior, and project scope.                             |
| `docs/architecture.md` | Application architecture, folder organization, components, naming conventions, and development workflow. |
| `docs/data-model.md`   | Database entities, attributes, relationships, constraints, and data integrity rules.                     |

Use these documents as the primary references when implementing features.

Do not duplicate entire specifications, architectural definitions, or database models in this file.

If documentation conflicts with the existing implementation, identify the conflict and explain it before making significant changes.

Keep implementation and documentation consistent.

## 3. Technology Stack

Use the project's established technologies:

- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- PostgreSQL.
- Neon for database hosting.
- Drizzle ORM for database access.
- Next.js Route Handlers for API endpoints.
- ESLint and Prettier.
- Vercel for deployment.

Use the existing project dependencies and configuration. Do not introduce alternative technologies or unnecessary dependencies without a clear technical reason.

## 4. Development and Architecture Guidelines

Follow the feature-based architecture described in `docs/architecture.md`.

Apply these principles:

- Keep feature-specific components, types, and services within their corresponding feature.
- Use shared components when they provide clear value across multiple features.
- Keep shared utilities and configuration in appropriate shared locations.
- Keep page components focused on composing feature components.
- Separate business logic from presentation when appropriate.
- Follow Next.js App Router conventions.
- Avoid unnecessary abstractions and overengineering.
- Create folders as features are implemented instead of creating unnecessary empty directories.

## 5. Data and Business Rules

Follow `docs/data-model.md` when implementing database-related functionality.

Important rules include:

- Every student-owned record must belong to its authenticated user.
- Users must only access and modify their own records.
- Passwords must never be stored in plaintext.
- Related records must reference resources owned by the same user.
- Class notes require a valid class association.
- Quick notes must remain independent of classes.
- Assignments may optionally be associated with a class.
- Deleting a class with linked notes requires explicit confirmation.
- Invalid updates must not overwrite existing valid records.

Enforce important validation and security rules on the server, not only in the user interface.

Do not invent new database relationships or modify existing business rules without documenting the reason.

## 6. TypeScript and React Guidelines

- Use TypeScript for all application code.
- Avoid `any`; define explicit types when necessary.
- Prefer functional React components.
- Use clear and descriptive names.
- Define explicit component props and function return types when they improve clarity.
- Use Server Components by default.
- Use Client Components only when browser interaction, state, or event handling requires them.
- Keep components focused on a single responsibility.
- Follow the project's naming conventions.

## 7. Database and API Guidelines

- Use PostgreSQL through Neon.
- Use Drizzle ORM for database schema definitions and queries.
- Use migrations to track database schema changes.
- Follow the API conventions described in `spec.md`.
- Use Next.js Route Handlers for API endpoints under `/api/v1/`.
- Validate incoming data before performing database operations.
- Verify authentication and record ownership before accessing student data.
- Handle errors consistently and return appropriate HTTP status codes.
- Avoid exposing sensitive information in API responses.
- Keep database access separate from route handling when practical.
- Do not assume an endpoint is implemented just because it appears in the specification.

## 8. Styling and Accessibility

Use Tailwind CSS and follow the project's visual conventions.

- Maintain a consistent visual identity.
- Ensure responsive layouts for desktop, tablet, and mobile.
- Use readable typography, spacing, and sufficient color contrast.
- Support keyboard navigation.
- Use semantic HTML elements.
- Provide accessible labels and descriptions for form controls.
- Make validation errors understandable and accessible.
- Do not rely on color alone to communicate important information.

Maintain Cozy Corner's calm, welcoming, and customizable visual identity.

## 9. Code Quality

- Write readable, maintainable code.
- Follow the existing project structure and conventions.
- Handle errors appropriately.
- Avoid unnecessary code duplication.
- Keep changes focused on the assigned feature or issue.
- Do not modify unrelated files.
- Avoid unnecessary dependencies.
- Run ESLint and relevant build or validation checks before submitting changes.
- Update documentation when significant implementation decisions change.

## 10. Git and Pull Request Workflow

Follow the team's feature-branch workflow.

Use these branch prefixes:

- `feature/description`
- `fix/description`
- `docs/description`
- `refactor/description`

Development workflow:

1. Update the local `main` branch.
2. Create a branch for the assigned task.
3. Implement the feature or fix.
4. Test the changes and run relevant quality checks.
5. Commit with clear, descriptive messages.
6. Push the branch to GitHub.
7. Open a Pull Request targeting `main`.
8. Request a team review.
9. Address review feedback before merging.

Pull Requests should include a clear title, description, summary of changes, related issue reference, and screenshots when relevant.

Do not commit directly to `main` for normal feature development.

## 11. Before Making Changes

Before implementing a feature:

1. Review the relevant existing files.
2. Understand the current implementation and project structure.
3. Consult the relevant project documentation.
4. Identify dependencies and possible impacts on other features.
5. Implement only what is required for the assigned task.
6. Explain significant changes when they affect architecture, data structures, or application behavior.

Do not assume a feature is required unless it is included in the project specification or agreed team scope.

When requirements are unclear or conflict with existing implementation, explain the issue and propose a solution before making significant changes.

Prefer simple, maintainable solutions that follow the project's established conventions.
