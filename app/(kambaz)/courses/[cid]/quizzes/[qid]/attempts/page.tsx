/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Container, Table } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

const formatDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString(undefined, {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit",
    });
};

/** Minutes between two ISO strings, rounded up to the nearest minute. */
const durationMinutes = (startISO?: string, endISO?: string): number => {
    if (!startISO || !endISO) return 0;
    const start = new Date(startISO).getTime();
    const end = new Date(endISO).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    return Math.ceil((end - start) / 60000);
};

export default function AttemptsHistory() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => (state as any).accountReducer || {});
    const quiz = quizzes.find((q: any) => q._id === qid && q.course === cid) as any;

    const [attempts, setAttempts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let alive = true;
        const load = async () => {
            if (!qid || !currentUser?._id) return;
            try {
                const data = await client.findAttemptsForQuizByUser(qid as string, currentUser._id);
                if (alive) setAttempts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load attempts:", err);
                if (alive) setAttempts([]);
            } finally {
                if (alive) setLoading(false);
            }
        };
        load();
        return () => { alive = false; };
    }, [qid, currentUser?._id]);

    if (!quiz) return <Container className="mt-3">Quiz not found.</Container>;

    // Attempt with the highest attemptNumber is "LATEST".
    const latestAttemptNumber = attempts.reduce(
        (m, a) => Math.max(m, a.attemptNumber || 0),
        0
    );

    const attemptsDesc = [...attempts].reverse();
    const restrictToLatest = quiz.settings?.viewLastAttemptOnly;
    const timeLimit = quiz.settings?.timeLimit;

    return (
        <Container className="mt-3">
            <h2>{quiz.title}</h2>

            <div className="mt-3 mb-2">
                <div><strong>Due:</strong> {formatDate(quiz.due)}</div>
                <div><strong>Points:</strong> {quiz.points ?? 0}</div>
                <div><strong>Questions:</strong> {quiz.questions?.length ?? 0}</div>
                <div>
                    <strong>Available:</strong> {formatDate(quiz.available)} - {formatDate(quiz.until)}
                </div>
                <div>
                    <strong>Time Limit:</strong>{" "}
                    {typeof timeLimit === "number" ? `${timeLimit} Minutes` : "None"}
                </div>
            </div>

            <hr />

            <h4>Instructions</h4>
            <p>{quiz.description}</p>

            <h4 className="mt-4">Attempt History</h4>
            {loading ? (
                <p className="text-muted">Loading...</p>
            ) : attempts.length === 0 ? (
                <p className="text-muted">No attempts yet.</p>
            ) : (
                <Table bordered>
                    <thead>
                        <tr>
                            <th></th>
                            <th><strong>Attempt</strong></th>
                            <th><strong>Time</strong></th>
                            <th><strong>Score</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {attemptsDesc.map((a) => {
                            const isLatest = a.attemptNumber === latestAttemptNumber;
                            const linkDisabled = restrictToLatest && !isLatest;
                            return (
                                <tr key={a._id}>
                                    <td><strong>{isLatest ? "LATEST" : ""}</strong></td>
                                    <td>
                                        {linkDisabled ? (
                                            <span className="text-muted">
                                                Attempt {a.attemptNumber}
                                            </span>
                                        ) : (
                                            <Link className="text-danger" href={`/courses/${cid}/quizzes/${qid}/attempts/${a._id}`}>
                                                Attempt {a.attemptNumber}
                                            </Link>
                                        )}
                                    </td>
                                    <td>
                                        {durationMinutes(a.startedAt, a.submittedAt)} minutes
                                    </td>
                                    <td>
                                        {a.score ?? 0} out of {quiz.points ?? 0}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}

            <hr />
        </Container>
    );
}