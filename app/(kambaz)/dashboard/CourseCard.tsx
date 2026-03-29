/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EnrollmentButton from "./EnrollmentButton";

export default function CourseCard({
    id,
    imageName,
    title,
    description,
    onDelete,
    onEdit,
    isFaculty,
    enrollmentViewToggled,
}: {
    id?: string;
    imageName?: string;
    title?: string;
    description?: string;
    onDelete?: (id: string) => void;
    onEdit?: (course: any) => void;
    isFaculty?: boolean;
    enrollmentViewToggled?: boolean;
}) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const enrolledClass = enrollments.find(
        (enrollment: any) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === id
    );
    const isEnrolled = !!enrolledClass;
    return (
        <Card>
            <Link href={isEnrolled ? `/courses/${id}/home` : `/dashboard`}
                className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src={`/images/${imageName}`} width="100%" height={160}/>
                    <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{title}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            {description}
                        </CardText>

                        <div className = "d-flex justify-content-between align-items-center">
                            
                            <div>
                                {isEnrolled && (
                                    <Button variant="primary"> Go </Button>
                                )}
                            </div>

                            <div className="d-flex">

                                {!isFaculty && enrollmentViewToggled && (
                                    <EnrollmentButton
                                        isEnrolled={isEnrolled}
                                        currentUser={currentUser}
                                        courseId={id!}
                                    />
                                )}

                                {isFaculty && (
                                    <>
                                        <Button
                                            variant="warning"
                                            className="ms-2"
                                            id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                onEdit?.({
                                                    _id: id,
                                                    name: title,
                                                    description: description,
                                                    image: imageName
                                                });
                                            }}> 
                                            Edit 
                                        </Button>

                                        <Button
                                            variant="danger" 
                                            className="ms-2" 
                                            id="wd-delete-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                onDelete?.(id!);
                                            }}> 
                                            Delete
                                        </Button>
                                    </>
                                )}

                            </div>
                        </div>

                        {isFaculty && enrollmentViewToggled && (
                            <div className="d-flex justify-content-end mt-2">
                                <EnrollmentButton
                                    isEnrolled={isEnrolled}
                                    currentUser={currentUser}
                                    courseId={id!}
                                />
                            </div>
                        )}                        
                    </CardBody>
            </Link>
        </Card>
    );
}