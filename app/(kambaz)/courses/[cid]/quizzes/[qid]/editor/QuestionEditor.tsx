/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { useState } from "react";
import { BsArrowRightCircleFill, BsTrash } from "react-icons/bs";

/* ---------- Arrow (correct-answer indicator) using Bootstrap Icons ---------- */
const Arrow = ({ active, onClick }: { active: boolean; onClick?: () => void }) => (
    <span
        role={onClick ? "button" : undefined}
        onClick={onClick}
        style={{
            cursor: onClick ? "pointer" : "default",
            color: active ? "#28a745" : "#adb5bd",
            display: "inline-flex",
            alignItems: "center",
            userSelect: "none",
        }}
        aria-label={active ? "Correct answer" : "Mark as correct answer"}
    >
        <BsArrowRightCircleFill size="1.25rem" />
    </span>
);

export default function QuestionEditor({
    initialQuestion,
    onUpdate,
    onCancel,
}: {initialQuestion: any;
    onUpdate: (question: any) => void;
    onCancel: () => void;
}) {
    const [draft, setDraft] = useState<any>(() => ({ ...initialQuestion }));

    const kind: string = draft.kind || "multiple_choice";

    const changeKind = (newKind: string) => {
        if (newKind === "multiple_choice") {
            setDraft({
                ...draft,
                kind: newKind,
                options: draft.options && draft.options.length > 0 ? draft.options : [],
                answer: null,
                answers: undefined,
            });
        } else if (newKind === "true_false") {
            setDraft({
                ...draft,
                kind: newKind,
                answer: null,
                options: undefined,
                answers: undefined,
            });
        } else if (newKind === "fill_in_the_blank") {
            setDraft({
                ...draft,
                kind: newKind,
                answers: draft.answers && draft.answers.length > 0 ? draft.answers : [],
                options: undefined,
                answer: undefined,
            });
        }
    };

    const handleUpdate = () => {
        if (kind === "multiple_choice") {
            if (draft.answer === null || draft.answer === undefined) {
                alert("Please select a correct answer before saving.");
                return;
            }
            if (!draft.options || draft.answer >= draft.options.length) {
                alert("Please select a correct answer before saving.");
                return;
            }
        } else if (kind === "true_false") {
            if (draft.answer !== true && draft.answer !== false) {
                alert("Please select a correct answer before saving.");
                return;
            }
        } else if (kind === "fill_in_the_blank") {
            if (!draft.answers || draft.answers.length === 0) {
                alert("Please enter at least one correct answer before saving.");
                return;
            }
        }

        onUpdate(draft);
    };

    /* ---------- Multiple choice helpers ---------- */
    const updateMcOption = (idx: number, value: string) => {
        const options = [...(draft.options || [])];
        options[idx] = value;
        setDraft({ ...draft, options });
    };

    const setMcCorrect = (idx: number) => {
        setDraft({ ...draft, answer: idx });
    };

    const addMcOption = () => {
        setDraft({ ...draft, options: [...(draft.options || []), ""] });
    };

    const removeMcOption = (idx: number) => {
        const options = [...(draft.options || [])];
        options.splice(idx, 1);
        let answer = draft.answer;
        if (answer === idx) answer = null;
        else if (typeof answer === "number" && answer > idx) answer = answer - 1;
        setDraft({ ...draft, options, answer });
    };

    /* ---------- Fill-in-the-blank helpers ---------- */
    const updateFibAnswer = (idx: number, value: string) => {
        const answers = [...(draft.answers || [])];
        answers[idx] = value;
        setDraft({ ...draft, answers });
    };

    const addFibAnswer = () => {
        setDraft({ ...draft, answers: [...(draft.answers || []), ""] });
    };

    const removeFibAnswer = (idx: number) => {
        const answers = [...(draft.answers || [])];
        answers.splice(idx, 1);
        setDraft({ ...draft, answers });
    };

    return (
        <div className="p-3 border rounded mb-3">
            {/* Header: title | type | points */}
            <div className="d-flex gap-2 mb-3 align-items-center">
                <FormControl
                    type="text"
                    placeholder="Question title"
                    value={draft.title || ""}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    style={{ flex: 1 }}
                />
                <FormSelect
                    value={kind}
                    onChange={(e) => changeKind(e.target.value)}
                    style={{ flex: 1 }}
                >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="fill_in_the_blank">Fill In the Blank</option>
                </FormSelect>
                <div className="d-flex align-items-center gap-2">
                    <span>pts:</span>
                    <FormControl
                        type="number"
                        value={draft.points ?? 0}
                        onChange={(e) => setDraft({ ...draft, points: Number(e.target.value) })}
                        style={{ width: "80px" }}
                    />
                </div>
            </div>

            {kind === "multiple_choice" && (
                <div className="mb-2 text-muted small">
                    Enter your question and multiple answers, then select the one correct answer.
                </div>
            )}
            {kind === "true_false" && (
                <div className="mb-2 text-muted small">
                    Enter your question text, then select if True or False is the correct answer.
                </div>
            )}
            {kind === "fill_in_the_blank" && (
                <div className="mb-2 text-muted small">
                    Enter your question text, then define all possible correct answers for the blank.
                    Students will see the question followed by a small text box to type their answer.
                </div>
            )}

            <div className="mb-3">
                <strong>Question:</strong>
                <FormControl
                    as="textarea"
                    rows={4}
                    value={draft.question || ""}
                    onChange={(e) => setDraft({ ...draft, question: e.target.value })}
                    className="mt-1"
                />
            </div>

            <div className="mb-3">
                <strong>Answers:</strong>

                {kind === "multiple_choice" && (
                    <div className="d-flex flex-column gap-2 mt-2">
                        {(draft.options || []).map((opt: string, idx: number) => {
                            const isCorrect = draft.answer === idx;
                            return (
                                <div key={idx} className="d-flex align-items-center gap-2">
                                    <Arrow active={isCorrect} onClick={() => setMcCorrect(idx)} />
                                    <span
                                        style={{
                                            minWidth: "120px",
                                            color: isCorrect ? "#28a745" : "inherit",
                                            fontWeight: isCorrect ? 600 : 400,
                                        }}
                                    >
                                        {isCorrect ? "Correct Answer" : "Possible Answer"}
                                    </span>
                                    <FormControl
                                        as="textarea"
                                        rows={1}
                                        value={opt}
                                        onChange={(e) => updateMcOption(idx, e.target.value)}
                                        style={{ flex: 1, resize: "vertical" }}
                                    />
                                    {(draft.options || []).length > 1 && (
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => removeMcOption(idx)}
                                            aria-label="Remove answer"
                                            title="Remove answer"
                                        >
                                            <BsTrash />
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                        <div className="text-end">
                            <Button variant="link" className="text-danger p-0" onClick={addMcOption}>
                                + Add Another Answer
                            </Button>
                        </div>
                    </div>
                )}

                {kind === "true_false" && (
                    <div className="d-flex flex-column gap-2 mt-2">
                        <div className="d-flex align-items-center gap-2">
                            <Arrow
                                active={draft.answer === true}
                                onClick={() => setDraft({ ...draft, answer: true })}
                            />
                            <span
                                style={{
                                    color: draft.answer === true ? "#28a745" : "inherit",
                                    fontWeight: draft.answer === true ? 600 : 400,
                                }}
                            >
                                True
                            </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <Arrow
                                active={draft.answer === false}
                                onClick={() => setDraft({ ...draft, answer: false })}
                            />
                            <span
                                style={{
                                    color: draft.answer === false ? "#28a745" : "inherit",
                                    fontWeight: draft.answer === false ? 600 : 400,
                                }}
                            >
                                False
                            </span>
                        </div>
                    </div>
                )}

                {kind === "fill_in_the_blank" && (
                    <div className="d-flex flex-column gap-2 mt-2">
                        {(draft.answers || []).map((ans: string, idx: number) => (
                            <div key={idx} className="d-flex align-items-center gap-2">
                                <span style={{ minWidth: "120px" }}>Possible Answer:</span>
                                <FormControl
                                    type="text"
                                    value={ans}
                                    onChange={(e) => updateFibAnswer(idx, e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                {(draft.answers || []).length > 1 && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeFibAnswer(idx)}
                                        aria-label="Remove answer"
                                        title="Remove answer"
                                    >
                                        <BsTrash />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <div className="text-end">
                            <Button variant="link" className="text-danger p-0" onClick={addFibAnswer}>
                                + Add Another Answer
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="d-flex gap-2">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleUpdate}>
                    Update Question
                </Button>
            </div>
        </div>
    );
}