"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CourseLayout({ children }: { children: ReactNode }) {
    const { cid } = useParams();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const course = courses.find((course) => course._id === cid);
    const [toggleCourseNav, setToggleCourseNav] = useState(true);
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"
                                onClick={() => setToggleCourseNav(!toggleCourseNav)} />
                <Breadcrumb course={course} />
            </h2> 
            
            <hr />
            
            <div className="d-flex">
                {toggleCourseNav && 
                    (<div className="d-none d-sm-block">
                        <CourseNavigation />
                    </div>
                )}

                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}