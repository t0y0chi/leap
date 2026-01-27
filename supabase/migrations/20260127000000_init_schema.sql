-- Core enums
create type publication_status as enum ('draft', 'published');
create type progress_status as enum ('not-started', 'in-progress', 'completed');
create type submission_status as enum ('pending', 'graded', 'returned');
create type invite_status as enum ('pending', 'accepted', 'expired');
create type member_status as enum ('active', 'pending');
create type lesson_type as enum ('lecture', 'quiz', 'assignment');

create extension if not exists pgcrypto;

-- Profiles (auth.users is the source of truth for accounts)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  given_name text,
  middle_name text,
  family_name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Role labels (non-permission labels)
create table if not exists role_labels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists user_role_labels (
  user_id uuid references auth.users(id) on delete cascade,
  role_label_id uuid references role_labels(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (user_id, role_label_id)
);

-- Courses / Chapters / Lessons
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  duration text,
  summary text,
  thumbnail text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  description text,
  order_index int not null,
  publication_status publication_status not null default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists chapters_course_id_idx on chapters(course_id);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id) on delete cascade,
  title text not null,
  type lesson_type not null,
  duration text,
  publication_status publication_status not null default 'draft',
  order_index int not null,
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists lessons_chapter_id_idx on lessons(chapter_id);

create table if not exists lesson_lectures (
  lesson_id uuid primary key references lessons(id) on delete cascade,
  content jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lesson_quizzes (
  lesson_id uuid primary key references lessons(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  prompt text not null,
  order_index int not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists quiz_questions_lesson_id_idx on quiz_questions(lesson_id);

create table if not exists quiz_choices (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references quiz_questions(id) on delete cascade,
  text text not null,
  is_correct boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists quiz_choices_question_id_idx on quiz_choices(question_id);

create table if not exists lesson_assignments (
  lesson_id uuid primary key references lessons(id) on delete cascade,
  instructions text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enrollment / progress
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  progress_status progress_status not null default 'not-started',
  progress_pct int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, course_id)
);
create index if not exists enrollments_user_id_idx on enrollments(user_id);
create index if not exists enrollments_course_id_idx on enrollments(course_id);

create table if not exists lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  last_seen_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (user_id, lesson_id)
);

-- Quiz attempts / answers
create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  attempt_no int not null,
  score int,
  submitted_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, lesson_id, attempt_no)
);
create index if not exists quiz_attempts_user_id_idx on quiz_attempts(user_id);
create index if not exists quiz_attempts_lesson_id_idx on quiz_attempts(lesson_id);

create table if not exists quiz_answers (
  attempt_id uuid not null references quiz_attempts(id) on delete cascade,
  question_id uuid not null references quiz_questions(id) on delete cascade,
  choice_id uuid references quiz_choices(id) on delete set null,
  is_correct boolean,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (attempt_id, question_id)
);

-- Assignment submissions
create table if not exists assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  submission_status submission_status not null default 'pending',
  score int,
  reviewer_id uuid references auth.users(id) on delete set null,
  comments text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists assignment_submissions_user_id_idx on assignment_submissions(user_id);
create index if not exists assignment_submissions_lesson_id_idx on assignment_submissions(lesson_id);

create table if not exists assignment_submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references assignment_submissions(id) on delete cascade,
  storage_path text,
  filename text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists assignment_submission_files_submission_id_idx on assignment_submission_files(submission_id);

-- Q&A
create table if not exists qna_threads (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  title text not null,
  body text,
  votes_count int not null default 0,
  answered boolean not null default false,
  accepted_reply_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists qna_threads_course_id_idx on qna_threads(course_id);

create table if not exists qna_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references qna_threads(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  is_accepted boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists qna_replies_thread_id_idx on qna_replies(thread_id);

alter table qna_threads
  add constraint qna_threads_accepted_reply_id_fkey
  foreign key (accepted_reply_id) references qna_replies(id) on delete set null;

create table if not exists qna_votes (
  thread_id uuid not null references qna_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  value smallint not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (thread_id, user_id),
  check (value in (-1, 1))
);

-- Notifications
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  meta jsonb,
  href text,
  cta_label text,
  cta_href text,
  read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists notifications_user_id_idx on notifications(user_id);

-- Admin invites / team
create table if not exists admin_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  email text not null,
  invite_status invite_status not null default 'pending',
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists admin_team_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  member_status member_status not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin learner evaluations
create table if not exists learner_evaluations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  value int not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists learner_evaluations_user_id_idx on learner_evaluations(user_id);
