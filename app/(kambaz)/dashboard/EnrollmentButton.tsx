/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addEnrollment, deleteEnrollment } from "../enrollments/reducer";

export default function EnrollmentButton({
  isEnrolled,
  enrolledClass,
  currentUser,
  courseId
}: {
  isEnrolled: boolean;
  enrolledClass?: any;
  currentUser?: any;
  courseId: string;
}) {

  const dispatch = useDispatch();

  const handleEnroll = (event: React.MouseEvent) => {
    event.preventDefault();
    const newEnrollment = { user: currentUser?._id, course: courseId };
    dispatch(addEnrollment(newEnrollment));
  };

  const handleUnenroll = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(deleteEnrollment(enrolledClass._id));
  };

  if (isEnrolled) {
    return (
      <Button
        variant="danger"
        id="wd-unenroll-course-click"
        onClick={handleUnenroll}
      >
        Unenroll
      </Button>
    );
  }

  return (
    <Button
      variant="success"
      id="wd-enroll-course-click"
      onClick={handleEnroll}
    >
      Enroll
    </Button>
  );
}