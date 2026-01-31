import DashboardCaption from "@/components/web/DashboardCaption";
import CreateOrManage from "./CreateOrManage";

export default function UploadCourse() {
  return (
    <>
      <DashboardCaption
        heading="Course Upload & Management"
        text="Create, organise and manage your course content"
      />

      <main className="md:px-2">
        <CreateOrManage />
      </main>
    </>
  );
}
