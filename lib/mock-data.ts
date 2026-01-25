export type LessonType = "lecture" | "quiz" | "assignment";
export type LessonPublicationStatus = "draft" | "published" | "maintenance";
export type LessonProgressStatus = "not-started" | "in-progress" | "completed";

export type BlockNoteContent = Array<Record<string, unknown>>;

export interface LearningLesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  publicationStatus: LessonPublicationStatus;
  content?: string;
  lectureContent?: BlockNoteContent;
  questionType?: "multiple-choice" | "assignment";
  choices?: { id: string; text: string; correct?: boolean }[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: LearningLesson[];
}

export type EnrollmentStatus = "not-started" | "in-progress" | "completed";

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  summary: string;
  thumbnail?: string;
  chapters: Chapter[];
}

export interface Notification {
  id: string;
  title: string;
  timestamp: string;
  read: boolean;
  href?: string;
  body?: string;
  meta?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface Question {
  id: string;
  title: string;
  author: string;
  votes: number;
  answered: boolean;
  updatedAt: string;
}

export const learnerProfile = {
  id: "user-1",
  givenName: "Alex",
  middleName: "Reese",
  familyName: "Carter",
  email: "alex.carter@example.com",
  phone: "+14155550123",
  roles: ["Annotator", "Designer"],
  avatar:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
};

export type Enrollment = {
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progressPct: number;
};

export const courses: Course[] = [
  {
    id: "annotation-101",
    title: "Annotation Fundamentals",
    category: "Data Labeling",
    duration: "4h 20m",
    summary:
      "A practical course that walks through the full annotation lifecycle, from labeling basics to QA workflows and feedback loops.",
    chapters: [
      {
        id: "ch-1",
        title: "Foundations",
        description: "Labeling intent, task types, and annotation guidelines.",
        lessons: [
          {
            id: "it-1",
            title: "How annotation drives model quality",
            type: "lecture",
            duration: "12m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "f667eb7c-20ee-4ee6-acf1-94e8b5ca9478",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text: "Welcome to this demo!",
                    styles: {},
                  },
                ],
                children: [],
              },
              {
                id: "9c983cee-d210-4722-8b19-84cc5cca8dc9",
                type: "heading",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                  level: 1,
                  isToggleable: false,
                },
                content: [
                  {
                    type: "text",
                    text: "This is a heading block",
                    styles: {},
                  },
                ],
                children: [],
              },
              {
                id: "e8a059bc-1c91-4781-8285-c9996b107ae6",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text: "This is a paragraph block",
                    styles: {},
                  },
                ],
                children: [],
              },
              {
                id: "258bd435-6ea2-4654-b170-fffba580e59f",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [],
                children: [],
              },
            ],
          },
          {
            id: "it-2",
            title: "Read: guideline essentials",
            type: "lecture",
            duration: "6m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-it-2",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text:
                      "Read the guideline essentials and review occlusion/truncation rules.",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "it-3",
            title: "Guideline deep-dive quiz",
            type: "quiz",
            duration: "8m",
            publicationStatus: "published",
            questionType: "multiple-choice",
            content:
              "Confirm your understanding of edge cases and what to flag to the reviewer.",
            choices: [
              { id: "a", text: "Skip occluded objects under 10% visibility" },
              { id: "b", text: "Always mark occlusion when the object is partially hidden", correct: true },
              { id: "c", text: "Only annotate full objects" },
            ],
          },
        ],
      },
      {
        id: "ch-2",
        title: "Annotation Tools",
        description: "Hotkeys, labeling UI, and quality shortcuts.",
        lessons: [
          {
            id: "it-4",
            title: "Video walkthrough: labeling UI",
            type: "lecture",
            duration: "10m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-4-intro",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text: "A tour of the tool surface: regions, attributes, comments, and review lane.",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "it-5",
            title: "Read: fast QC checklist",
            type: "lecture",
            duration: "5m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-it-5",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text:
                      "Review the QC checklist for coverage, geometry, labels, and reviewer notes.",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "it-6",
            title: "Hands-on: draw regions accurately",
            type: "assignment",
            duration: "15m",
            publicationStatus: "published",
            questionType: "assignment",
            content:
              "Practice drawing bounding boxes with pixel-perfect alignment and naming conventions.",
          },
          {
            id: "it-7",
            title: "Short quiz: shortcuts & QA checks",
            type: "quiz",
            duration: "7m",
            publicationStatus: "published",
            questionType: "multiple-choice",
            content:
              "Identify the quickest path to validate a batch before submitting to review.",
            choices: [
              { id: "a", text: "Check only the first 3 frames" },
              { id: "b", text: "Run hotkey cheat sheet and sample 10%" , correct: true },
              { id: "c", text: "Skip QC if confident" },
            ],
          },
        ],
      },
      {
        id: "ch-3",
        title: "Quality & Feedback",
        description: "Self-checks, handoffs, and reviewer expectations.",
        lessons: [
          {
            id: "it-8",
            title: "What reviewers look for",
            type: "lecture",
            duration: "9m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-8-intro",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text: "See the rubric used to grade your assignments and how to avoid rework.",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "it-9",
            title: "Read: feedback etiquette",
            type: "lecture",
            duration: "4m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-it-9",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text:
                      "Learn feedback etiquette: acknowledge issues, explain fixes, and align on rubric.",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "it-10",
            title: "Submit a sample batch",
            type: "assignment",
            duration: "18m",
            publicationStatus: "published",
            questionType: "assignment",
            content:
              "Upload 5 annotated examples with notes on tricky frames and decisions.",
          },
        ],
      },
    ],
  },
  {
    id: "programming-101",
    title: "Programming Basics",
    category: "Software",
    duration: "2h 30m",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Get comfortable with core programming ideas: variables, control flow, and functions using JavaScript examples.",
    chapters: [
      {
        id: "prog-ch-1",
        title: "Getting Started",
        description: "Setup, variables, and basic outputs.",
        lessons: [
          {
            id: "prog-it-1",
            title: "Watch: hello world walkthrough",
            type: "lecture",
            duration: "8m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-prog-it-1",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text: "See how to print and run your first script.",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "prog-it-2",
            title: "Read: variables and types",
            type: "lecture",
            duration: "6m",
            publicationStatus: "published",
            lectureContent: [
              {
                id: "lecture-prog-it-2",
                type: "paragraph",
                props: {
                  backgroundColor: "default",
                  textColor: "default",
                  textAlignment: "left",
                },
                content: [
                  {
                    type: "text",
                    text:
                      "Review variables and core types (numbers, strings, booleans, arrays, objects).",
                    styles: {},
                  },
                ],
                children: [],
              },
            ],
          },
          {
            id: "prog-it-3",
            title: "Quiz: basics check",
            type: "quiz",
            duration: "5m",
            publicationStatus: "published",
            questionType: "multiple-choice",
            content: "Choose the right declaration for a changing score value.",
            choices: [
              { id: "a", text: "const score = 0;" },
              { id: "b", text: "let score = 0;", correct: true },
              { id: "c", text: "var score := 0" },
            ],
          },
        ],
      },
    ],
  },
];

