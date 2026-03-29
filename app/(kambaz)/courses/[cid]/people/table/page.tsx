/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table } from "react-bootstrap";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { setPeople } from "../reducer";
import { useState, useEffect } from "react";
import { RootState } from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../../client";
import * as enrollClient from "../../../../enrollments/client";
import * as userClient from "../../../../account/client"
import { setEnrollments } from "../../../../enrollments/reducer"

export default function PeopleTable() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { people } = useSelector((state: RootState) => state.peopleReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const [loginIdInput, setLoginIdInput] = useState("");
    const [editingCell, setEditingCell] = useState<{ userId: string; field: string } | null>(null);
    const [editingValues, setEditingValues] = useState<Record<string, string>>({});
    const dispatch = useDispatch();

    const handleAddClick = async () => {
        if (!loginIdInput) return;

        const user = await client.findUserByLoginId(loginIdInput);
        if (!user) {
            alert("User not found!");
            return;
        }
        await onEnrollUserInCourse(user._id, cid as string);
        setLoginIdInput("");
    };

    const fetchPeople = async () => {
        const people = await client.findUsersForCourse(cid as string);
        dispatch(setPeople(people));
    };

    const onEnrollUserInCourse = async (userId: string, courseId: string) => {
        const userToBeEnrolled = await client.findUserById(userId);
        const newEnrollment = await enrollClient.enrollUserInCourse(
            userId,
            courseId,
        );
        dispatch(setEnrollments([...enrollments, newEnrollment]));
        dispatch(setPeople([...people, userToBeEnrolled]));
    };

    const onUnenrollUserFromCourse = async (userId: string, courseId: string) => {
        const userToBeUnenrolled = await client.findUserById(userId);
        await enrollClient.unenrollUserFromCourse(
            userId,
            courseId,
        );
        dispatch(setEnrollments(enrollments.filter((e: any) => !(e.user === userId && e.course === courseId))));
        dispatch(setPeople(people.filter((p: any) => p._id !== userToBeUnenrolled._id)));
    };

    const onUpdateUserInCourse = async (updatedUser: any) => {
        const savedUser = await userClient.updateUser(updatedUser);
        const newPeople = people.map((p: any) =>
            p._id === updatedUser._id ? savedUser : p);
        dispatch(setPeople(newPeople));
    };

    const isFaculty = currentUser?.role === "FACULTY";

    useEffect(() => {
        fetchPeople();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const EditableCell = ({
        user,
        field,
    }: {
        user: any;
        field: string
    }) => {
        const key = `${user._id}_${field}`;
        const isEditing = editingCell?.userId === user._id && editingCell?.field === field;

        const dropdownOptions: Record<string, string[]> = {
            role: ["USER", "STUDENT", "TA", "FACULTY", "ADMIN"],
        };

        return (
            <td
                onClick={() => {
                    setEditingCell({ userId: user._id, field });
                    setEditingValues(prev => ({ ...prev, [key]: user[field] || "" }));
                }}
            >
                {isEditing ? (
                    dropdownOptions[field] ? (
                        <select
                            value={editingValues[key]}
                            autoFocus
                            onChange={(e) =>
                                setEditingValues(prev => ({ ...prev, [key]: e.target.value }))
                            }
                            onBlur={async () => {
                                const updatedUser = { ...user, [field]: editingValues[key] };
                                await onUpdateUserInCourse(updatedUser);
                                setEditingCell(null);
                            }}
                        >
                            {dropdownOptions[field].map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={editingValues[key]}
                            autoFocus
                            onChange={(e) =>
                                setEditingValues(prev => ({ ...prev, [key]: e.target.value }))
                            }
                            onKeyDown={async (e) => {
                                if (e.key === "Enter") {
                                    const updatedUser = { ...user, [field]: editingValues[key] };
                                    await onUpdateUserInCourse(updatedUser);
                                    setEditingCell(null);
                                }
                                if (e.key === "Escape") setEditingCell(null);
                            }}
                            onBlur={() => setEditingCell(null)}
                        />
                    )
                ) : (
                    user[field]
                )}
            </td>
        );
    };


    return (
        <div id="wd-people-table">
            {isFaculty && 
                <div className="d-flex mb-3">
                    <input
                        type="text"
                        placeholder="Enter user login ID"
                        value={loginIdInput}
                        onChange={(e) => setLoginIdInput(e.target.value)}
                        className="form-control me-2"
                    />
                    <button className="btn btn-primary" onClick={handleAddClick}>Add</button>
                </div>
            }
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                        {isFaculty && <th>Remove?</th>}
                    </tr>
                </thead>
                <tbody>
                    {people
                        .map((user: any) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>{" "}
                                    <span className="wd-last-name">{user.lastName}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                {isFaculty ? (
                                    <EditableCell user={user} field="section" /> 
                                ) : (
                                    <td className="wd-section">{user.section}</td>
                                )}
                                {isFaculty ? (
                                    <EditableCell user={user} field="role" />
                                ) : (
                                    <td className="wd-role">{user.role}</td>
                                )}
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                                {isFaculty && 
                                    <td className="wd-remove">
                                        <FaTrash className="text-danger ms-4"
                                            onClick={() => onUnenrollUserFromCourse(user._id, cid as string)}
                                        />
                                    </td>
                                }
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>);
}