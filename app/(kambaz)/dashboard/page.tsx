/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import { addEnrollment } from "../enrollments/reducer";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [toggleAllCourses, setToggleAllCourses] = useState(false);

    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "reactjs.jpg", description: "New Description"
    });

    const coursesToDisplay = toggleAllCourses ? courses : courses.filter((course) =>
        enrollments.some(
            (enrollment) =>
                enrollment.user === currentUser?._id &&
                enrollment.course === course._id
        )
    );

    const isFaculty = currentUser?.role === "FACULTY";

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard
            <button className="btn btn-primary mb-3 float-end"
                    onClick={() => setToggleAllCourses(!toggleAllCourses)}>
                Enrollments
            </button>
            </h1> <hr />

            {isFaculty && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={() => {
                                    const newEnrollment = { user: currentUser?._id, course: course._id };
                                    dispatch(addNewCourse(course));
                                    dispatch(addEnrollment(newEnrollment));
                                }} > Add </button>
                        <button className="btn btn-warning float-end me-2"
                                id="wd-update-course-click"
                                onClick={() => dispatch(updateCourse(course))} > Update </button>
                    </h5><br />
                    <FormControl value={course.name} className="mb-2"
                                onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
                    <FormControl as="textarea" value={course.description} rows={3}
                                onChange={(e) => setCourse({ ...course, description: e.target.value }) } /> <hr />
                </>
            )}
            
            <h2 id="wd-dashboard-published">Published Courses ({coursesToDisplay.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {coursesToDisplay
                    .map((course) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <CourseCard id={course._id} imageName={course.image} title={course.name} description={course.description} onDelete={(id: string) => dispatch(deleteCourse(id))} onEdit={setCourse} isFaculty={isFaculty} enrollmentViewToggled={toggleAllCourses} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}