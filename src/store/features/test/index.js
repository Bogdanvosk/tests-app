import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  currentTest: null,
  tests: [],
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
    createTestAction: (state) => {
      state.isLoading = true;
    },
    createTestSuccess: (state, action) => {
      state.isLoading = false;
      state.tests = [...state.tests, action.payload];
      state.error = null;
    },
    createTestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllTestsAction: (state) => {
      state.isLoading = true;
    },
    getAllTestsSuccess: (state, action) => {
      state.isLoading = false;
      state.tests = action.payload;
      state.error = null;
    },
    getAllTestsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default testSlice.reducer;

export const {
  getCurrentTestAction,
  getCurrentTestSuccess,
  getCurrentTestError,
  createTestAction,
  createTestSuccess,
  createTestError,
  getAllTestsAction,
  getAllTestsSuccess,
  getAllTestsError,
} = testSlice.actions;
