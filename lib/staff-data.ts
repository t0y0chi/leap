export type PublicationStatus = "draft" | "published";
export type AdminLessonType = "lecture" | "quiz" | "assignment";
export type SubmissionStatus = "pending" | "graded" | "returned";

export interface AdminCourse {
  id: string;
  title: string;
  publicationStatus: PublicationStatus;
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
  publicationStatus: PublicationStatus;
  lessons: number;
  description: string;
}

export interface AdminLesson {
  id: string;
  chapterId: string;
  title: string;
  type: AdminLessonType;
  duration: string;
  publicationStatus: PublicationStatus;
  updatedAt: string;
  summary: string;
}

export interface AdminSubmission {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  chapterTitle: string;
  lessonTitle: string;
  lessonId: string;
  submissionStatus: SubmissionStatus;
  score?: number;
  submittedAt: string;
  attachments: string[];
  reviewer?: string;
  comments?: string;
}


export interface AdminLearner {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  roles: string[];
  activeCourseTitle: string;
  progress: number;
  avgScore: number;
  risk: "on-track" | "attention";
  lastActive: string;
  evaluations: {
    label: string;
    value: number;
  }[];
}

export interface AdminInvite {
  token: string;
  email: string;
  inviteStatus: "pending" | "accepted" | "expired";
  expiresAt: string;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  email: string;
  memberStatus: "active" | "pending";
}

export interface AdminProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export const adminCourses: AdminCourse[] = [
  {
    id: "annotation-101",
    title: "Annotation Fundamentals",
    publicationStatus: "published",
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
    publicationStatus: "published",
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
    publicationStatus: "draft",
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
    publicationStatus: "published",
    lessons: 3,
    description: "Rubric literacy, edge-case handling, and annotation etiquette.",
  },
  {
    id: "ch-2",
    courseId: "annotation-101",
    title: "Annotation Tools",
    order: 2,
    publicationStatus: "published",
    lessons: 4,
    description: "Tooling walkthroughs, QC macros, and shortform quizzes.",
  },
  {
    id: "ch-3",
    courseId: "annotation-101",
    title: "Quality & Feedback",
    order: 3,
    publicationStatus: "draft",
    lessons: 3,
    description: "Feedback handling, reviewer expectations, and sample batch submission.",
  },
  {
    id: "rev-1",
    courseId: "review-lab",
    title: "Calibration",
    order: 1,
    publicationStatus: "published",
    lessons: 5,
    description: "Score alignment on starter packs and rubric trims.",
  },
];

export const adminLessons: AdminLesson[] = [
  {
    id: "it-1",
    chapterId: "ch-1",
    title: "How annotation drives model quality",
    type: "lecture",
    duration: "12m",
    publicationStatus: "published",
    updatedAt: "Today 08:10",
    summary: "Video explainer linking rubric discipline to downstream accuracy.",
  },
  {
    id: "it-2",
    chapterId: "ch-1",
    title: "Guideline deep-dive quiz",
    type: "quiz",
    duration: "8m",
    publicationStatus: "published",
    updatedAt: "Yesterday 17:55",
    summary: "Multiple choice check on occlusion, truncation, and exemplar usage.",
  },
  {
    id: "it-6",
    chapterId: "ch-2",
    title: "Hands-on: draw regions accurately",
    type: "assignment",
    duration: "15m",
    publicationStatus: "published",
    updatedAt: "Today 07:45",
    summary: "Submission with bounding boxes and reviewer-ready notes.",
  },
  {
    id: "it-10",
    chapterId: "ch-3",
    title: "Submit a sample batch",
    type: "assignment",
    duration: "18m",
    publicationStatus: "draft",
    updatedAt: "Mon 15:05",
    summary: "Upload 5 annotated examples with commentary for calibration.",
  },
  {
    id: "rev-lesson-1",
    chapterId: "rev-1",
    title: "Round 1 starter pack",
    type: "assignment",
    duration: "20m",
    publicationStatus: "published",
    updatedAt: "Today 06:50",
    summary: "First calibration submission with reviewer checklist and score alignment.",
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
    lessonTitle: "Hands-on: draw regions accurately",
    lessonId: "it-6",
    submissionStatus: "pending",
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
    lessonTitle: "Submit a sample batch",
    lessonId: "it-10",
    submissionStatus: "graded",
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
    lessonTitle: "Round 1 starter pack",
    lessonId: "rev-lesson-1",
    submissionStatus: "returned",
    score: 68,
    submittedAt: "Today 07:30",
    attachments: ["calibration-r1.zip"],
    reviewer: "Casey Lee",
    comments: "Revisit edge-case scoring. Add notes per clip.",
  },
];


