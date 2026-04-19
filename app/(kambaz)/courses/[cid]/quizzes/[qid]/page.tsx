 "use client";
import { redirect, useParams } from "next/navigation";

export default function QuizPage() {
    const { cid, qid } = useParams();
    if (qid === "new") {
        redirect(`/courses/${cid}/quizzes/new/editor`);
    }
    redirect(`/courses/${cid}/quizzes/${qid}/details`);
}