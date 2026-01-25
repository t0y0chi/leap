# Screens

Snapshot of the current UI routes and what each screen presents. Update this table when screens or flows change.

| Screen | Path | Description |
| --- | --- | --- |
| App shell | `app/(app)/layout.tsx` | Shared chrome with LEAP brand, dashboard/courses nav, notifications icon, and profile avatar linking to `/profile`. |
| Home redirect | `/` | Immediately redirects to `/dashboard`. |
| Login | `/login` | Sign-in form in gradient auth layout with LEAP wordmark header. |
| Signup | `/signup` | Account creation form with name, email, international phone, and password in the same auth layout. |
| Dashboard | `/dashboard` | Welcome message and `CourseList` for the focused course with Resume CTA. |
| Courses | `/courses` | Catalog of all available courses via `CourseList`. |
| Course detail | `/courses/[courseId]` | Course hero (progress/tags), chapter list with lesson summaries, links to chapter detail, and “Continue”. |
| Chapter outline | `/courses/[courseId]/chapters/[chapterId]` | Chapter lessons with status/locked state, open CTA, and sidebar stats with “Continue chapter”. |
| Course Q&A | `/courses/[courseId]/qna` | Q&A board of threads with answered/pending badges and open-thread link. |
| Learn redirect | `/learn/courses/[courseId]` | Redirects to the first incomplete (or first) lesson in the course. |
| Learn chapter | `/learn/courses/[courseId]/chapters/[chapterId]` | In-flow chapter overview with active lesson highlight, lesson copy, checkpoints, and lesson list/status; CTA to open active lesson. |
| Learn lesson | `/learn/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]` | Lesson player (video/reading/quiz/assignment), progress bar, and gated navigation based on readiness. |
| Notifications | `/notifications` | Notifications list with type badges, unread markers, and timestamps. |
| Notification detail | `/notifications/[notificationId]` | Grading update detail with score, feedback, and attachments. |
| Profile | `/profile` | Learner profile summary, contact info, and status. |
| Edit profile | `/profile/edit` | Edit name parts, avatar, and phone with links to dedicated email/password screens. |
| Change email | `/profile/email` | Update account email address on a dedicated form. |
| Change password | `/profile/password` | Update account password on a dedicated form. |

## Admin screens

| Screen | Path | Description |
| --- | --- | --- |
| Admin redirect | `/admin` | Redirects to `/admin/dashboard`. |
| Admin login | `/admin/login` | Admin/auth layout with email, password, and OTP fields. |
| Admin dashboard | `/admin/dashboard` | Minimal admin landing view with primary navigation actions. |
| Courses | `/admin/courses` | Course table with status, enrollments, and updated timestamp. |
| Course detail | `/admin/courses/[courseId]` | Course overview with status and integrated chapter management. |
| Course preview | `/preview/courses/[courseId]` | Learner-style course view for admin preview in a dedicated layout. |
| Preview learn course | `/preview/learn/courses/[courseId]` | Preview entry point that opens the first lesson. |
| Preview learn chapter | `/preview/learn/courses/[courseId]/chapters/[chapterId]` | Preview chapter view with all lessons accessible. |
| Preview learn lesson | `/preview/learn/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]` | Preview lesson view without progression gating. |
| Create course | `/admin/courses/new` | Form for course metadata, summary, and tags. |
| Edit course | `/admin/courses/[courseId]/edit` | Edit metadata, visibility, and see enrollment/progress stats. |
| Lessons | `/admin/chapters/[chapterId]/lessons` | Chapter lessons table with type, gating, graded status, and edit/preview links. |
| Edit lecture | `/admin/lessons/[lessonId]/lecture/edit` | Lecture editor for media URL, duration, notes, and status. |
| Edit quiz | `/admin/lessons/[lessonId]/quiz/edit` | Quiz editor for multi-question prompts, choices, and correct answers. |
| Edit assignment | `/admin/lessons/[lessonId]/assignment/edit` | Assignment editor for instructions, attachments, rubric, and scoring. |
| Submissions | `/admin/assignments/submissions` | All submissions with learner, course, status, score, and grade action. |
| Pending submissions | `/admin/assignments/submissions/pending` | Filtered list of submissions waiting for grading with SLA hint. |
| Submission detail | `/admin/assignments/submissions/[submissionId]` | Metadata, attachments, learner notes, and feedback links. |
| Grade submission | `/admin/assignments/submissions/[submissionId]/grade` | Grading form with score, status, feedback, and internal notes. |
| Submission history | `/admin/assignments/submissions/[submissionId]/history` | Timeline of submission events and versions. |
| Users | `/admin/users` | Learner table with progress, scores, risk, and actions. |
| User detail | `/admin/users/[userId]` | Learner progress, stats, and recent submissions. |
| Invite admin | `/admin/admins/invite` | Invitation form for reviewers/admins with message. |
| Invitations | `/admin/admins/invitations` | Admin roster plus pending invites with status. |
| Admin profile | `/admin/profile` | Admin profile summary with avatar and contact details. |
| Admin profile edit | `/admin/profile/edit` | Admin profile edit form for avatar, name, and email. |
