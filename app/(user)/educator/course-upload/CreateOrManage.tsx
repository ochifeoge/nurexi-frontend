"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ManageCourse from "./ManageCourse";
import { Book } from "lucide-react";
import { FaBook } from "react-icons/fa6";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const CreateOrManage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current 'type' from URL, defaulting to 'create' if not present
  const currentType = searchParams.get("type") || "create";

  console.log(currentType);
  const tabs = [
    { label: "Create new course", value: "create" },
    { label: "Manage courses", value: "manage" },
  ];

  const handleToggle = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);
    // Use router.replace to update the URL without adding a new history entry
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="bg-grey flex items-center gap-0.5 mt-4 w-fit  rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleToggle(tab.value)}
            className={`p-2 text-black cursor-pointer bodyText duration-200 rounded-2xl transition-all ${
              currentType === tab.value
                ? "bg-white  shadow-sm"
                : " hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {currentType === "create" ? (
        <div className="py-6 px-3 rounded">
          <div className="grid grid-cols-4 justify-center mb-4">
            {[...Array(4)].map((_, i) => (
              <Link
                key={i}
                href={"course-upload/course-content"}
                className="px-1.25 py-2.5 max-w-50 justify-center flex items-center gap-2 text-secondaryDark rounded-xl border bg-secondaryLight"
              >
                <FaBook />
                <p className="bodyText ">Course Content</p>
              </Link>
            ))}
          </div>

          <Separator />
        </div>
      ) : (
        <ManageCourse />
      )}
    </>
  );
};

export default CreateOrManage;
