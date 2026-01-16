export type AdminCourseStatus = "draft" | "published" | "maintenance";
export type AdminItemType = "lecture" | "quiz" | "assignment";
export type SubmissionStatus = "pending" | "graded" | "returned";

export interface AdminCourse {
  id: string;
  title: string;
  track: string;
  status: AdminCourseStatus;
  visibility: "private" | "public";
  owner: string;
  enrollments: number;
  completionRate: number;
  pendingSubmissions: number;
  chapters: number;
  updatedAt: string;
  summary: string;
}

export interface AdminChapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  published: boolean;
  items: number;
  gating: "open" | "sequential";
  description: string;
}

export interface AdminItem {
  id: string;
  chapterId: string;
  title: string;
  type: AdminItemType;
  duration: string;
  status: AdminCourseStatus;
  required: boolean;
  graded: boolean;
  updatedAt: string;
  summary: string;
  passingScore?: number;
  maxScore?: number;
  attempts?: number;
}

export interface AdminSubmission {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  chapterTitle: string;
  itemTitle: string;
  status: SubmissionStatus;
  score?: number;
  submittedAt: string;
  attachments: string[];
  reviewer?: string;
  comments?: string;
}

export interface SubmissionEvent {
  id: string;
  submissionId: string;
  label: string;
  detail: string;
  timestamp: string;
}

export interface AdminLearner {
  id: string;
  name: string;
  email: string;
  cohort: string;
  activeCourseTitle: string;
  progress: number;
  avgScore: number;
  risk: "on-track" | "attention";
  lastActive: string;
}

export interface AdminInvite {
  token: string;
  email: string;
  role: string;
  status: "pending" | "accepted" | "expired";
  sentAt: string;
  expiresAt: string;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending";
  lastActive: string;
}

export const adminCourses: AdminCourse[] = [
  {
    id: "annotation-101",
    title: "Annotation Fundamentals",
    track: "Vision QA",
    status: "published",
    visibility: "public",
    owner: "Dr. Jamie Nguyen",
    enrollments: 184,
    completionRate: 0.63,
    pendingSubmissions: 12,
    chapters: 3,
    updatedAt: "Today 09:10",
    summary:
      "Baseline onboarding for annotators covering rubric literacy, tooling, and assignment etiquette.",
  },
  {
    id: "review-lab",
    title: "Reviewer Coaching Lab",
    track: "QA Leadership",
    status: "maintenance",
    visibility: "private",
    owner: "Samira Patel",
    enrollments: 42,
    completionRate: 0.48,
    pendingSubmissions: 4,
    chapters: 4,
    updatedAt: "Yesterday 18:20",
    summary:
      "Hands-on calibration for reviewers with live rubrics, sample audits, and escalation patterns.",
  },
  {
    id: "automation",
    title: "Automation & Guardrails",
    track: "Ops Enablement",
    status: "draft",
    visibility: "private",
    owner: "Casey Lee",
    enrollments: 0,
    completionRate: 0,
    pendingSubmissions: 0,
    chapters: 5,
    updatedAt: "Mon 11:05",
    summary:
      "Draft course for workflow automation, bulk review rules, and KPI instrumentation for ops leads.",
  },
];

export const adminChapters: AdminChapter[] = [
  {
    id: "ch-1",
    courseId: "annotation-101",
    title: "Foundations",
    order: 1,
    published: true,
    items: 3,
    gating: "open",
    description: "Rubric literacy, edge-case handling, and annotation etiquette.",
  },
  {
    id: "ch-2",
    courseId: "annotation-101",
    title: "Annotation Tools",
    order: 2,
    published: true,
    items: 4,
    gating: "sequential",
    description: "Tooling walkthroughs, QC macros, and shortform quizzes.",
  },
  {
    id: "ch-3",
    courseId: "annotation-101",
    title: "Quality & Feedback",
    order: 3,
    published: false,
    items: 3,
    gating: "sequential",
    description: "Feedback handling, reviewer expectations, and sample batch submission.",
  },
  {
    id: "rev-1",
    courseId: "review-lab",
    title: "Calibration",
    order: 1,
    published: true,
    items: 5,
    gating: "sequential",
    description: "Score alignment on starter packs and rubric trims.",
  },
];

export const adminItems: AdminItem[] = [
  {
    id: "it-1",
    chapterId: "ch-1",
    title: "How annotation drives model quality",
    type: "lecture",
    duration: "12m",
    status: "published",
    required: true,
    graded: false,
    updatedAt: "Today 08:10",
    summary: "Video explainer linking rubric discipline to downstream accuracy.",
  },
  {
    id: "it-2",
    chapterId: "ch-1",
    title: "Guideline deep-dive quiz",
    type: "quiz",
    duration: "8m",
    status: "published",
    required: true,
    graded: true,
    updatedAt: "Yesterday 17:55",
    summary: "Multiple choice check on occlusion, truncation, and exemplar usage.",
    passingScore: 80,
    maxScore: 100,
    attempts: 2,
  },
  {
    id: "it-6",
    chapterId: "ch-2",
    title: "Hands-on: draw regions accurately",
    type: "assignment",
    duration: "15m",
    status: "published",
    required: true,
    graded: true,
    updatedAt: "Today 07:45",
    summary: "Submission with bounding boxes and reviewer-ready notes.",
    maxScore: 100,
  },
  {
    id: "it-10",
    chapterId: "ch-3",
    title: "Submit a sample batch",
    type: "assignment",
    duration: "18m",
    status: "draft",
    required: true,
    graded: true,
    updatedAt: "Mon 15:05",
    summary: "Upload 5 annotated examples with commentary for calibration.",
    maxScore: 100,
  },
];

