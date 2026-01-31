import DashboardCaption from "@/components/web/DashboardCaption";
import ExamTypeCard from "@/components/web/ExamTypeCard";
import { examTypes } from "@/lib/types/mock-exam";

export default function MockExamPage() {
  return (
    <>
      <DashboardCaption heading="Exam" text="Write your preferred mock exam" />

      <section className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mock Exams</h1>
          <p className="text-muted-foreground">
            Practice under real exam conditions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examTypes.map((exam) => (
            <ExamTypeCard key={exam.id} {...exam} />
          ))}
        </div>
      </section>
    </>
  );
}
