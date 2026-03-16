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
                const linkHref = link === "People" ? `/courses/${cid}/${link.toLowerCase()}/table`:`/courses/${cid}/${link.toLowerCase()}`;

                return (<Link 
                        key={link} 
                        href={linkHref} 
                        id={`wd-course-${link.toLowerCase()}-link`} 
                        className={`list-group-item ${(pathname === linkHref) ? "active" : "text-danger"} border-0`}>
                            {link}
                        </Link>
                );
            })}
        </div>
    )
}