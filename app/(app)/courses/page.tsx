import { CourseList } from "@/components/course-list";
import { courses } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-sm text-muted-foreground">All learner tracks available to you.</p>
        </div>
      </div>

      <CourseList courses={courses} />
    </div>
  );
}
