/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Container, FormCheck, FormControl } from "react-bootstrap";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import * as client from "../../../client";

const formatDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString(undefined, {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit",
    });
};

const durationMinutes = (startISO?: string, endISO?: string): number => {
    if (!startISO || !endISO) return 0;
    const start = new Date(startISO).getTime();
    const end = new Date(endISO).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    return Math.ceil((end - start) / 60000);
};

/**
 * Decides whether to reveal correct answers for the given quiz at this moment.
 * Driven by quiz.settings.showCorrectAnswers and the current time vs. due date.
 */
const shouldReveal = (quiz: any): boolean => {
    const policy = quiz?.settings?.showCorrectAnswers;
    if (policy === "Immediately") return true;
    if (policy === "After Due") {
        if (!quiz?.due) return false;
        return new Date() > new Date(quiz.due);
    }
    return false; // "Never" or anything else
};

/**
 * Shows a graded question. When `reveal` is true we highlight the correct
 * choice green, and a wrong user choice red (MC / T-F). For fill-in-the-blank,
 * whether the typed answer matched is already captured in the attempt's
 * per-question `correct` flag, so we color the input box accordingly.
 */
const GradedQuestionCard = ({
    question,
    index,
    userAnswer,
    pointsEarned,
    correct,
    reveal,
}: {
    question: any;
    index: number;
    userAnswer: any;
    pointsEarned: number;
    correct: boolean;
    reveal: boolean;
}) => {
    const inputName = `q-${question._id}`;

    const labelStyle = (isCorrectChoice: boolean, isUserChoice: boolean) => {
        if (!reveal) return undefined;
        if (isCorrectChoice) return { color: "#28a745", fontWeight: 600 };
        if (isUserChoice && !isCorrectChoice) return { color: "#dc3545", fontWeight: 600 };
        return undefined;
    };

    return (
        <div className="border rounded mb-4">
            <div className="bg-light px-3 py-2 d-flex justify-content-between align-items-center">
                <strong>Question {index + 1}</strong>
                <span className="text-muted">
                    {pointsEarned} / {question.points ?? 0} pts
                </span>
            </div>
            <div className="bg-white p-3">
                <p>{question.question}</p>
                <hr />
                {question.kind === "multiple_choice" && (
                    <div className="d-flex flex-column gap-2">
                        {(question.options || []).map((opt: string, idx: number) => {
                            const isCorrect = question.answer === idx;
                            const isUser = userAnswer === idx;
                            return (
                                <FormCheck
                                    key={idx}
                                    type="radio"
                                    name={inputName}
                                    id={`${inputName}-${idx}`}
                                    label={opt}
                                    checked={isUser}
                                    disabled
                                    readOnly
                                    style={labelStyle(isCorrect, isUser)}
                                />
                            );
                        })}
                    </div>
                )}
                {question.kind === "true_false" && (
                    <div className="d-flex flex-column gap-2">
                        {[true, false].map((val) => {
                            const label = val ? "True" : "False";
                            const isCorrect = question.answer === val;
                            const isUser = userAnswer === val;
                            return (
                                <FormCheck
                                    key={label}
                                    type="radio"
                                    name={inputName}
                                    id={`${inputName}-${label}`}
                                    label={label}
                                    checked={isUser}
                                    disabled
                                    readOnly
                                    style={labelStyle(isCorrect, isUser)}
                                />
                            );
                        })}
                    </div>
                )}
                {question.kind === "fill_in_the_blank" && (
                    <FormControl
                        type="text"
                        value={userAnswer ?? ""}
                        disabled
                        readOnly
                        style={{
                            maxWidth: "400px",
                            // Color the input box green if correct, red if not, when reveal is on
                            ...(reveal
                                ? correct
                                    ? { borderColor: "#28a745", color: "#28a745" }
                                    : { borderColor: "#dc3545", color: "#dc3545" }
                                : {}),
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default function AttemptResults() {
    const { cid, qid, aid } = useParams();
    const router = useRouter();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => (state as any).accountReducer || {});
    const quiz = quizzes.find((q: any) => q._id === qid && q.course === cid) as any;

    const [attempt, setAttempt] = useState<any>(null);
    const [allAttempts, setAllAttempts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const isFaculty = currentUser?.role === "FACULTY";

    useEffect(() => {
        let alive = true;
        const load = async () => {
            try {
                const a = await client.findAttemptById(aid as string);
                if (!alive) return;
                setAttempt(a);
                // Load sibling attempts too (for the student Quiz Submissions list
                // and attempts-remaining math). Faculty doesn't see this section
                // but fetching is cheap and keeps the code simpler.
                if (qid && currentUser?._id) {
                    const all = await client.findAttemptsForQuizByUser(qid as string, currentUser._id);
                    if (alive) setAllAttempts(Array.isArray(all) ? all : []);
                }
            } catch (err) {
                console.error("Failed to load attempt:", err);
            } finally {
                if (alive) setLoading(false);
            }
        };
        load();
        return () => { alive = false; };
    }, [aid, qid, currentUser?._id]);

    const reveal = useMemo(() => shouldReveal(quiz), [quiz]);

    // Map from questionId -> the attempt's per-question answer record, so we
    // can look up the user's choice and whether it was graded correct.
    const answerByQuestion = useMemo(() => {
        const map: Record<string, any> = {};
        (attempt?.answers || []).forEach((a: any) => { map[a.questionId] = a; });
        return map;
    }, [attempt]);

    // Handles faculty "Back to Quiz" — delete the preview attempt first, then
    // navigate. Delete happens best-effort; we navigate regardless so the user
    // isn't stuck if the delete call fails.
    const handleFacultyBack = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await client.deleteAttempt(aid as string);
        } catch (err) {
            console.error("Failed to delete preview attempt:", err);
        }
        router.push(`/courses/${cid}/quizzes/${qid}/details`);
    };

    if (!quiz) return <Container className="mt-3">Quiz not found.</Container>;
    if (loading) return <Container className="mt-3">Loading...</Container>;
    if (!attempt) return <Container className="mt-3">Attempt not found.</Container>;

    const totalPoints = quiz.points ?? 0;
    const userFullName = `${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}`.trim();
    const questions: any[] = quiz.questions || [];

    // Attempts remaining — mirrors the DAO's createAttempt gating logic.
    const attemptsUsed = allAttempts.length;
    const maxAttempts = quiz.settings?.multipleAttempts
        ? (quiz.settings?.maxAttempts ?? 1)
        : 1;
    const attemptsLeft = Math.max(0, maxAttempts - attemptsUsed);

    const latestAttemptNumber = allAttempts.reduce(
        (m, a) => Math.max(m, a.attemptNumber || 0),
        0
    );
    const restrictToLatest = quiz.settings?.viewLastAttemptOnly;

    return (
        <Container className="mt-3">
            <h2>{quiz.title} Results for {userFullName}</h2>
            <div className="mt-2">
                Score for this quiz: {attempt.score ?? 0} out of {totalPoints}
            </div>
            <div>Submitted {formatDate(attempt.submittedAt)}</div>
            <div>
                This attempt took {durationMinutes(attempt.startedAt, attempt.submittedAt)} minutes.
            </div>

            <hr />

            {questions.map((q: any, idx: number) => {
                const ans = answerByQuestion[q._id] || {};
                return (
                    <GradedQuestionCard
                        key={q._id}
                        question={q}
                        index={idx}
                        userAnswer={ans.answer}
                        pointsEarned={ans.pointsEarned ?? 0}
                        correct={!!ans.correct}
                        reveal={reveal}
                    />
                );
            })}

            <div className="text-center my-4">
                <strong>Quiz Score: {attempt.score ?? 0} out of {totalPoints}</strong>
            </div>

            {/* Student-only: Quiz Submissions list + attempts-left text */}
            {!isFaculty && (
                <>
                    <h4>Quiz Submissions</h4>
                    <hr />
                    <div className="d-flex flex-column gap-1 mb-3">
                        {allAttempts.map((a) => {
                            const isLatest = a.attemptNumber === latestAttemptNumber;
                            const linkDisabled = restrictToLatest && !isLatest;
                            if (linkDisabled) {
                                return (
                                    <span key={a._id} className="text-muted">
                                        Attempt {a.attemptNumber}: {a.score ?? 0}
                                    </span>
                                );
                            }
                            return (
                                <Link
                                    key={a._id}
                                    href={`/courses/${cid}/quizzes/${qid}/attempts/${a._id}`}
                                    className="text-danger"
                                >
                                    Attempt {a.attemptNumber}: {a.score ?? 0}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="mb-3">
                        {userFullName || "User"} has {attemptsLeft === 0 ? "no" : attemptsLeft} attempts left
                    </div>
                </>
            )}

            {/* Back link — faculty variant deletes the preview attempt first */}
            {isFaculty ? (
                <a href="#" onClick={handleFacultyBack} className="text-danger">← Back to Quiz</a>
            ) : (
                <Link href={`/courses/${cid}/quizzes/${qid}/details`} className="text-danger">
                    ← Back to Quiz
                </Link>
            )}
        </Container>
    );
}