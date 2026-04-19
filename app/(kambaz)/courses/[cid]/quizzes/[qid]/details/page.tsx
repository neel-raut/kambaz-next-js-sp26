/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Col, Container, Row } from "react-bootstrap";
import { redirect, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useEffect, useState } from "react";
import * as client from "../../client";

// --- Small formatting helpers ---
// Turn a snake_case or lowercase enum value into a Title Cased display label.
const formatEnum = (val?: string) => {
    if (!val) return "—";
    return val
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
};

const yesNo = (v?: boolean) => (v ? "Yes" : "No");

const formatDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

// Renders a single label/value row in the details grid.
const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Row className="mb-2">
        <Col xs={5} className="text-end fw-semibold">{label}</Col>
        <Col xs={7}>{value}</Col>
    </Row>
);

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const quiz = quizzes.find((q: any) => q._id === qid && q.course === cid) as any;
    const role: string | undefined = currentUser?.role;
    const [attemptsUsed, setAttemptsUsed] = useState<number>(0);

    useEffect(() => {
        let alive = true;
        const load = async () => {
            if (role !== "STUDENT" || !qid || !currentUser?._id) return;
            try {
                const data = await client.findAttemptsForQuizByUser(qid as string, currentUser._id);
                if (alive) setAttemptsUsed(Array.isArray(data) ? data.length : 0);
            } catch (err) {
                console.error("Failed to load attempts:", err);
            }
        };
        load();
        return () => { alive = false; };
    }, [role, qid, currentUser?._id]);

    if (!quiz) {
        return (
            <Container className="mt-3">
                <p>Quiz not found.</p>
                <Button variant="secondary" onClick={() => redirect(`/courses/${cid}/quizzes`)}>
                    Back
                </Button>
            </Container>
        );
    }

    const settings = quiz?.settings || {};
    const maxAttempts = settings.multipleAttempts ? (settings.maxAttempts ?? 1) : 1;
    const attemptsLeft = Math.max(0, maxAttempts - attemptsUsed);
    const isClosed = !!quiz.until && new Date().getTime() > new Date(quiz.until).getTime();
    const isNotAvailable = !!quiz.available && new Date().getTime() < new Date(quiz.available).getTime();
    const startDisabled = attemptsLeft === 0 || isClosed || isNotAvailable;
    const startDisabledReason = attemptsLeft === 0
        ? "No attempts remaining"
        : isClosed
        ? "Quiz is closed"
        : isNotAvailable
        ? "Quiz not yet available"
        : undefined;

    const goToEditor = () => redirect(`/courses/${cid}/quizzes/${qid}/editor`);
    const goToPreview = () => redirect(`/courses/${cid}/quizzes/${qid}/preview`);
    const goToQuizzes = () => redirect(`/courses/${cid}/quizzes`);
    const goToAttempts = () => redirect(`/courses/${cid}/quizzes/${qid}/attempts`);

    const renderButtons = () => {
        if (role === "FACULTY") {
            return (
                <div className="d-flex gap-2 justify-content-center mb-4">
                    <Button variant="secondary" onClick={goToPreview}>Preview</Button>
                    <Button variant="secondary" onClick={goToEditor}>Edit</Button>
                </div>
            );
        }
        if (role === "STUDENT") {
            return (
                <div className="d-flex gap-2 justify-content-center mb-4">
                    <Button 
                        variant="danger" 
                        onClick={goToPreview} 
                        disabled={startDisabled}
                        title={startDisabledReason}
                    >
                        Start Quiz
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={goToAttempts}
                        disabled={attemptsUsed === 0}
                        title={attemptsUsed === 0 ? "No attempts taken yet" : undefined}
                    >
                        View Attempts
                    </Button>
                </div>
            );
        }
        return (
            <div className="d-flex justify-content-center mb-4">
                <Button variant="secondary" onClick={goToQuizzes}>Back</Button>
            </div>
        );
    };

    return (
        <Container className="mt-3">
            {renderButtons()}

            <hr />

            <h3 className="mb-4">{quiz.title}</h3>

            <DetailRow label="Quiz Type" value={formatEnum(settings.quizType)} />
            <DetailRow label="Points" value={quiz.points ?? 0} />
            <DetailRow label="Assignment Group" value={formatEnum(settings.assignmentGroup)} />
            <DetailRow label="Shuffle Answers" value={yesNo(settings.shuffleAnswers)} />
            <DetailRow
                label="Time Limit"
                value={
                    typeof settings.timeLimit === "number"
                        ? `${settings.timeLimit} Minutes`
                        : "No Time Limit"
                }
            />
            <DetailRow label="Multiple Attempts" value={yesNo(settings.multipleAttempts)} />
            {settings.multipleAttempts && (
                <DetailRow label="How Many Attempts" value={settings.maxAttempts ?? 1} />
            )}
            <DetailRow label="Show Correct Answers" value={settings.showCorrectAnswers || "—"} />
            <DetailRow label="One Question at a Time" value={yesNo(settings.oneQuestionAtATime)} />
            <DetailRow
                label="Access Code"
                value={settings.accessCode ? settings.accessCode : "None"}
            />
            <DetailRow label="Webcam Required" value={yesNo(settings.webcamRequired)} />
            <DetailRow
                label="Lock Questions After Answering"
                value={yesNo(settings.lockQuestionsAfterAnswering)}
            />
            <DetailRow
                label="View Last Attempt Only"
                value={yesNo(settings.viewLastAttemptOnly)}
            />

            <hr className="mt-4" />

            <Row className="fw-semibold">
                <Col xs={4}>Due</Col>
                <Col xs={4}>Available from</Col>
                <Col xs={4}>Until</Col>
            </Row>
            <Row>
                <Col xs={4}>{formatDate(quiz.due)}</Col>
                <Col xs={4}>{formatDate(quiz.available)}</Col>
                <Col xs={4}>{formatDate(quiz.until)}</Col>
            </Row>
        </Container>
    );
}