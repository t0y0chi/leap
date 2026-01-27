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
| Course detail | `/courses/[courseId]` | Course hero (progress/tags), chapter list with lesson summaries, and “Continue”. |
| Course Q&A | `/courses/[courseId]/qna` | Q&A board of threads with answered/pending badges and open-thread link. |
| Q&A thread detail | `/courses/[courseId]/qna/[questionId]` | Single Q&A thread with question context, reply list, and accepted answer highlight. |
| Learn redirect | `/learn/courses/[courseId]` | Redirects to the first incomplete (or first) lesson in the course. |
| Learn lesson | `/learn/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]` | Lesson player (video/reading/quiz/assignment), progress bar, and gated navigation based on readiness. |
| Notifications | `/notifications` | Notifications list with type badges, unread markers, and timestamps. |
| Notification detail | `/notifications/[notificationId]` | Grading update detail with score, feedback, and attachments. |
| Profile | `/profile` | Learner profile summary, contact info, and status. |
| Edit profile | `/profile/edit` | Edit name parts, avatar, and phone with links to dedicated email/password screens. |
| Change email | `/profile/email` | Update account email address on a dedicated form. |
| Change password | `/profile/password` | Update account password on a dedicated form. |

## Staff screens

| Screen | Path | Description |
| --- | --- | --- |
| Staff redirect | `/staff` | Redirects to `/staff/dashboard`. |
| Staff login | `/staff/login` | Staff/auth layout with email, password, and OTP fields. |
| Staff dashboard | `/staff/dashboard` | Minimal staff landing view with primary navigation actions. |
| Courses | `/staff/courses` | Course table with status, enrollments, and updated timestamp. |
| Course detail | `/staff/courses/[courseId]` | Course overview with status and integrated chapter management. |
| Course preview | `/preview/courses/[courseId]` | Learner-style course view for staff preview in a dedicated layout. |
| Preview learn course | `/preview/learn/courses/[courseId]` | Preview entry point that opens the first lesson. |
| Preview learn chapter | `/preview/learn/courses/[courseId]/chapters/[chapterId]` | Preview chapter view with all lessons accessible. |
| Preview learn lesson | `/preview/learn/courses/[courseId]/chapters/[chapterId]/lessons/[lessonId]` | Preview lesson view without progression gating. |
| Create course | `/staff/courses/new` | Form for course metadata, summary, and tags. |
| Edit course | `/staff/courses/[courseId]/edit` | Edit metadata, visibility, and see enrollment/progress stats. |
| Lessons | `/staff/chapters/[chapterId]/lessons` | Chapter lessons table with type, gating, graded status, and edit/preview links. |
| Edit lecture | `/staff/lessons/[lessonId]/lecture/edit` | Lecture editor for media URL, duration, notes, and status. |
| Edit quiz | `/staff/lessons/[lessonId]/quiz/edit` | Quiz editor for multi-question prompts, choices, and correct answers. |
| Edit submission | `/staff/lessons/[lessonId]/assignment/edit` | Submission editor for instructions, attachments, rubric, and scoring. |
| Submissions | `/staff/assignments/submissions` | All submissions with learner, course, status, score, and grade action. |
| Pending submissions | `/staff/assignments/submissions/pending` | Filtered list of submissions waiting for grading with SLA hint. |
| Submission detail | `/staff/assignments/submissions/[submissionId]` | Metadata, attachments, learner notes, and feedback links. |
| Grade submission | `/staff/assignments/submissions/[submissionId]/grade` | Grading form with score, status, feedback, and internal notes. |
| Submission history | `/staff/assignments/submissions/[submissionId]/history` | Timeline of submission events and versions. |
| Users | `/staff/users` | Learner table with progress, scores, risk, and actions. |
| User detail | `/staff/users/[userId]` | Learner progress, stats, and recent submissions. |
| Staff Q&A | `/staff/qna` | Q&A inbox for staff with list of learner threads. |
| Staff Q&A detail | `/staff/qna/[questionId]` | Staff thread view with reply composer and existing responses. |
| Invite staff | `/staff/staff/invite` | Invitation form for reviewers/staff with message. |
| Invitations | `/staff/staff/invitations` | Staff roster plus pending invites with status. |
| Staff profile | `/staff/profile` | Staff profile summary with avatar and contact details. |
| Staff profile edit | `/staff/profile/edit` | Staff profile edit form for avatar, name, and email. |
