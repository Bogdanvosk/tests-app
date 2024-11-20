import {
  addNewQuestionAction,
  createTestAction,
  deleteQuestionAction,
  getAllTestsAction,
  getCurrentTestAction,
  updateQuestionAction,
  updateTestAction,
} from '.';

export const GET_CURRENT_TEST = getCurrentTestAction.type;
export const CREATE_TEST = createTestAction.type;
export const GET_ALL_TESTS = getAllTestsAction.type;
export const ADD_QUESTION_TYPE = addNewQuestionAction.type;
export const DELETE_QUESTION_TYPE = deleteQuestionAction.type;
export const UPDATE_TEST = updateTestAction.type;
export const UPDATE_QUESTION = updateQuestionAction.type;
