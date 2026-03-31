"use client";

import { useAppSelector } from "@/hooks/StoreHooks";
import ExamSession from "./ExamSession";

const SelectExamType = ({ examsData }: { examsData: any[] }) => {
  const { examType } = useAppSelector((store) => store.exam);
  return (
    <>
      <ExamSession />
    </>
  );
};

export default SelectExamType;
