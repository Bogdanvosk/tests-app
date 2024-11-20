import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addNewQuestionError,
  addNewQuestionSuccess,
  createTestError,
  createTestSuccess,
  deleteQuestionError,
  deleteQuestionSuccess,
  getAllTestsError,
  getAllTestsSuccess,
  getCurrentTestError,
  getCurrentTestSuccess,
  updateQuestionError,
  updateQuestionSuccess,
  updateTestError,
  updateTestSuccess,
} from '.';
import {
  addAnswersReq,
  addQuestionReq,
  createTestReq,
  deleteQuestionReq,
  getAllTestsReq,
  getCurrentTestReq,
  updateQuestionReq,
  updateTestReq,
} from '../../../api';
import {
  CREATE_TEST,
  GET_ALL_TESTS,
  GET_CURRENT_TEST,
  ADD_QUESTION_TYPE,
  DELETE_QUESTION_TYPE,
  UPDATE_TEST,
  UPDATE_QUESTION,
} from './constants';

export function* testSagaWatcher() {
  yield takeLatest(GET_CURRENT_TEST, getCurrentTestWorker);
  yield takeLatest(CREATE_TEST, createTestWorker);
  yield takeLatest(GET_ALL_TESTS, getAllTestsWorker);
  yield takeLatest(ADD_QUESTION_TYPE, addQuestionWorker);
  yield takeLatest(DELETE_QUESTION_TYPE, deleteQuestionWorker);
  yield takeLatest(UPDATE_TEST, updateTestWorker);
  yield takeLatest(UPDATE_QUESTION, updateQuestionWorker);
}

function* getCurrentTestWorker({ payload }) {
  try {
    const data = yield call(getCurrentTestReq, payload);
    yield put(getCurrentTestSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';
    yield put(getCurrentTestError(errText));
  }
}

function* createTestWorker({ payload }) {
  try {
    const data = yield call(createTestReq, payload);
    yield put(createTestSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';
    yield put(createTestError(errText));
  }
}

function* getAllTestsWorker() {
  try {
    const data = yield call(getAllTestsReq);
    yield put(getAllTestsSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';
    yield put(getAllTestsError(errText));
  }
}

function* addQuestionWorker({ payload }) {
  try {
    const { answers } = payload;
    const question = yield call(addQuestionReq, payload);
    yield put(addNewQuestionSuccess(question));

    const answersData = yield call(addAnswersReq, question.id, answers);
    yield put(addAnswersSuccess(answersData));
  } catch (error) {
    const errText = 'Server error';
    yield put(addNewQuestionError(errText));
  }
}

function* deleteQuestionWorker({ payload }) {
  try {
    yield call(deleteQuestionReq, payload);
    yield put(deleteQuestionSuccess(payload));
  } catch (error) {
    const errText = 'Server error';
    yield put(deleteQuestionError(errText));
  }
}

function* updateTestWorker({ payload }) {
  try {
    const data = yield call(updateTestReq, payload);
    yield put(updateTestSuccess(data));
  } catch (error) {
    const errText = 'Server error';
    yield put(updateTestError(errText));
  }
}

function* updateQuestionWorker({ payload }) {
  try {
    const data = yield call(updateQuestionReq, payload);
    yield put(updateQuestionSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';
    yield put(updateQuestionError(errText));
  }
}
