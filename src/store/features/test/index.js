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
      state.currentTest = action.payload;
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
    addNewQuestionAction: (state) => {
      state.isLoading = true;
    },
    addNewQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: [...state.currentTest.questions, action.payload],
      };
      state.error = null;
    },
    addNewQuestionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addAnswersAction: (state) => {
      state.isLoading = true;
    },
    addAnswersSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        answers: action.payload,
      };
      state.error = null;
    },
    addAnswersError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteQuestionAction: (state) => {
      state.isLoading = true;
    },
    deleteQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.filter(
          (q) => q.id !== action.payload
        ),
      };
      state.error = null;
    },
    deleteQuestionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTestAction: (state) => {
      state.isLoading = true;
    },
    updateTestSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        title: action.payload.title,
      };
      state.error = null;
    },
    updateTestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateQuestionAction: (state) => {
      state.isLoading = true;
    },
    updateQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };
      state.error = null;
    },
    updateQuestionError: (state, action) => {
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
  addNewQuestionAction,
  addNewQuestionSuccess,
  addNewQuestionError,
  addAnswersAction,
  addAnswersSuccess,
  addAnswersError,
  deleteQuestionAction,
  deleteQuestionSuccess,
  deleteQuestionError,
  updateTestAction,
  updateTestSuccess,
  updateTestError,
  updateQuestionAction,
  updateQuestionSuccess,
  updateQuestionError,
} = testSlice.actions;
