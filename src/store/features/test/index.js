import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  currentTest: null,
  error: null,
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getCurrentTestAction: (state) => {
      state.isLoading = true;
    },
    getCurrentTestSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = action.payload;
      state.error = null;
    },
    getCurrentTestError: (state, action) => {
      state.isLoading = false;
      state.currentTest = null;
      state.error = action.payload;
    },
  },
});

export default testSlice.reducer;

export const {
  getCurrentTestAction,
  getCurrentTestSuccess,
  getCurrentTestError,
} = testSlice.actions;
