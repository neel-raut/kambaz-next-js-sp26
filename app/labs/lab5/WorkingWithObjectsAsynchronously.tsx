/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { FormControl } from "react-bootstrap";

export default function WorkingWithObjectsAsynchronously() {
    const [assignment, setAssignment] = useState<any>({});
    const fetchAssignment = async () => {
        const assignment = await client.fetchAssignment();
        setAssignment(assignment);
    };
    const updateTitle = async (title: string) => {
        const updatedAssignment = await client.updateTitle(title);
        setAssignment(updatedAssignment);
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAssignment();
    }, []);

    return (
        <div className="p-4" id="wd-asynchronous-objects">
            <h3>Working with Objects Asynchronously</h3>
            <h4>Assignment</h4>
            {assignment ? (
                <div>
                    <FormControl defaultValue={assignment.title} className="mb-2"
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
                    <FormControl as="textarea" rows={3} defaultValue={assignment.description} className="mb-2"
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
                    <FormControl type="date" className="mb-2" defaultValue={assignment.due}
                        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="wd-completed"
                            defaultChecked={assignment.completed}
                            onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
                        <label className="form-check-label" htmlFor="wd-completed"> Completed </label>
                    </div>
                </div>
            ) : (
                <p>Loading assignment...</p>
            )}
            <button className="btn btn-primary me-2" onClick={() => updateTitle(assignment.title)}>
                Update Title
            </button>
            <pre>
                {assignment
                  ? JSON.stringify(assignment, null, 2)
                  : "No assignment loaded"}
            </pre>
            <hr />
        </div>
    );
}