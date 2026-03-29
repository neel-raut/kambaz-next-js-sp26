/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../enrollments/client";
import { setEnrollments } from "../enrollments/reducer";
import { RootState } from "../store";

export default function EnrollmentButton({
  isEnrolled,
  currentUser,
  courseId
}: {
  isEnrolled: boolean;
  currentUser?: any;
  courseId: string;
}) {
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const onEnrollInCourse = async (courseId: string) => {
    const newEnrollment = await client.enrollUserInCourse(
        currentUser?._id,
        courseId,
    );
    dispatch(setEnrollments([ ...enrollments, newEnrollment ]));
  };

  const onUnenrollFromCourse = async (courseId: string) => {
    await client.unenrollUserFromCourse(
        currentUser?._id,
        courseId,
    );
    dispatch(setEnrollments(enrollments.filter((e) => !(e.user === currentUser?._id && e.course === courseId))));
  };

  const handleEnroll = (event: React.MouseEvent) => {
    event.preventDefault();
    onEnrollInCourse(courseId);
  };

  const handleUnenroll = (event: React.MouseEvent) => {
    event.preventDefault();
    onUnenrollFromCourse(courseId);
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