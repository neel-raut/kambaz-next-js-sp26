"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();

 let breadcrumbLabels = pathname.split("/") || "";
 breadcrumbLabels = breadcrumbLabels.slice(3);
 console.log(breadcrumbLabels);

 return (
   <span>
    {course?.name} {breadcrumbLabels.map((label) => ' > ' + label.charAt(0).toUpperCase() + label.slice(1))}
   </span>
);}
