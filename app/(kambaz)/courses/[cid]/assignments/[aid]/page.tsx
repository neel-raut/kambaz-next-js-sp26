/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import { setAssignments } from "../reducer";
import { RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const retrievedAssignment = assignments.find((assignment: any) => assignment._id === aid && assignment.course === cid);
  const [assignment, setAssignment] = useState<any>(retrievedAssignment || null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    const isNewAssignment = !assignment?._id;
    const defaultAssignment = {
      title: "New Assignment",
      description: "",
      points: 0,
      available: new Date().toISOString(),
      due: new Date().toISOString(),
      course: cid,
    };
    if (isNewAssignment) {
      const newAssignment = { ...defaultAssignment, ...assignment};
      const createdAssignment = await client.createAssignmentForCourse(cid as string, newAssignment);
      dispatch(setAssignments([...assignments, createdAssignment]));
    } else {
      await client.updateAssignment(assignment);
      const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a);
      dispatch(setAssignments(newAssignments));
    }
    redirect(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form className="d-flex flex-column gap-4 pt-3 py-4">
        <div>
          <FormLabel htmlFor="wd-name" >Assignment Name</FormLabel>
          <FormControl id="wd-name" type="text" defaultValue={assignment?.title || ""}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            readOnly={!isFaculty} />
        </div>

        <div>
          <FormLabel htmlFor="wd-description">Description</FormLabel>
          <FormControl
            as="textarea"
            id="wd-description"
            rows={10}
            defaultValue={assignment?.description || ""}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            readOnly={!isFaculty} />
        </div>

        <div className="d-flex flex-column gap-4">
          <Row className="d-flex w-100">
            <FormLabel xs={4} column className="text-end">Points</FormLabel>
            <Col xs={8}>
              <FormControl id="wd-points" type="number" defaultValue={assignment?.points || ""}
                onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}
                readOnly={!isFaculty} />
            </Col>
          </Row>

          <Row className="d-flex w-100">
            <FormLabel xs={4} column className="text-end">Assignment Group</FormLabel>
            <Col xs={8}>
              <FormSelect id="wd-assignment-group" disabled={!isFaculty}>
                <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
              </FormSelect>
            </Col>
          </Row>

          <Row className="d-flex w-100">
            <FormLabel xs={4} column className="text-end">Display Grade as</FormLabel>
            <Col xs={8}>
              <FormSelect id="wd-display-grade" disabled={!isFaculty}>
                <option value="Percentage" defaultChecked>Percentage</option>
              </FormSelect>
            </Col>
          </Row>

          <Row className="d-flex w-100">
            <FormLabel xs={4} column className="text-end">Submission Type</FormLabel>
            <Col xs={8}>
              <div className="p-3 border rounded">
                <FormSelect id="wd-submission-type" className="mb-3" disabled={!isFaculty}>
                  <option value="Online" defaultChecked>Online</option>
                </FormSelect>
                <span className="fs-6"><strong>Online Entry Options</strong></span>
                <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-text-entry" label="Text Entry" disabled={!isFaculty} />
                <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-website-url" label="Website URL" defaultChecked disabled={!isFaculty} />
                <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-media-recordings" label="Media Recordings" disabled={!isFaculty} />
                <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-student-annotations" label="Student Annotations" disabled={!isFaculty} />
                <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-file-uploads" label="File Uploads" disabled={!isFaculty} />
              </div>
            </Col>
          </Row>

          <Row className="d-flex w-100">
            <FormLabel xs={4} column className="text-end">Assign</FormLabel>
            <Col xs={8}>
              <div className="p-3 border rounded d-flex flex-column gap-3">
                <div>
                  <span className="fs-6"><strong>Assign to</strong></span>
                  <FormSelect id="wd-submission-type" disabled={!isFaculty}>
                    <option value="Everyone" defaultChecked>Everyone</option>
                  </FormSelect>
                </div>

                <div>
                  <span className="fs-6"><strong>Due</strong></span>
                  <InputGroup>
                    <FormControl type="datetime-local" defaultValue={assignment?.due + 'T23:59' || ""}
                      onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
                      readOnly={!isFaculty} />
                  </InputGroup>
                </div>

                <div>
                  <Row>
                    <Col xs={12} sm={6}>
                      <span className="fs-6"><strong>Available from</strong></span>
                      <InputGroup>
                        <FormControl type="datetime-local" defaultValue={assignment?.available + 'T00:00' || ""}
                          onChange={(e) => setAssignment({ ...assignment, available: e.target.value })}
                          readOnly={!isFaculty} />
                      </InputGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                      <span className="fs-6"><strong>Until</strong></span>
                      <InputGroup>
                        <FormControl type="datetime-local"
                          onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                          readOnly={!isFaculty} />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
      <hr />
      <div className="d-flex gap-1 justify-content-end">
        <Button variant="secondary" size="lg" id="wd-cancel-btn" onClick={() => redirect(`/courses/${cid}/assignments`)}> {isFaculty ? "Cancel" : "Go Back"} </Button>
        {isFaculty && (
          <>
            <Button variant="danger" size="lg" id="wd-save-btn"
              onClick={onCreateAssignmentForCourse}> Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
