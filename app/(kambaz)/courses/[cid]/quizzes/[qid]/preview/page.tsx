/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Container, FormCheck, FormControl } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";
import { BsExclamationCircleFill } from "react-icons/bs";

const formatTime = (d: Date) =>
    d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });

const formatDateTime = (d: Date | string) => {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleString(undefined, {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit",
    });
};

/**
 * Renders a single question card: gray header (title + points) above a white
 * body (question text + answer input). Used both in this preview page and the
 * attempt-results page — but here without any highlighting, inputs enabled.
 */
const QuestionCard = ({
    question,
    index,
    answer,
    onChange,
}: {
    question: any;
    index: number;
    answer: any;
    onChange: (value: any) => void;
}) => {
    const inputName = `q-${question._id}`;

    return (
        <div className="border rounded mb-4">
            <div className="bg-light px-3 py-2 d-flex justify-content-between align-items-center">
                <strong>Question {index + 1}</strong>
                <span className="text-muted">{question.points ?? 0} pts</span>
            </div>
            <div className="bg-white p-3">
                <p>{question.question}</p>
                <hr />
                {question.kind === "multiple_choice" && (
                    <div className="d-flex flex-column gap-2">
                        {(question.options || []).map((opt: string, idx: number) => (
                            <FormCheck
                                key={idx}
                                type="radio"
                                name={inputName}
                                id={`${inputName}-${idx}`}
                                label={opt}
                                checked={answer === idx}
                                onChange={() => onChange(idx)}
                            />
                        ))}
                    </div>
                )}
                {question.kind === "true_false" && (
                    <div className="d-flex flex-column gap-2">
                        <FormCheck
                            type="radio"
                            name={inputName}
                            id={`${inputName}-true`}
                            label="True"
                            checked={answer === true}
                            onChange={() => onChange(true)}
                        />
                        <FormCheck
                            type="radio"
                            name={inputName}
                            id={`${inputName}-false`}
                            label="False"
                            checked={answer === false}
                            onChange={() => onChange(false)}
                        />
                    </div>
                )}
                {question.kind === "fill_in_the_blank" && (
                    <FormControl
                        type="text"
                        placeholder="Your answer"
                        value={answer ?? ""}
                        onChange={(e) => onChange(e.target.value)}
                        style={{ maxWidth: "400px" }}
                    />
                )}
            </div>
        </div>
    );
};

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => (state as any).accountReducer || {});
    const quiz = quizzes.find((q: any) => q._id === qid && q.course === cid) as any;
    const router = useRouter();

    // startedAt is set once on mount (via lazy initializer) and never again, so
    // even if React re-renders or strict mode double-invokes effects, the value
    // stays fixed from first paint.
    const [startedAt] = useState<string>(() => new Date().toISOString());
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [lastSaved, setLastSaved] = useState<Date>(new Date());
    const [submitting, setSubmitting] = useState<boolean>(false);

    // Guard: if quiz is missing, bail out. (E.g. page visited directly without
    // the quizzes slice being populated — send them back to the list.)
    useEffect(() => {
        if (!quiz) router.push(`/courses/${cid}/quizzes`);
    }, [quiz, cid, router]);

    if (!quiz) return null;

    const questions: any[] = quiz.questions || [];
    const oneAtATime = quiz.settings?.oneQuestionAtATime ?? false;
    const totalQuestions = questions.length;
    const isLast = currentIdx === totalQuestions - 1;

    const handleAnswerChange = (questionId: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
        setLastSaved(new Date());
    };

    const goPrev = () => {
        setCurrentIdx((i) => Math.max(0, i - 1));
        setLastSaved(new Date());
    };

    const goNext = () => {
        setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1));
        setLastSaved(new Date());
    };

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const answerPayload = questions.map((q: any) => ({
                questionId: q._id,
                answer: answers[q._id],
            }));
            const attempt = await client.submitQuizAttempt(
                qid as string,
                currentUser?._id,
                answerPayload,
                startedAt
            );
            // Faculty lands straight on the specific-attempt page; student too,
            // but the attempts-history-list page wants them first. Per spec:
            // student goes to attempts/, faculty goes to attempts/[aid].
            if (currentUser?.role === "FACULTY") {
                router.push(`/courses/${cid}/quizzes/${qid}/attempts/${attempt._id}`);
            } else {
                router.push(`/courses/${cid}/quizzes/${qid}/attempts`);
            }
        } catch (err: any) {
            console.error("Failed to submit quiz:", err);
            alert(`Failed to submit quiz: ${err?.response?.data?.error || err.message}`);
            setSubmitting(false);
        }
    };

    const isFaculty = currentUser?.role === "FACULTY";

    return (
        <Container className="mt-3">
            <h2>{quiz.title}</h2>

            {isFaculty && (
                <div className="d-flex align-items-center gap-2 px-3 py-2 mb-2 rounded"
                     style={{ backgroundColor: "#f8d7da" }}
                >
                    <BsExclamationCircleFill className="text-danger" />
                    <span className="text-danger">
                        This is a preview of the published version of the quiz.
                    </span>
                </div>
            )}

            <div className="text-muted mb-2">
                Started: {formatDateTime(startedAt)}
            </div>

            <h4 className="mt-4">Quiz Instructions</h4>
            <p>{quiz.description}</p>
            <hr />

            {/* Body: either one question at a time or all at once */}
            {oneAtATime ? (
                <>
                    {questions[currentIdx] && (
                        <QuestionCard
                            question={questions[currentIdx]}
                            index={currentIdx}
                            answer={answers[questions[currentIdx]._id]}
                            onChange={(v) => handleAnswerChange(questions[currentIdx]._id, v)}
                        />
                    )}
                    <div className="d-flex justify-content-between mb-4">
                        <Button
                            variant="secondary"
                            onClick={goPrev}
                            disabled={currentIdx === 0}
                            style={{ visibility: currentIdx === 0 ? "hidden" : "visible" }}
                        >
                            Previous
                        </Button>
                        {isLast ? (
                            <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? "Submitting..." : "Submit"}
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={goNext}>
                                Next
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                questions.map((q: any, idx: number) => (
                    <QuestionCard
                        key={q._id}
                        question={q}
                        index={idx}
                        answer={answers[q._id]}
                        onChange={(v) => handleAnswerChange(q._id, v)}
                    />
                ))
            )}

            {/* Always-visible "Quiz saved at X | Submit Quiz" footer box */}
            <div className="border rounded p-3 bg-white d-flex justify-content-between align-items-center">
                <span className="text-muted">
                    Quiz saved at {formatTime(lastSaved)}
                </span>
                <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Quiz"}
                </Button>
            </div>
        </Container>
    );
}