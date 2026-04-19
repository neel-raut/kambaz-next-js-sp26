/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import QuizzesControls from "./quizzesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import QuizListControlButtons from "./QuizListControlButtons";
import QuizControlButtons from "./QuizControlButtons";
import { useParams } from "next/navigation";
import { setQuizzes } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import { useEffect, useState } from "react";

function formatDate(dateString: string, time: string) {
  // Take in date as "YYYY-MM-DD" format, time as "HH:MM" format
  // Then conver to "Month Day at HH:MM am/pm" format
  const date = dateString.includes("T") ? new Date(dateString) : new Date(`${dateString}T${time}`);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${formattedDate} at ${formattedTime.toLowerCase()}`;
}

export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const [attemptsMap, setAttemptsMap] = useState<{ [quizId: string]: any }>({});
    const dispatch = useDispatch();

    const fetchQuizzes = async () => {
      let quizzes = await client.findQuizzesForCourse(cid as string);
      if (currentUser.role === "STUDENT") {
        quizzes = quizzes.filter((q: any) => q.published);
      }
      console.log(quizzes);
      dispatch(setQuizzes(quizzes));
    };

    const onRemoveQuiz = async (quizId: string) => {
      await client.deleteQuiz(quizId);
      dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
    };

    const onPublishQuiz = async (quizId: string) => {
        await client.publishQuiz(quizId);
        fetchQuizzes();
    };

    const onUnpublishQuiz = async (quizId: string) => {
        await client.unpublishQuiz(quizId);
        fetchQuizzes();
    };

    const onCopyQuiz = async (quizId: string, targetCourseId: string) => {
        await client.copyQuiz(quizId, targetCourseId);
        if (targetCourseId === cid) {
            fetchQuizzes();
        }
    };

    useEffect(() => {
      fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let mounted = true;
        if (!currentUser?._id || !quizzes) return;
        (async () => {
            const entries = await Promise.all(
                quizzes.map(async(q: any) => {
                    try {
                        const attempt = await client.findLatestAttemptForQuizByUser(q._id, currentUser._id);
                        return [q._id, attempt ?? null] as const;
                    } catch {
                        return [q._id, null] as const;
                    }
                })
            );
            if (mounted) setAttemptsMap(Object.fromEntries(entries));
        })();
        return () => { mounted = false; };
    }, [quizzes, currentUser?._id]);

    return (
      <div id="wd-quizzes">
        <QuizzesControls /><br />

        <ListGroup className="rounded-0" id="wd-quizzes-list">
          <ListGroupItem className="wd-quiz-title p-0 mb-5 fs-5">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> QUIZZES <QuizListControlButtons />
            </div>
            <ListGroup className="wd-quizzes rounded-0">
              {quizzes
                .map((quiz: any) => (
                  <ListGroupItem className="wd-quiz d-flex align-items-center" key={quiz._id}>
                    <BsGripVertical className="me-2 fs-3 flex-shrink-0 me-1" />
                    <BsFileEarmarkText className="me-4 fs-3 text-success flex-shrink-0" />
                    <div className="d-flex flex-column flex-grow-1">
                      <Link className="text-dark fw-bold text-decoration-none" href={`/courses/${cid}/quizzes/${quiz._id}`}>
                        {quiz.title}
                      </Link>
                      <div className="text-muted small d-flex flex-wrap gap-1 fs-6">
                        <span><strong>
                            {(() => {
                                const now = new Date();
                                const parseDt = (s?: string, defaultTime = "00:00") => {
                                    if (!s) return null;
                                    const iso = s.includes("T") ? s : `${s}T${defaultTime}`;
                                    const d = new Date(iso);
                                    return isNaN(d.getTime()) ? null : d;
                                };
                                const availableDt = parseDt(quiz.available, "00:00");
                                const untilDt = parseDt(quiz.until, "23:59");

                                if (untilDt && now > untilDt) return "Closed";
                                if (availableDt && now < availableDt) return `Not available until ${formatDate(quiz.available, "00:00")}`;
                                return "Available";
                            })()}
                        </strong></span>
                        |
                        <span><strong>Due</strong> {formatDate(quiz.due, "23:59")} |</span>
                        <span>{quiz.points} pts |</span>
                        <span>{quiz.questionCount} questions </span>
                        {currentUser.role == "STUDENT" && attemptsMap[quiz._id] && (
                            <>
                                |
                                <span>
                                    Latest score: {attemptsMap[quiz._id].score} pts
                                </span>
                            </>
                        )}
                      </div>
                    </div>
                    <QuizControlButtons
                      quiz={quiz}
                      onDelete={(quizId) => {
                        onRemoveQuiz(quizId);
                      }}
                      onPublish={(quizId) => {
                        onPublishQuiz(quizId);
                      }}
                      onUnpublish={(quizId) => {
                        onUnpublishQuiz(quizId);
                      }}
                      onCopy={(quizId, targetCourseId) => {
                        onCopyQuiz(quizId, targetCourseId);
                      }} />
                  </ListGroupItem>
                  ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
  );}