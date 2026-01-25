import { CourseList } from "@/components/course-list";
import { courses, learnerProfile } from "@/lib/mock-data";
import { formatFullName } from "@/lib/utils";

export default function DashboardPage() {
  const enrolledCourses = courses.filter(
    (course) => course.id === learnerProfile.focusCourseId,
  );
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
