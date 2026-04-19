/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, FormCheck, FormControl } from "react-bootstrap";
import React, { useMemo, useState } from "react";
import { BsTrash } from "react-icons/bs";
import QuestionEditor from "./QuestionEditor";

const TEMP_ID_PREFIX = "tmp_";
const makeTempId = () => `${TEMP_ID_PREFIX}${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;

export const stripTempIdsFromQuestions = (questions: any[] = []): any[] => 
    questions.map((q) => {
        if (typeof q?._id === "string"
            && q._id.startsWith(TEMP_ID_PREFIX)) {
                const { _id, ...rest } = q;
                return { ...rest };
            }
        return q;
    });

export default function QuestionsTab(
    { quiz,
      setQuiz, 
      newIds, 
      setNewIds }: 
    { quiz: any;
      setQuiz: (q: any) => void;
      newIds: string[];
      setNewIds: React.Dispatch<React.SetStateAction<string[]>>; }
    ) {
    const questions: any[] = useMemo(() => quiz?.questions || [], [quiz?.questions]);
    const [editingIds, setEditingIds] = useState<string[]>([]);

    const totalPoints = useMemo(
        () => questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0),
        [questions]
    );

    const enterEditMode = (id: string) => {
        setEditingIds((prev) => [...prev, id]);
    };

    const exitEditMode = (id: string) => {
        setEditingIds((prev) => prev.filter((eid) => eid !== id));
    };

    const addNewQuestion = () => {
        const id = makeTempId();
        const newQuestion = {
            _id: id,
            kind: "multiple_choice",
            title: "",
            question: "",
            points: 0,
            options: [],
            answer: null,
        };
        setQuiz({ ...quiz, questions: [...questions, newQuestion] });
        setNewIds((prev) => [...prev, id]);
        enterEditMode(id);
    };

    const handleUpdateQuestion = (id: string, updated: any) => {
        setQuiz({ ...quiz, questions: questions.map((q) => q._id === id ? { ...updated, _id: id } : q), });
        exitEditMode(id);
        setNewIds((prev) => prev.filter((nid) => nid !== id));
    };

    const handleCancel = (id: string) => {
        if (newIds.includes(id)) {
            setQuiz({ ...quiz, questions: questions.filter((q) => q._id !== id) });
            setNewIds((prev) => prev.filter((nid) => nid !== id));
        }
        exitEditMode(id);
    };

    const handleDeleteQuestion = (id: string) => {
        setQuiz({ ...quiz, questions: questions.filter((q) => q._id !== id) });
        setNewIds((prev) => prev.filter((nid) => nid !== id));
        exitEditMode(id);
    };

    const renderPreview = (q: any) => {
        const kind = q.kind || "multiple_choice";
        const previewName = `preview-${q._id}`;
        return (
            <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>{q.title || "(Untitled question)"}</strong>
                        <div className="text-muted small">
                            {kind === "multiple_choice" && "Multiple Choice"}
                            {kind === "true_false" && "True/False"}
                            {kind === "fill_in_the_blank" && "Fill In The Blank"}
                        </div>
                    </div>
                    <span className="text-muted">{q.points ?? 0} pts</span>
                </div>

                <div>{q.question || <em className="text-muted">(No question text)</em>}</div>

                {kind === "multiple_choice" && (
                    <div className="d-flex flex-column gap-1 ms-2">
                        {(q.options || []).map((opt: string, idx: number) => {
                            const isCorrect = q.answer === idx;
                            return (
                                <div key={idx} className="d-flex align-items-center gap-2">
                                    <FormCheck
                                        type="radio"
                                        name={previewName}
                                        id={`${previewName}-option-${idx}`}
                                        label={opt || <em className="text-muted">(empty)</em>}
                                        checked={isCorrect}
                                        disabled
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}

                {kind === "true_false" && (
                    <div className="d-flex flex-column gap-1 ms-2">
                        <div className="d-flex align-items-center gap-2">
                            <FormCheck
                                type="radio"
                                name={previewName}
                                id={`${previewName}-true`}
                                label="True"
                                checked={q.answer === true}
                                disabled
                            />
                            <FormCheck
                                type="radio"
                                name={previewName}
                                id={`${previewName}-false`}
                                label="False"
                                checked={q.answer === false}
                                disabled
                            />
                        </div>
                    </div>
                )}

                {kind === "fill_in_the_blank" && (
                    <div className="ms-2" style={{ maxWidth: "400px" }}>
                        <FormControl
                            type="text"
                            placeholder="Answer goes here"
                            disabled
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="pt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="outline-secondary" onClick={addNewQuestion}>
                    + Add Question
                </Button>
                <div>
                    <strong>Points: {totalPoints}</strong>
                </div>
            </div>

            <div className="d-flex flex-column gap-2">
                {questions.map((q) => {
                    const isEditing = editingIds.includes(q._id);
                    if (isEditing) {
                        return (
                            <QuestionEditor
                                key={q._id}
                                initialQuestion={q}
                                onUpdate={(updated: any) => handleUpdateQuestion(q._id, updated)}
                                onCancel={() => handleCancel(q._id)}
                            />
                        );
                    }
                    return (
                        <div
                            key={q._id}
                            className="p-3 border rounded"
                            onClick={() => enterEditMode(q._id)}
                            style={{ cursor: "pointer" }}
                            role="button"
                            aria-label="Click to edit question"
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div style={{ flex: 1 }}>{renderPreview(q)}</div>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteQuestion(q._id);
                                    }}
                                    className="ms-2"
                                    aria-label="Delete question"
                                >
                                    <BsTrash />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};