/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment = { ...enrollment, _id: uuidv4() };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
                (enrollment: any) => enrollment._id !== enrollmentId
            );
        },
        setEnrollments: (state, { payload: enrollments }) => {
            state.enrollments = enrollments;
        },
    },
});

export const { addEnrollment, deleteEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;