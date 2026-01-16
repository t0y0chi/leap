# Screens

Snapshot of the current UI routes and what each screen presents. Update this table when screens or flows change.

| Screen | Path | Description |
| --- | --- | --- |
| App shell | `app/(app)/layout.tsx` | Shared chrome with LEAP brand, dashboard/courses nav, notifications icon, and profile avatar linking to `/profile`. |
| Home redirect | `/` | Immediately redirects to `/dashboard`. |
| Login | `/login` | Sign-in form in gradient auth layout with LEAP wordmark header. |
| Signup | `/signup` | Account creation form in the same auth layout. |
| Dashboard | `/dashboard` | Welcome message and `CourseList` for the focused course with Resume CTA. |
| Courses | `/courses` | Catalog of all available courses via `CourseList`. |
| Course detail | `/courses/[courseId]` | Course hero (progress/tags), chapter list with item summaries, links to chapter detail, and “Continue”. |
| Chapter outline | `/courses/[courseId]/chapters/[chapterId]` | Chapter items with status/locked state, open CTA, and sidebar stats with “Continue chapter”. |
| Course Q&A | `/courses/[courseId]/qna` | Q&A board of threads with answered/pending badges and open-thread link. |
| Learn redirect | `/learn/courses/[courseId]` | Redirects to the first incomplete (or first) item in the course. |
| Learn chapter | `/learn/courses/[courseId]/chapters/[chapterId]` | In-flow chapter overview with active item highlight, lesson copy, checkpoints, and item list/status; CTA to open active item. |
| Learn item | `/learn/courses/[courseId]/chapters/[chapterId]/items/[itemId]` | Item player (video/reading/quiz/assignment), progress bar, and gated navigation based on readiness. |
| Notifications | `/notifications` | Notifications list with type badges, unread markers, and timestamps. |
| Profile | `/profile` | Learner profile summary and activity cards. |
| Edit profile | `/profile/edit` | Editable profile form (name, email, password), avatar preview, and preference toggles. |
