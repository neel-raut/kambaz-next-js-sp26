/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname() || "";
  let breadcrumbLabels = pathname.split("/") || [];
  breadcrumbLabels = breadcrumbLabels.slice(3);
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer) || [];
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) || [];
  // console.log(breadcrumbLabels);

  return (
    <span>
      {course?.name}
      {breadcrumbLabels.map((label, idx) => {
        const prev = breadcrumbLabels[idx - 1];

        if (prev === "assignments") {
          const a = assignments.find((x: any) => x._id === label) as any;
          return <span key={idx}> {' > '}{a ? (a.title ?? label) : label}</span>;
        }
        if (prev === "quizzes") {
          const q = quizzes.find((x: any) => x._id === label) as any;
          return <span key={idx}> {' > '}{q ? (q.title ?? label) : label}</span>;
        }
        const pretty = label ? (label.charAt(0).toUpperCase() + label.slice(1)) : label;
        return <span key={idx}> {' > '}{pretty}</span>;
      })}
    </span>
  );
}
