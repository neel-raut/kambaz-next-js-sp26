import { Col, Row } from "react-bootstrap";
import CourseCard from "./CourseCard";
import * as db from "../database";

export default function Dashboard() {
    const courses = db.courses;
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <CourseCard id={course._id} imageName={course.image} title={course.name} description={course.description} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}