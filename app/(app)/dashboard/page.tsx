import { CourseList } from "@/components/course-list";
import { courses, enrollments, learnerProfile } from "@/lib/mock-data";
import { formatFullName } from "@/lib/utils";

export default function DashboardPage() {
  const userEnrollments = enrollments.filter(
    (enrollment) => enrollment.userId === learnerProfile.id,
  );
  const enrollmentCourses = userEnrollments
    .map((enrollment) => {
      const course = courses.find((item) => item.id === enrollment.courseId);
      if (!course) return null;
      return { ...course, progressStatus: enrollment.progressStatus, progressPct: enrollment.progressPct };
    })
    .filter(
      (course): course is NonNullable<typeof course> => course !== null,
    );
  const focusedCourse =
    enrollmentCourses.find((course) => course.progressStatus === "in-progress") ??
    enrollmentCourses[0];
  const enrolledCourses = focusedCourse ? [focusedCourse] : [];
  const fullName = formatFullName(learnerProfile);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {fullName}</h1>
          <p className="text-sm text-muted-foreground">Pick up where you left off.</p>
        </div>
      </div>

      <CourseList
        courses={enrolledCourses}
        buttonLabel="Resume"
        getHref={(course) => `/learn/courses/${course.id}`}
      />
    </div>
  );
}