export const adminSubmissions: AdminSubmission[] = [
  {
    id: "sub-101",
    userId: "user-1",
    userName: "Alex Carter",
    courseId: "annotation-101",
    courseTitle: "Annotation Fundamentals",
    chapterTitle: "Annotation Tools",
    itemTitle: "Hands-on: draw regions accurately",
    status: "pending",
    submittedAt: "Today 08:52",
    attachments: ["boxes-batch.zip", "notes.md"],
    comments: "Flagged tricky motion blur on frames 18-23.",
  },
  {
    id: "sub-102",
    userId: "user-2",
    userName: "Priya Singh",
    courseId: "annotation-101",
    courseTitle: "Annotation Fundamentals",
    chapterTitle: "Quality & Feedback",
    itemTitle: "Submit a sample batch",
    status: "graded",
    score: 92,
    submittedAt: "Yesterday 19:15",
    attachments: ["sample-batch.pdf"],
    reviewer: "Samira Patel",
    comments: "Good notes. Watch truncation threshold on camera 4.",
  },
  {
    id: "sub-103",
    userId: "user-3",
    userName: "Diego Alvarez",
    courseId: "review-lab",
    courseTitle: "Reviewer Coaching Lab",
    chapterTitle: "Calibration",
    itemTitle: "Round 1 starter pack",
    status: "returned",
    score: 68,
    submittedAt: "Today 07:30",
    attachments: ["calibration-r1.zip"],
    reviewer: "Casey Lee",
    comments: "Revisit edge-case scoring. Add notes per clip.",
  },
];

export const submissionEvents: SubmissionEvent[] = [
  {
    id: "evt-1",
    submissionId: "sub-101",
    label: "Submitted",
    detail: "Learner uploaded batch with two files.",
    timestamp: "Today 08:52",
  },
  {
    id: "evt-2",
    submissionId: "sub-102",
    label: "Graded 92/100",
    detail: "Returned with minor notes about truncation threshold.",
    timestamp: "Yesterday 19:45",
  },
  {
    id: "evt-3",
    submissionId: "sub-103",
    label: "Returned for rework",
    detail: "Asked for notes per clip and rubric justification.",
    timestamp: "Today 08:05",
  },
];

export const adminLearners: AdminLearner[] = [
  {
    id: "user-1",
    name: "Alex Carter",
    email: "alex.carter@example.com",
    cohort: "Cohort A",
    activeCourseTitle: "Annotation Fundamentals",
    progress: 0.62,
    avgScore: 0.86,
    risk: "on-track",
    lastActive: "Today 09:00",
  },
  {
    id: "user-2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    cohort: "Cohort A",
    activeCourseTitle: "Annotation Fundamentals",
    progress: 0.71,
    avgScore: 0.92,
    risk: "on-track",
    lastActive: "Today 08:10",
  },
  {
    id: "user-3",
    name: "Diego Alvarez",
    email: "diego.alvarez@example.com",
    cohort: "Cohort B",
    activeCourseTitle: "Reviewer Coaching Lab",
    progress: 0.34,
    avgScore: 0.68,
    risk: "attention",
    lastActive: "Yesterday 20:05",
  },
];

export const adminTeam: AdminTeamMember[] = [
  {
    id: "admin-1",
    name: "Samira Patel",
    email: "samira.patel@example.com",
    role: "Lead Reviewer",
    status: "active",
    lastActive: "Today 09:05",
  },
  {
    id: "admin-2",
    name: "Casey Lee",
    email: "casey.lee@example.com",
    role: "Ops Owner",
    status: "active",
    lastActive: "Today 08:20",
  },
];

export const adminInvites: AdminInvite[] = [
  {
    token: "invite-1",
    email: "new.reviewer@example.com",
    role: "Reviewer",
    status: "pending",
    sentAt: "Today 07:40",
    expiresAt: "in 6 days",
  },
  {
    token: "invite-2",
    email: "ops.lead@example.com",
    role: "Workspace Admin",
    status: "accepted",
    sentAt: "Mon 12:00",
    expiresAt: "accepted",
  },
  {
    token: "invite-3",
    email: "late.invite@example.com",
    role: "Reviewer",
    status: "expired",
    sentAt: "Last week",
    expiresAt: "expired",
  },
];

export function getAdminCourse(courseId: string) {
  return adminCourses.find((course) => course.id === courseId);
}

export function getAdminChapters(courseId: string) {
  return adminChapters.filter((chapter) => chapter.courseId === courseId);
}

export function getAdminChapter(chapterId: string) {
  return adminChapters.find((chapter) => chapter.id === chapterId);
}

export function getAdminItems(chapterId: string) {
  return adminItems.filter((item) => item.chapterId === chapterId);
}

export function getAdminItem(itemId: string) {
  return adminItems.find((item) => item.id === itemId);
}

export function getAdminSubmission(submissionId: string) {
  return adminSubmissions.find((submission) => submission.id === submissionId);
}

export function getSubmissionEvents(submissionId: string) {
  return submissionEvents.filter((event) => event.submissionId === submissionId);
}

export function getAdminLearner(userId: string) {
  return adminLearners.find((learner) => learner.id === userId);
}
