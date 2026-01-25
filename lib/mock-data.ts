export type LessonType = "lecture" | "quiz" | "assignment";
export type LessonStatus = "not-started" | "in-progress" | "completed";

export type BlockNoteContent = Array<Record<string, unknown>>;

export interface LearningLesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  status: LessonStatus;
  score?: number;
  content?: string;
  videoUrl?: string;
  readingHtml?: string;
  blocknoteContent?: BlockNoteContent;
  questionType?: "multiple-choice" | "assignment";
  choices?: { id: string; text: string; correct?: boolean }[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: LearningLesson[];
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
        lessons: [
          {
            id: "it-1",
            title: "How annotation drives model quality",
            type: "lecture",
            duration: "12m",
            status: "completed",
            videoUrl: "https://www.youtube.com/embed/MdqVp9kLYvg",
            blocknoteContent: [
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
            status: "completed",
            readingHtml: `<h2>Why the rubric matters</h2>
<p><strong>The goal of this course is to make you decisive</strong> under imperfect conditions. Start by internalizing the rubric: what qualifies as a positive example, what should be marked negative, and how to record ambiguous frames without breaking consistency. Re-read the intent statement at the top of the guideline; it is the single anchor for how reviewers grade. If a sample is borderline, ask yourself if it helps or harms the downstream model. That clarity makes your labeling defensible during audits.</p>
<h2>Handle occlusion and truncation</h2>
<p>Occlusion and truncation rules are critical. A partially hidden object should be annotated if the visible region carries enough signal; do not invent shapes that are not visible, but do mark the occlusion attribute. When more than <strong>60% of the object is out of frame</strong>, call it truncated. Add comments when you make judgment calls so reviewers can align on the same threshold. This reduces back-and-forth and keeps the batch moving.</p>
<h2>Edge cases and exemplars</h2>
<p>Edge cases usually come from overlapping classes, motion blur, or tiny instances. The rubric lists examples for each. When in doubt, open the saved exemplars and compare: is the color, shape, or context similar enough to count? If you spend more than 15 seconds deliberating, log a note and move on; throughput matters as much as accuracy.</p>
<h2>When to defer</h2>
<p>Finally, know when to defer. If the guideline explicitly says to escalate novel classes, unusual lighting, or privacy-sensitive content, flag it and continue. Your job is to keep the dataset clean, not to force a guess. Reviewers expect concise notes: one sentence on what you saw, one on what you did, and one on why it aligns with the rubric.</p>`,
          },
          {
            id: "it-3",
            title: "Guideline deep-dive quiz",
            type: "quiz",
            duration: "8m",
            status: "completed",
            score: 92,
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
        progress: 55,
        lessons: [
          {
            id: "it-4",
            title: "Video walkthrough: labeling UI",
            type: "lecture",
            duration: "10m",
            status: "completed",
            videoUrl: "https://www.youtube.com/embed/6mbwJ2xhgzM",
            blocknoteContent: [
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
            status: "in-progress",
            readingHtml: `<h2>QC starts with coverage</h2>
<p><strong>Quality control is your final defense</strong> before review. Start with coverage: scan every frame for obvious omissions, especially small or partially hidden objects. Use zoom or a hotkey to toggle outlines so you can catch thin shapes that blend into the background. If you discover a missing instance, add it immediately and leave a note if you are unsure about the class.</p>
<h2>Geometry and shape integrity</h2>
<p>Next, check geometry. Are boxes tight without clipping? Do polygons follow edges without self-intersections? A quick pass with snapping tools can fix sloppy corners. For keypoints, confirm the correct ordering and symmetry; mirror mistakes are common when rushing. Remember that reviewers look for clean geometry before they read your comments.</p>
<h2>Labels and attributes</h2>
<p>Naming and attributes matter as much as shapes. Validate that class labels match the rubric wording, not your personal shorthand. Confirm that required attributes, like occlusion or truncation, are set consistently across similar objects. If you see inconsistency across a sequence, normalize it before submission so reviewers do not reject for avoidable churn.</p>
<h2>Notes for reviewers</h2>
<p>Finally, document blockers and uncertainties. If lighting is poor or a class boundary is unclear, write a concise comment describing what you saw and the rule you applied. Mention any deviations from the rubric and why. This habit signals professionalism and often speeds up grading because reviewers do not need to guess your intent.</p>`,
          },
          {
            id: "it-6",
            title: "Hands-on: draw regions accurately",
            type: "assignment",
            duration: "15m",
            status: "in-progress",
            score: 78,
            questionType: "assignment",
            content:
              "Practice drawing bounding boxes with pixel-perfect alignment and naming conventions.",
          },
          {
            id: "it-7",
            title: "Short quiz: shortcuts & QA checks",
            type: "quiz",
            duration: "7m",
            status: "not-started",
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
        progress: 20,
        lessons: [
          {
            id: "it-8",
            title: "What reviewers look for",
            type: "lecture",
            duration: "9m",
            status: "not-started",
            videoUrl: "https://www.youtube.com/embed/o8NPllzkFhM",
            blocknoteContent: [
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
                    text: "See the rubric used to grade your submissions and how to avoid rework.",
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
            status: "not-started",
            readingHtml: `<h2>Feedback is a loop</h2>
<p><strong>Feedback is a loop, not a verdict.</strong> When a reviewer leaves notes, treat them as data: what pattern caused the deduction, and how can you prevent it next time? Summarize the feedback in your own words, then update your personal checklist. If the note contradicts the rubric, ask a clarifying question in the Q&A board so the whole cohort benefits.</p>
<h2>Respond with clarity</h2>
<p>When responding, be concise. Start with acknowledgement, restate the issue, then explain the fix you will apply. Avoid defensive language; the goal is to align on quality, not to win an argument. If you disagree, provide a brief rationale referencing the guideline or exemplar images, and propose a rule to settle similar cases in the future.</p>
<h2>Be proactive</h2>
<p>Proactive communication builds trust. When you submit a batch with known edge cases, preemptively add a short note: what you saw, the decision you made, and the evidence you used. This reduces review time and often leads to faster approvals. Reviewers appreciate clear intent more than perfection on the first try.</p>
<h2>Improve in small steps</h2>
<p>Finally, pace yourself. Use reviewer feedback to identify one or two habits to improve each week—tighter boxes, better attribute consistency, clearer comments. Small, steady gains compound into reliable scores and reduce rework across the team.</p>`,
          },
          {
            id: "it-10",
            title: "Submit a sample batch",
            type: "assignment",
            duration: "18m",
            status: "not-started",
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
    level: "Beginner",
    duration: "2h 30m",
    status: "not-started",
    progress: 0,
    instructor: "Casey Lee",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tags: ["JavaScript", "Logic", "Debugging"],
    summary:
      "Get comfortable with core programming ideas: variables, control flow, and functions using JavaScript examples.",
    chapters: [
      {
        id: "prog-ch-1",
        title: "Getting Started",
        description: "Setup, variables, and basic outputs.",
        progress: 0,
        lessons: [
          {
            id: "prog-it-1",
            title: "Watch: hello world walkthrough",
            type: "lecture",
            duration: "8m",
            status: "not-started",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: "See how to print and run your first script.",
          },
          {
            id: "prog-it-2",
            title: "Read: variables and types",
            type: "lecture",
            duration: "6m",
            status: "not-started",
            readingHtml:
              "<h2>Variables</h2><p>Use <strong>let</strong> for reassignable values and <strong>const</strong> for stable ones.</p><h2>Types</h2><p>Numbers, strings, booleans, arrays, and objects are the core you will use here.</p>",
          },
          {
            id: "prog-it-3",
            title: "Quiz: basics check",
            type: "quiz",
            duration: "5m",
            status: "not-started",
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
      "Status: Resubmission required",
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
