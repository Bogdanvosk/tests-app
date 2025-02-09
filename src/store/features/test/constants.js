import {
  addAnswerAction,
  addNewQuestionAction,
  createTestAction,
  deleteAnswerAction,
  deleteQuestionAction,
  deleteTestAction,
  getAllTestsAction,
  getCurrentTestAction,
  updateAnswerAction,
  updatePositionAction,
  updateQuestionAction,
  updateTestAction
} from '.';

export const GET_CURRENT_TEST = getCurrentTestAction.type;
export const CREATE_TEST = createTestAction.type;
export const UPDATE_TEST = updateTestAction.type;
export const DELETE_TEST = deleteTestAction.type;
export const GET_ALL_TESTS = getAllTestsAction.type;

export const ADD_QUESTION = addNewQuestionAction.type;
export const UPDATE_QUESTION = updateQuestionAction.type;
export const DELETE_QUESTION = deleteQuestionAction.type;

export const ADD_ANSWER = addAnswerAction.type;
export const UPDATE_ANSWER = updateAnswerAction.type;
export const DELETE_ANSWER = deleteAnswerAction.type;
export const UPDATE_POSITION = updatePositionAction.type;
