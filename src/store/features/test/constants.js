import {
  addAnswerAction,
  addNewQuestionAction,
  createTestAction,
  deleteAnswerAction,
  deleteQuestionAction,
  getAllTestsAction,
  getCurrentTestAction,
  updateQuestionAction,
  updateTestAction,
} from '.';

export const GET_CURRENT_TEST = getCurrentTestAction.type;
export const CREATE_TEST = createTestAction.type;
export const GET_ALL_TESTS = getAllTestsAction.type;
export const UPDATE_TEST = updateTestAction.type;
export const ADD_QUESTION = addNewQuestionAction.type;
export const DELETE_QUESTION = deleteQuestionAction.type;
export const UPDATE_QUESTION = updateQuestionAction.type;
export const ADD_ANSWER = addAnswerAction.type;
export const DELETE_ANSWER = deleteAnswerAction.type;
