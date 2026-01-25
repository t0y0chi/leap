# Extracted Entities (from current UI)

## Learner-facing
- User/Profile
  - id, given_name, middle_name, family_name, email, phone, avatar_url
  - roles (labels)
  - enrolled courses (user-course join with status, progress_pct)
- Course
  - id, title, category, duration, status, summary, thumbnail
- Chapter
  - id, course_id, title, description, order
- Lesson
  - id, chapter_id, title, type, duration, publication_status, order
  - lecture fields: content (Blocknote JSON)
  - quiz fields: attempts, questions, choices (id, text, correct)
  - assignment fields: instructions
- Q&A Thread
  - id, course_id, title, author, votes, answered, updated_at
- Q&A Reply
  - id, question_id, author, time, body
- Notification
  - id, title, timestamp, read
  - href, body, meta[], cta_label, cta_href
- Learning activity (timeline)
  - id, title, type, time, delta

## Admin-facing
- Admin Course
  - id, title, track, status, visibility, owner
  - enrollments, completion_rate, pending_submissions, chapters, updated_at, summary
- Admin Chapter
  - id, course_id, title, order, published, lessons, gating, description
- Admin Lesson
  - id, chapter_id, title, type, duration, status
  - required, graded, updated_at, summary, passing_score, max_score, attempts
- Submission
  - id, user_id, user_name, course_id, course_title, chapter_title, lesson_title, lesson_id
  - status, score, submitted_at, attachments[], reviewer, comments
- Submission Event
  - id, submission_id, label, detail, timestamp
- Admin Learner
  - id, name, email, phone, avatar_url, roles, cohort
  - active_course_title, progress, avg_score, risk, last_active
  - evaluations: { label, value }[]
- Admin Invite
  - token, email, role, status, sent_at, expires_at
- Admin Team Member
  - id, name, email, role, status, last_active
- Admin Profile
  - name, email, avatar_url
