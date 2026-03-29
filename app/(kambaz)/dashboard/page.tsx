/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import { addEnrollment, setEnrollments } from "../enrollments/reducer";
import * as client from "../courses/client";
import * as enrollClient from "../enrollments/client";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const dispatch = useDispatch();
    const [toggleAllCourses, setToggleAllCourses] = useState(false);

    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "reactjs.jpg", description: "New Description"
    });

    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([ ...courses, newCourse ]));
        const newEnrollment = { user: currentUser?._id, course: newCourse._id };
        dispatch(addEnrollment(newEnrollment));
    };

    const onDeleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await client.updateCourse(course);
        dispatch(setCourses(courses.map((c) => {
            if (c._id === course._id) {
                return course;
            } else {
                return c;
            }
        })));
    };

    const fetchCourses = async () => {
        try {
            if (toggleAllCourses) {
                const allCourses = await client.fetchAllCourses();
                dispatch(setCourses(allCourses));
            } else {
                const myCourses = await client.findMyCourses();
                dispatch(setCourses(myCourses));
            }
        } catch (error) {
            console.error(error);
            dispatch(setCourses([]));
        }
    };

    const fetchEnrollments = async () => {
        const enrollments = await enrollClient.findMyEnrollments();
        dispatch(setEnrollments(enrollments));
    };

    useEffect(() => {
        fetchCourses();
        fetchEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, toggleAllCourses]);

    // const coursesToDisplay = toggleAllCourses ? courses : courses.filter((course) =>
    //     enrollments.some(
    //         (enrollment) =>
    //             enrollment.user === currentUser?._id &&
    //             enrollment.course === course._id
    //     )
    // );

    const isFaculty = currentUser?.role === "FACULTY";

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard
            {currentUser && (
                <button className="btn btn-primary mb-3 float-end"
                    onClick={() => setToggleAllCourses(!toggleAllCourses)}>
                Enrollments
                </button>
            )}
            </h1> <hr />

            {isFaculty && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={onAddNewCourse}> Add </button>
                        <button className="btn btn-warning float-end me-2"
                                id="wd-update-course-click"
                                onClick={onUpdateCourse} > Update </button>
                    </h5><br />
                    <FormControl value={course.name} className="mb-2"
                                onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
                    <FormControl as="textarea" value={course.description} rows={3}
                                onChange={(e) => setCourse({ ...course, description: e.target.value }) } /> <hr />
                </>
            )}
            
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses
                    .map((course) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <CourseCard id={course._id} imageName={course.image} title={course.name} description={course.description} onDelete={onDeleteCourse} onEdit={setCourse} isFaculty={isFaculty} enrollmentViewToggled={toggleAllCourses} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}