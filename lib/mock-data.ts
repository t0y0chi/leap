export type LessonType = "lecture" | "quiz" | "assignment";
export type ItemStatus = "not-started" | "in-progress" | "completed";

export interface LearningItem {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  status: ItemStatus;
  score?: number;
  content?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  progress: number;
  items: LearningItem[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  tags: string[];
  instructor: string;
  summary: string;
  chapters: Chapter[];
}

export interface Notification {
  id: string;
  title: string;
  timestamp: string;
  type: "grading" | "announcement" | "system";
  read: boolean;
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
  name: "Alex Carter",
  email: "alex.carter@example.com",
  role: "Annotator",
  avatar:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  streak: 5,
  learningMinutes: 265,
  completionRate: 0.62,
  badges: ["Data Quality", "Fast Reviewer", "Consistent"],
  focusCourseId: "annotation-101",
};

export const courses: Course[] = [
  {
    id: "annotation-101",
    title: "Annotation Fundamentals",
    category: "Data Labeling",
    level: "Beginner",
    duration: "4h 20m",
    status: "in-progress",
    progress: 62,
    instructor: "Dr. Jamie Nguyen",
    tags: ["Vision", "Quality Control", "Tools"],
    summary:
      "A practical course that walks through the full annotation lifecycle, from labeling basics to QA workflows and feedback loops.",
    chapters: [
      {
        id: "ch-1",
        title: "Foundations",
        description: "Labeling intent, task types, and annotation guidelines.",
        progress: 100,
        items: [
          {
            id: "it-1",
            title: "How annotation drives model quality",
            type: "lecture",
            duration: "12m",
            status: "completed",
            content:
              "Learn why clear labels and consistent criteria make or break ML performance.",
          },
          {
            id: "it-2",
            title: "Guideline deep-dive quiz",
            type: "quiz",
            duration: "8m",
            status: "completed",
            score: 92,
            content:
              "Confirm your understanding of edge cases and what to flag to the reviewer.",
          },
        ],
      },
      {
        id: "ch-2",
        title: "Annotation Tools",
        description: "Hotkeys, labeling UI, and quality shortcuts.",
        progress: 55,
        items: [
          {
            id: "it-3",
            title: "Video walkthrough: labeling UI",
            type: "lecture",
            duration: "10m",
            status: "completed",
            content:
              "A tour of the tool surface: regions, attributes, comments, and review lane.",
          },
          {
            id: "it-4",
            title: "Hands-on: draw regions accurately",
            type: "assignment",
            duration: "15m",
            status: "in-progress",
            score: 78,
            content:
              "Practice drawing bounding boxes with pixel-perfect alignment and naming conventions.",
          },
          {
            id: "it-5",
            title: "Short quiz: shortcuts & QA checks",
            type: "quiz",
            duration: "7m",
            status: "not-started",
            content:
              "Identify the quickest path to validate a batch before submitting to review.",
          },
        ],
      },
      {
        id: "ch-3",
        title: "Quality & Feedback",
        description: "Self-checks, handoffs, and reviewer expectations.",
        progress: 20,
        items: [
          {
            id: "it-6",
            title: "What reviewers look for",
            type: "lecture",
            duration: "9m",
            status: "not-started",
            content:
              "See the rubric used to grade your submissions and how to avoid rework.",
          },
          {
            id: "it-7",
            title: "Submit a sample batch",
            type: "assignment",
            duration: "18m",
            status: "not-started",
            content:
              "Upload 5 annotated examples with notes on tricky frames and decisions.",
          },
        ],
      },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: "note-1",
    title: "Chapter 2 assignment graded: 78/100",
    timestamp: "Today, 09:12",
    type: "grading",
    read: false,
  },
  {
    id: "note-2",
    title: "New Q&A reply: How to mark occlusions?",
    timestamp: "Yesterday, 19:05",
    type: "announcement",
    read: false,
  },
  {
    id: "note-3",
    title: "Reminder: Finish 'Quality & Feedback' by Friday",
    timestamp: "Mon, 10:30",
    type: "system",
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
