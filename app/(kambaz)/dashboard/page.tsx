import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/1234/home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/ReactJS.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Full Stack software developer
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/3000"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/cs3000pic.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3000 Algorithms</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Algorithms & Data
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/3650"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/cs3650pic.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3650 Computer Systems</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Computer Systems
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/3800"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/cs3800pic.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3800 Theory of Computation</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Theory of Computation
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/2550"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/cy2550pic.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CY2550 Cybersecurity</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Cybersecurity
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/1112"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/comm1112pic.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">COM1112 Public Speaking</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Public Speaking
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col classname="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link href="/courses/2345"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src="/images/thtr2345pic.jpg" width="100%" height={160}/>
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">THTR2345 Acting for the Camera</CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                            Acting for the Camera
                                        </CardText>
                                        <Button variant="primary"> Go </Button>
                                    </CardBody>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}