export const enrollments: Enrollment[] = [
  {
    userId: "user-1",
    courseId: "annotation-101",
    status: "in-progress",
    progressPct: 62,
  },
  {
    userId: "user-1",
    courseId: "programming-101",
    status: "not-started",
    progressPct: 0,
  },
];

export const lessonProgressByUser: Record<string, Record<string, LessonProgressStatus>> = {
  "user-1": {
    "it-1": "completed",
    "it-2": "completed",
    "it-3": "completed",
    "it-4": "completed",
    "it-5": "in-progress",
    "it-6": "in-progress",
    "it-7": "not-started",
    "it-8": "not-started",
    "it-9": "not-started",
    "it-10": "not-started",
    "prog-it-1": "not-started",
    "prog-it-2": "not-started",
    "prog-it-3": "not-started",
  },
};

export const notifications: Notification[] = [
  {
    id: "note-1",
    title: "Chapter 2 assignment graded: 78/100",
    timestamp: "Today, 09:12",
    read: false,
    href: "/notifications/note-1",
    body:
      "Bounding boxes are mostly accurate, but a few frames need tighter edges. Please add occlusion notes for frames 12–15.",
    meta: [
      "Lesson: Hands-on: draw regions accurately",
      "Course: Annotation Fundamentals",
      "Score: 78/100",
      "Reviewer: Samira Patel",
      "Status: Revision required",
    ],
    ctaLabel: "Open link",
    ctaHref: "/learn/courses/annotation-101/chapters/ch-2/lessons/it-6",
  },
  {
    id: "note-2",
    title: "New Q&A reply: How to mark occlusions?",
    timestamp: "Yesterday, 19:05",
    read: false,
  },
  {
    id: "note-3",
    title: "Reminder: Finish 'Quality & Feedback' by Friday",
    timestamp: "Mon, 10:30",
    read: true,
  },
];

export const questions: Question[] = [
  {
    id: "q-1",
    title: "When should I mark an object as occluded vs. truncated?",
    author: "Jules Kim",
    votes: 12,
    answered: true,
    updatedAt: "2h ago",
  },
  {
    id: "q-2",
    title: "Any tips to speed up polygon labeling without losing accuracy?",
    author: "Priya Singh",
    votes: 7,
    answered: false,
    updatedAt: "6h ago",
  },
  {
    id: "q-3",
    title: "How strict is the 2px tolerance mentioned in the guide?",
    author: "Diego Alvarez",
    votes: 4,
    answered: true,
    updatedAt: "1d ago",
  },
];

export const learningTimeline = [
  {
    id: "activity-1",
    title: "Completed 'Guideline deep-dive quiz'",
    type: "quiz",
    time: "Today, 08:45",
    delta: "+10 pts",
  },
  {
    id: "activity-2",
    title: "Reviewed 15 bounding boxes",
    type: "assignment",
    time: "Yesterday",
    delta: "+20 pts",
  },
  {
    id: "activity-3",
    title: "Watched 'Labeling UI walkthrough'",
    type: "lecture",
    time: "Mon",
    delta: "+8 pts",
  },
];
