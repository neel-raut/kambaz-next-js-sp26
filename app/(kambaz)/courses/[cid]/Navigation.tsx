"use client"
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function CourseNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const basePath = link === "Home"
                    ? `/courses/${cid}/home`
                    : `/courses/${cid}/${link.toLowerCase()}`;
                const linkHref = link === "People" ? `${basePath}/table` : basePath;

                const isActive = link === "Home"
                    ? pathname === `/courses/${cid}` || pathname?.startsWith(`/courses/${cid}/home`)
                    : pathname?.startsWith(basePath);

                return (<Link 
                        key={link} 
                        href={linkHref} 
                        id={`wd-course-${link.toLowerCase()}-link`} 
                        className={`list-group-item ${isActive ? "active" : "text-danger"} border-0`}>
                            {link}
                        </Link>
                );
            })}
        </div>
    )
}