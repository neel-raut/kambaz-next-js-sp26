/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Tabs, Tab, Container } from "react-bootstrap";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import { setQuizzes } from "../../reducer";
import { RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../client";
import DetailsTab from "./DetailsTab";
import QuestionsTab, { stripTempIdsFromQuestions } from "./QuestionsTab";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const retrievedQuiz = quizzes.find((quiz: any) => quiz._id === qid && quiz.course === cid);
    const [quiz, setQuiz] = useState<any>(retrievedQuiz || null);
    const [newIds, setNewIds] = useState<string[]>([]);
    const dispatch = useDispatch();

    const onCreateQuizForCourse = async (redirectLink: string, publish = false) => {
        if (!cid) return;
        if (newIds.length > 0) {
            alert("You have unsaved questions. Please save/discard them before saving the quiz.");
            return;
        }
        const isNewQuiz = !quiz?._id;
        const defaultQuiz = {
            course: cid,
            title: "New Quiz",
            description: "",
            published: false,
            available: new Date().toISOString(),
            until: new Date().toISOString(),
            due: new Date().toISOString(),
            questions: [],
            questionCount: 0,
            points: 0,
            settings: {
                quizType: "graded_quiz",
                assignmentGroup: "quizzes",
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                maxAttempts: 1,
                showCorrectAnswers: "Immediately",
                accessCode: "",
                oneQuestionAtATime: false,
                webcamRequired: false,
                lockQuestionsAfterAnswering: false,
            }
        };
        const quizToSave = {
            ...defaultQuiz,
            ...quiz,
            ...(publish ? { published: true } : {}),
            questions: stripTempIdsFromQuestions(quiz?.questions || []),
        };
        if (isNewQuiz) {
            const createdQuiz = await client.createQuizForCourse(cid as string, quizToSave);
            dispatch(setQuizzes([...quizzes, createdQuiz]));
        } else {
            const updatedQuiz = await client.updateQuiz(quizToSave);
            const quizForStore = updatedQuiz || quizToSave;
            const newQuizzes = quizzes.map((q: any) => q._id === quiz._id ? quizForStore : q);
            dispatch(setQuizzes(newQuizzes));
        }
        redirect(redirectLink);
    };

    return (
        <div id="wd-quiz-editor">
            <Container className="mt-3">
                <Tabs
                    defaultActiveKey="details"
                    id="wd-quiz-editor-tabs"
                    className="mb-3 quiz-editor-tabs"
                >
                    <Tab eventKey="details" title="Details">
                        <DetailsTab quiz={quiz} setQuiz={setQuiz} />
                    </Tab>

                    <Tab eventKey="questions" title="Questions">
                        <QuestionsTab 
                            quiz={quiz} 
                            setQuiz={setQuiz}
                            newIds={newIds}
                            setNewIds={setNewIds}
                        />
                    </Tab>
                </Tabs>
            </Container>
            <hr />
            <div className="d-flex gap-1 justify-content-end">
                <Button variant="secondary" size="lg" id="wd-cancel-btn" onClick={() => redirect(`/courses/${cid}/quizzes`)}> Cancel </Button>
                <Button variant="danger" size="lg" id="wd-save-btn"
                    onClick={() => {
                        onCreateQuizForCourse(`/courses/${cid}/quizzes`)
                    }}> Save
                </Button>
                <Button variant="danger" size="lg" id="wd-save-publish-btn"
                    onClick={() => {
                        onCreateQuizForCourse(`/courses/${cid}/quizzes`, true);
                    }}> Save and Publish
                </Button>
            </div>
        </div>
    );
}