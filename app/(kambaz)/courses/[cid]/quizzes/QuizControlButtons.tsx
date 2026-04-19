/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { FaCheck, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { MdDoNotDisturb } from "react-icons/md";
import { Button, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
export default function QuizControlButtons(
  { quiz, onDelete, onPublish, onUnpublish, onCopy }:
    {
      quiz: any;
      onDelete: (quizId: string) => void;
      onPublish: (quizId: string) => void;
      onUnpublish: (quizId: string) => void;
      onCopy: (quizId: string, targetCourseId: string) => void;
    }
) {
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const [copyOpen, setCopyOpen] = useState(false);
  const enrolledCourseIds = enrollments?.filter((e: any) => e.user === currentUser?._id).map((e: any) => e.course) || [];
  const enrolledCourses = courses?.filter((c: any) => enrolledCourseIds.includes(c._id)) || [];
  if (currentUser?.role !== "FACULTY") return null;

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
    if (confirmDelete) {
      onDelete(quiz._id);
    }
  };

  const handleTogglePublish = () => {
    if (quiz.published) {
      onUnpublish(quiz._id);
    } else {
      onPublish(quiz._id);
    }
  };
  
  return (
    <div className="d-flex align-items-center">
      <span className="me-2">
        {quiz.published ? (
          <GreenCheckmark />
        ) : (
          <MdDoNotDisturb className="text-danger fs-4"
            onClick={handleTogglePublish} />
        )}
      </span>

      <Dropdown align="end">
        <Dropdown.Toggle as={Button} variant="link" className="p-0" id="wd-quiz-options">
          <IoEllipsisVertical className="fs-4 text-dark" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} href={`/courses/${quiz.course}/quizzes/${quiz._id}/details`}>
            <FaEdit className="me-2" /> Edit
          </Dropdown.Item>

          <Dropdown.Item onClick={handleDelete}>
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>

          <Dropdown.Item onClick={handleTogglePublish}>
            <FaCheck className="me-2" /> {quiz.published ? "Unpublish" : "Publish"}
          </Dropdown.Item>

          <div
            onMouseEnter={() => setCopyOpen(true)}
            onMouseLeave={() => setCopyOpen(false)}
            style={{ position: "relative" }}
          >
            <Dropdown.Item as="button" className="d-flex align-items-center">
              <FaCopy className="me-2" /> Copy
              <span className="ms-auto small text-muted">▶</span>
            </Dropdown.Item>

            <Dropdown drop="end" show={copyOpen} className="position-absolute" style={{ top: 0, left: "100%" }}>
              <Dropdown.Menu>
                {enrolledCourses.length === 0 && <Dropdown.Item disabled>No enrolled courses</Dropdown.Item>}
                {enrolledCourses.map((course: any) => (
                  <Dropdown.Item
                    key={course._id}
                    onClick={() => onCopy(quiz._id, course._id)}>
                    {course.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}