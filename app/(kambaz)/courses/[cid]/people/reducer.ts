 import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  people: [],
};
const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },
  },
});
export const { setPeople } =
  peopleSlice.actions;
export default peopleSlice.reducer;