/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Col, Form, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";

export default function DetailsTab({ quiz, setQuiz }: { quiz: any; setQuiz: (q: any) => void; }) {
    const settings = quiz?.settings || {};
    const hasMultipleAttempts = quiz?.settings?.multipleAttempts === true;

    const hasSetting = (key: string) =>
        settings[key] !== undefined;

    const toggleSetting = (key: string, defaultValue: any) => {
        const exists = hasSetting(key);

        if (exists) {
            const { [key]: _, ...rest } = settings;
            setQuiz({
                ...quiz,
                settings: rest,
            });
        } else {
            setQuiz({
                ...quiz,
                settings: {
                    ...settings,
                    [key]: defaultValue,
                },
            });
        }
    };

    const updateSetting = (key: string, value: any) => {
        setQuiz({
            ...quiz,
            settings: {
                ...settings,
                [key]: value,
            },
        });
    };

    const toInputDateTime = (isoString?: string) => {
        if (!isoString) return "";

        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hour}:${minute}`;
    };

    const fromInputDateTime = (value: string) => {
        if (!value) return null;
        return new Date(value).toISOString();
    };

    return (
        <Form className="d-flex flex-column gap-4 pt-3 py-4">
            <div>
                <FormLabel htmlFor="wd-name">Quiz Name</FormLabel>
                <FormControl id="wd-name" type="text" value={quiz?.title || ""}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                />
            </div>

            <div>
                <FormLabel htmlFor="wd-description">Description</FormLabel>
                <FormControl
                    as="textarea"
                    id="wd-description"
                    rows={10}
                    value={quiz?.description || ""}
                    onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                />
            </div>

            <div className="d-flex flex-column gap-4">
                <Row className="d-flex w-100">
                    <FormLabel xs={4} column htmlFor="wd-quiz-type" className="text-end">Quiz Type</FormLabel>
                    <Col xs={8}>
                        <FormSelect
                            id="wd-quiz-type"
                            value={quiz?.settings?.quizType ?? "graded_quiz"}
                            onChange={(e) =>
                                updateSetting("quizType", e.target.value)
                            }
                        >
                            <option value={"graded_quiz"}>Graded Quiz</option>
                            <option value={"practice_quiz"}>Practice Quiz</option>
                            <option value={"graded_survey"}>Graded Survey</option>
                            <option value={"practice_survey"}>Practice Survey</option>
                        </FormSelect>
                    </Col>
                </Row>

                <Row className="d-flex w-100">
                    <FormLabel xs={4} column htmlFor="wd-assignment-group" className="text-end">Assignment Group</FormLabel>
                    <Col xs={8}>
                        <FormSelect
                            id="wd-assignment-group"
                            value={quiz?.settings?.assignmentGroup ?? "quizzes"}
                            onChange={(e) =>
                                updateSetting("assignmentGroup", e.target.value)
                            }
                        >
                            <option value={"quizzes"}>Quizzes</option>
                            <option value={"exams"}>Exams</option>
                            <option value={"assignments"}>Assignments</option>
                            <option value={"projects"}>Projects</option>
                        </FormSelect>
                    </Col>
                </Row>

                <Row className="d-flex w-100">
                    <FormLabel xs={4} column htmlFor="wd-show-correct-answers" className="text-end">Show Correct Answers</FormLabel>
                    <Col xs={8}>
                        <FormSelect
                            id="wd-show-correct-answers"
                            value={quiz?.settings?.showCorrectAnswers ?? "Immediately"}
                            onChange={(e) =>
                                updateSetting("showCorrectAnswers", e.target.value)
                            }
                        >
                            <option value={"Never"}>Never</option>
                            <option value={"Immediately"}>Immediately</option>
                            <option value={"After Due"}>After Due</option>
                        </FormSelect>
                    </Col>
                </Row>

                <Row className="d-flex w-100 justify-content-end">
                    <Col xs={8}>
                        <span><strong>Options</strong></span>
                        <FormCheck
                            type="checkbox"
                            name="check-shuffle-answers"
                            id="wd-chkbox-shuffle-answers"
                            label="Shuffle Answers"
                            checked={quiz?.settings?.shuffleAnswers ?? true}
                            onChange={(e) =>
                                updateSetting("shuffleAnswers", e.target.checked)
                            }
                        />

                        <div className="d-flex align-items-center gap-2">
                            <FormCheck
                                type="checkbox"
                                name="check-time-limit"
                                id="wd-chkbox-time-limit"
                                label="Time Limit"
                                checked={hasSetting("timeLimit")}
                                onChange={() => toggleSetting("timeLimit", 20)}
                            />

                            <FormControl
                                type="number"
                                disabled={!hasSetting("timeLimit")}
                                value={hasSetting("timeLimit") ? quiz.settings.timeLimit : ""}
                                onChange={(e) =>
                                    updateSetting("timeLimit", Number(e.target.value))
                                }
                            />
                            <span>Minutes</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <FormCheck
                                type="checkbox"
                                name="check-multiple-attempts"
                                id="wd-chkbox-multiple-attempts"
                                label="Multiple Attempts"
                                checked={hasMultipleAttempts}
                                onChange={(e) => {
                                    const checked = e.target.checked;

                                    setQuiz({
                                        ...quiz,
                                        settings: {
                                            ...settings,
                                            multipleAttempts: checked,
                                            maxAttempts: checked
                                                ? settings.maxAttempts ?? 1
                                                : 1,
                                        },
                                    });
                                }}
                            />

                            <FormControl
                                type="number"
                                disabled={!hasMultipleAttempts}
                                value={hasMultipleAttempts ? quiz.settings.maxAttempts : 1}
                                onChange={(e) =>
                                    updateSetting("maxAttempts", Number(e.target.value))
                                }
                            />
                            <span>Attempts</span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <FormCheck
                                type="checkbox"
                                name="check-access-code"
                                id="wd-chkbox-access-code"
                                label="Access Code"
                                checked={!!settings.accessCode}
                                onChange={(e) => {
                                    const checked = e.target.checked;

                                    if (checked) {
                                        updateSetting("accessCode", "");
                                    } else {
                                        const { accessCode, ...rest } = settings;
                                        setQuiz({
                                            ...quiz,
                                            settings: rest,
                                        });
                                    }
                                }}
                            />

                            <FormControl
                                type="text"
                                placeholder="Enter Access Code"
                                disabled={!hasSetting("accessCode")}
                                value={hasSetting("accessCode") ? quiz.settings.accessCode : ""}
                                onChange={(e) =>
                                    updateSetting("accessCode", e.target.value)
                                }
                            />
                        </div>

                        <FormCheck
                            type="checkbox"
                            name="check-one-question-at-a-time"
                            id="wd-chkbox-one-question-at-a-time"
                            label="One Question At A Time"
                            checked={quiz?.settings?.oneQuestionAtATime ?? true}
                            onChange={(e) =>
                                updateSetting("oneQuestionAtATime", e.target.checked)
                            }
                        />

                        <FormCheck
                            type="checkbox"
                            name="check-webcam-required"
                            id="wd-chkbox-webcam-required"
                            label="Webcam Required"
                            checked={quiz?.settings?.webcamRequired ?? false}
                            onChange={(e) =>
                                updateSetting("webcamRequired", e.target.checked)
                            }
                        />

                        <FormCheck
                            type="checkbox"
                            name="check-lock-questions-after-answering"
                            id="wd-chkbox-lock-questions-after-answering"
                            label="Lock Questions After Answering"
                            checked={quiz?.settings?.lockQuestionsAfterAnswering ?? false}
                            onChange={(e) =>
                                updateSetting("lockQuestionsAfterAnswering", e.target.checked)
                            }
                        />

                        <FormCheck
                            type="checkbox"
                            name="check-view-last-attempt-only"
                            id="wd-chkbox-view-last-attempt-only"
                            label="View Last Attempt Only"
                            checked={quiz?.settings?.viewLastAttemptOnly ?? false}
                            onChange={(e) =>
                                updateSetting("viewLastAttemptOnly", e.target.checked)
                            }
                        />
                    </Col>
                </Row>

                <Row className="d-flex w-100">
                    <FormLabel xs={4} column className="text-end">Assign</FormLabel>
                    <Col xs={8}>
                        <div className="p-3 border rounded d-flex flex-column gap-3">
                            <div>
                                <span className="fs-6"><strong>Assign to</strong></span>
                                <FormSelect id="wd-submission-type">
                                    <option value="Everyone" defaultChecked>Everyone</option>
                                </FormSelect>
                            </div>

                            <div>
                                <span className="fs-6"><strong>Due</strong></span>
                                <InputGroup>
                                    <FormControl type="datetime-local" value={toInputDateTime(quiz?.due)}
                                        onChange={(e) => {
                                            let val = e.target.value;

                                            if (val && !val.includes("T")) {
                                                val = `${val}T23:59`;
                                            }
                                            setQuiz({ ...quiz, due: fromInputDateTime(val) });
                                        }}
                                    />
                                </InputGroup>
                            </div>

                            <div>
                                <Row>
                                    <Col xs={12} sm={6}>
                                        <span className="fs-6"><strong>Available from</strong></span>
                                        <InputGroup>
                                            <FormControl type="datetime-local" value={toInputDateTime(quiz?.available)}
                                                onChange={(e) => {
                                                    let val = e.target.value;

                                                    if (val && !val.includes("T")) {
                                                        val = `${val}T00:00`;
                                                    }

                                                    setQuiz({ ...quiz, available: fromInputDateTime(val) });
                                                }}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <span className="fs-6"><strong>Until</strong></span>
                                        <InputGroup>
                                            <FormControl type="datetime-local" value={toInputDateTime(quiz?.until)}
                                                onChange={(e) => {
                                                    let val = e.target.value;

                                                    if (val && !val.includes("T")) {
                                                        val = `${val}T23:59`;
                                                    }

                                                    setQuiz({ ...quiz, until: fromInputDateTime(val) });
                                                }}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Form>
    );
};