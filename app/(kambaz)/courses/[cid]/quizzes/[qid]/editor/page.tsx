/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Tabs, Tab, Container } from "react-bootstrap";
import { redirect, useParams, useRouter } from "next/navigation";
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
    const router = useRouter();

    const onCreateQuizForCourse = async (publish = false) => {
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
        let savedQuiz;
        if (isNewQuiz) {
            savedQuiz = await client.createQuizForCourse(cid as string, quizToSave);
            dispatch(setQuizzes([...quizzes, savedQuiz]));
        } else {
            savedQuiz = await client.updateQuiz(quizToSave);
            const quizForStore = savedQuiz || quizToSave;
            const newQuizzes = quizzes.map((q: any) => q._id === quiz._id ? quizForStore : q);
            dispatch(setQuizzes(newQuizzes));
        }
        return savedQuiz;
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
                    onClick={async () => {
                        try {
                            const saved = await onCreateQuizForCourse();
                            if (saved && saved._id) {
                                router.push(`/courses/${cid}/quizzes/${saved._id}/details`);
                            } else {
                                router.push(`/courses/${cid}/quizzes`);
                            }
                        } catch (error) {
                            console.error("Error saving quiz:", error);
                            alert("An error occurred while saving the quiz. Please try again.");
                        }
                    }}> Save
                </Button>
                <Button variant="danger" size="lg" id="wd-save-publish-btn"
                    onClick={async () => {
                        try {
                            await onCreateQuizForCourse(true);
                            router.push(`/courses/${cid}/quizzes/`);
                        } catch (error) {
                            console.error("Error saving and publishing quiz:", error);
                            alert("An error occurred while saving and publishing the quiz. Please try again.");
                        }
                    }}> Save and Publish
                </Button>
            </div>
        </div>
    );
}