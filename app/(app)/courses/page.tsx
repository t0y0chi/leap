import { CourseList } from "@/components/course-list";
import { courses, enrollments, learnerProfile } from "@/lib/mock-data";

export default function CoursesPage() {
  const userEnrollments = enrollments.filter(
    (enrollment) => enrollment.userId === learnerProfile.id,
  );
  const enrollmentByCourseId = new Map(
    userEnrollments.map((enrollment) => [enrollment.courseId, enrollment]),
  );
  const coursesWithProgress = courses.map((course) => {
    const enrollment = enrollmentByCourseId.get(course.id);
    return {
      ...course,
      progressStatus: enrollment?.progressStatus ?? "not-started",
      progressPct: enrollment?.progressPct ?? 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-muted-foreground">All learner tracks available to you.</p>
        </div>
      </div>

      <CourseList courses={coursesWithProgress} />
    </div>
  );
}