export const adminLearners: AdminLearner[] = [
  {
    id: "user-1",
    name: "Alex Carter",
    email: "alex.carter@example.com",
    phone: "+1 (415) 555-0132",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=160&h=160&q=80",
    roles: ["Annotator", "Designer"],
    activeCourseTitle: "Annotation Fundamentals",
    progress: 0.62,
    avgScore: 0.86,
    risk: "on-track",
    lastActive: "Today 09:00",
    evaluations: [
      { label: "Motivation", value: 4 },
      { label: "Speed", value: 3 },
      { label: "Quality", value: 4 },
      { label: "Logical Thinking", value: 3 },
      { label: "Communication", value: 5 },
    ],
  },
  {
    id: "user-2",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+1 (646) 555-0193",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=160&h=160&q=80",
    roles: ["Programmer"],
    activeCourseTitle: "Annotation Fundamentals",
    progress: 0.71,
    avgScore: 0.92,
    risk: "on-track",
    lastActive: "Today 08:10",
    evaluations: [
      { label: "Motivation", value: 5 },
      { label: "Speed", value: 4 },
      { label: "Quality", value: 5 },
      { label: "Logical Thinking", value: 4 },
      { label: "Communication", value: 4 },
    ],
  },
  {
    id: "user-3",
    name: "Diego Alvarez",
    email: "diego.alvarez@example.com",
    phone: "+1 (310) 555-0148",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=160&h=160&q=80",
    roles: ["Annotator"],
    activeCourseTitle: "Reviewer Coaching Lab",
    progress: 0.34,
    avgScore: 0.68,
    risk: "attention",
    lastActive: "Yesterday 20:05",
    evaluations: [
      { label: "Motivation", value: 3 },
      { label: "Speed", value: 2 },
      { label: "Quality", value: 3 },
      { label: "Logical Thinking", value: 3 },
      { label: "Communication", value: 2 },
    ],
  },
];

export const adminTeam: AdminTeamMember[] = [
  {
    id: "admin-1",
    name: "Samira Patel",
    email: "samira.patel@example.com",
    memberStatus: "active",
  },
  {
    id: "admin-2",
    name: "Casey Lee",
    email: "casey.lee@example.com",
    memberStatus: "active",
  },
];

export const adminProfile: AdminProfile = {
  name: "Samira Patel",
  email: "samira.patel@example.com",
  avatarUrl:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=160&h=160&q=80",
};

export const adminInvites: AdminInvite[] = [
  {
    token: "invite-1",
    email: "new.reviewer@example.com",
    inviteStatus: "pending",
    expiresAt: "in 6 days",
  },
  {
    token: "invite-2",
    email: "ops.lead@example.com",
    inviteStatus: "accepted",
    expiresAt: "accepted",
  },
  {
    token: "invite-3",
    email: "late.invite@example.com",
    inviteStatus: "expired",
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

export function getAdminLessons(chapterId: string) {
  return adminLessons.filter((lesson) => lesson.chapterId === chapterId);
}

export function getAdminLesson(lessonId: string) {
  return adminLessons.find((lesson) => lesson.id === lessonId);
}

export function getAdminSubmission(submissionId: string) {
  return adminSubmissions.find((submission) => submission.id === submissionId);
}


export function getAdminLearner(userId: string) {
  return adminLearners.find((learner) => learner.id === userId);
}
