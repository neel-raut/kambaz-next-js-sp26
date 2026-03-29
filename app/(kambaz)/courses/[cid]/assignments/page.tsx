/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import AssignmentListControlButtons from "./AssignmentListControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "next/navigation";
import { setAssignments} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import { useEffect } from "react";

function formatDate(dateString: string, time: string) {
  // Take in date as "YYYY-MM-DD" format, time as "HH:MM" format
  // Then conver to "Month Day at HH:MM am/pm" format
  const date = dateString.includes("T") ? new Date(dateString) : new Date(`${dateString}T${time}`);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${formattedDate} at ${formattedTime.toLowerCase()}`;
}

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    };

    const onRemoveAssignment = async (assignmentId: string) => {
      await client.deleteAssignment(assignmentId);
      dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
    };

    useEffect(() => {
      fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div id="wd-assignments">
        <AssignmentsControls /><br />

        <ListGroup className="rounded-0" id="wd-assignments-list">
          <ListGroupItem className="wd-assignment-title p-0 mb-5 fs-5">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentListControlButtons />
            </div>
            <ListGroup className="wd-assignments rounded-0">
              {assignments
                .map((assignment: any) => (
                  <ListGroupItem className="wd-assignment d-flex align-items-center" key={assignment._id}>
                    <BsGripVertical className="me-2 fs-3 flex-shrink-0 me-1" />
                    <BsFileEarmarkText className="me-4 fs-3 text-success flex-shrink-0" />
                    <div className="d-flex flex-column flex-grow-1">
                      <Link className="text-dark fw-bold text-decoration-none" href={`/courses/${cid}/assignments/${assignment._id}`}>
                        {assignment.title}
                      </Link>
                      <div className="text-muted small d-flex flex-wrap gap-1 fs-6">
                        <span className="text-danger">Multiple Modules</span> |
                        <span><strong>Not available until</strong> {formatDate(assignment.available, "00:00")} |</span>
                        <span><strong>Due</strong> {formatDate(assignment.due, "23:59")} |</span>
                        <span>{assignment.points} pts</span>
                      </div>
                    </div>
                    <AssignmentControlButtons
                      assignmentId={assignment._id}
                      deleteAssignment={(assignmentId) => {
                        onRemoveAssignment(assignmentId);
                      }} />
                  </ListGroupItem>
                  ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
  );}