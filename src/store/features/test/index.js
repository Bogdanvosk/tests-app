import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  currentTest: null,
  tests: [],
  error: null
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    getCurrentTestAction: state => {
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
    createTestAction: state => {
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
    updateTestAction: state => {
      state.isLoading = true;
    },
    updateTestSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        title: action.payload.title
      };
      state.error = null;
    },
    updateTestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteTestAction: state => {
      state.isLoading = true;
    },
    deleteTestSuccess: (state, action) => {
      state.isLoading = false;
      state.tests = state.tests.filter(t => t.id !== action.payload.id);
      state.currentTest = null;
      state.error = null;
    },
    deleteTestError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllTestsAction: state => {
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
    addNewQuestionAction: state => {
      state.isLoading = true;
    },
    addNewQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: [...state.currentTest.questions, action.payload]
      };
      state.error = null;
    },
    addNewQuestionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateQuestionAction: state => {
      state.isLoading = true;
    },
    updateQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.map(q =>
          q.id === action.payload.id ? action.payload : q
        )
      };
      state.error = null;
    },
    updateQuestionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteQuestionAction: state => {
      state.isLoading = true;
    },
    deleteQuestionSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.filter(q => q.id !== action.payload)
      };
      state.error = null;
    },
    deleteQuestionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addAnswerAction: state => {
      state.isLoading = true;
    },
    addAnswerSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.map(q => {
          if (q.id === action.payload.questionId) {
            q.answers = [...q.answers, action.payload.data];
          }
          return q;
        })
      };
      state.error = null;
    },
    addAnswerError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAnswerAction: state => {
      state.isLoading = true;
    },
    updateAnswerSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.map(q => {
          if (q.id === action.payload.questionId) {
            q.answers = q.answers.map(a => {
              if (a.id === action.payload.answerId) {
                return action.payload.newData;
              }
              return a;
            });
          }
          return q;
        })
      };
      state.error = null;
    },
    updateAnswerError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAnswerAction: state => {
      state.isLoading = true;
    },
    deleteAnswerSuccess: (state, action) => {
      state.isLoading = false;
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.map(q => {
          if (q.id === action.payload.questionId) {
            q.answers = q.answers.filter(a => a.id !== action.payload.answerId);
          }
          return q;
        })
      };
      state.error = null;
    },
    deleteAnswerError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePositionAction: state => {
      state.isLoading = true;
    },
    updatePositionSuccess: (state, action) => {
      state.currentTest = {
        ...state.currentTest,
        questions: state.currentTest.questions.map(q => {
          if (q.id === action.payload.questionId) {
            const currAnswer = q.answers.find(a => a.id === action.payload.answerId);

            const newAnswers = q.answers.filter(a => a.id !== action.payload.answerId);

            q.answers = [...newAnswers];
            q.answers.splice(action.payload.position, 0, currAnswer);
          }
          return q;
        })
      };
      state.isLoading = false;
    },
    updatePositionError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default testSlice.reducer;

export const {
  getCurrentTestAction,
  getCurrentTestSuccess,
  getCurrentTestError,
  createTestAction,
  createTestSuccess,
  createTestError,
  updateTestAction,
  updateTestSuccess,
  updateTestError,
  deleteTestAction,
  deleteTestSuccess,
  deleteTestError,
  getAllTestsAction,
  getAllTestsSuccess,
  getAllTestsError,
  addNewQuestionAction,
  addNewQuestionSuccess,
  addNewQuestionError,
  updateQuestionAction,
  updateQuestionSuccess,
  updateQuestionError,
  deleteQuestionAction,
  deleteQuestionSuccess,
  deleteQuestionError,
  addAnswerAction,
  addAnswerSuccess,
  addAnswerError,
  updateAnswerAction,
  updateAnswerSuccess,
  updateAnswerError,
  deleteAnswerAction,
  deleteAnswerSuccess,
  deleteAnswerError,
  updatePositionAction,
  updatePositionSuccess,
  updatePositionError
} = testSlice.actions;
