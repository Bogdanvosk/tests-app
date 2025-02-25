import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  addAnswerError,
  addAnswerSuccess,
  addNewQuestionError,
  addNewQuestionSuccess,
  createTestError,
  createTestSuccess,
  deleteAnswerError,
  deleteAnswerSuccess,
  deleteQuestionError,
  deleteQuestionSuccess,
  deleteTestError,
  deleteTestSuccess,
  getAllTestsError,
  getAllTestsSuccess,
  getCurrentTestError,
  getCurrentTestSuccess,
  updateAnswerError,
  updateAnswerSuccess,
  updatePositionError,
  updatePositionSuccess,
  updateQuestionError,
  updateQuestionSuccess,
  updateTestError,
  updateTestSuccess
} from '.';
import {
  addAnswerReq,
  addQuestionReq,
  createTestReq,
  deleteAnswerReq,
  deleteQuestionReq,
  deleteTestReq,
  getAllTestsReq,
  getCurrentTestReq,
  updateAnswerReq,
  updatePositionReq,
  updateQuestionReq,
  updateTestReq
} from '@/api';
import {
  CREATE_TEST,
  GET_CURRENT_TEST,
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_TEST,
  UPDATE_QUESTION,
  DELETE_ANSWER,
  ADD_ANSWER,
  UPDATE_ANSWER,
  UPDATE_POSITION,
  DELETE_TEST,
  GET_ALL_TESTS
} from './constants';

export function* testSagaWatcher() {
  yield takeLatest(GET_ALL_TESTS, getAllTestsWorker);
  yield takeLatest(GET_CURRENT_TEST, getCurrentTestWorker);
  yield takeLatest(CREATE_TEST, createTestWorker);
  yield takeLatest(UPDATE_TEST, updateTestWorker);
  yield takeLatest(DELETE_TEST, deleteTestWorker);

  yield takeLatest(ADD_QUESTION, addQuestionWorker);
  yield takeLatest(UPDATE_QUESTION, updateQuestionWorker);
  yield takeLatest(DELETE_QUESTION, deleteQuestionWorker);

  yield takeLatest(ADD_ANSWER, addAnswerWorker);
  yield takeEvery(UPDATE_ANSWER, updateAnswerWorker);
  yield takeLatest(DELETE_ANSWER, deleteAnswerWorker);
  yield takeLatest(UPDATE_POSITION, updatePositionWorker);
}

function* getAllTestsWorker({ payload }) {
  try {
    const data = yield call(getAllTestsReq, payload);
    yield put(getAllTestsSuccess(data));
  } catch (error) {
    yield put(getAllTestsError(error));
  }
}

function* getCurrentTestWorker({ payload }) {
  try {
    const data = yield call(getCurrentTestReq, payload);
    yield put(getCurrentTestSuccess(data));
  } catch (error) {
    yield put(getCurrentTestError(error));
  }
}

function* createTestWorker({ payload }) {
  try {
    const data = yield call(createTestReq, payload);
    yield put(createTestSuccess(data));
  } catch (error) {
    yield put(createTestError(error));
  }
}
function* updateTestWorker({ payload }) {
  try {
    const data = yield call(updateTestReq, payload);
    yield put(updateTestSuccess(data));
  } catch (error) {
    yield put(updateTestError(error));
  }
}

function* deleteTestWorker({ payload }) {
  try {
    const data = yield call(deleteTestReq, payload);
    yield put(deleteTestSuccess(data));
  } catch (error) {
    yield put(deleteTestError(error));
  }
}

function* addQuestionWorker({ payload }) {
  try {
    const question = yield call(addQuestionReq, payload);
    yield put(addNewQuestionSuccess(question));
  } catch (error) {
    yield put(addNewQuestionError(error));
  }
}

function* deleteQuestionWorker({ payload }) {
  try {
    yield call(deleteQuestionReq, payload);
    yield put(deleteQuestionSuccess(payload));
  } catch (error) {
    yield put(deleteQuestionError(error));
  }
}

function* updateQuestionWorker({ payload }) {
  try {
    const data = yield call(updateQuestionReq, payload);
    yield put(updateQuestionSuccess(data));
  } catch (error) {
    yield put(updateQuestionError(error));
  }
}

function* addAnswerWorker({ payload }) {
  try {
    const data = yield call(addAnswerReq, payload);
    yield put(addAnswerSuccess(data));
  } catch (error) {
    yield put(addAnswerError(error));
  }
}

function* updateAnswerWorker({ payload }) {
  try {
    yield call(updateAnswerReq, payload);
    yield put(updateAnswerSuccess(payload));
  } catch (error) {
    yield put(updateAnswerError(error));
  }
}

function* deleteAnswerWorker({ payload }) {
  try {
    yield call(deleteAnswerReq, payload);
    yield put(deleteAnswerSuccess(payload));
  } catch (error) {
    yield put(deleteAnswerError(error));
  }
}

function* updatePositionWorker({ payload }) {
  try {
    yield call(updatePositionReq, payload);
    yield put(updatePositionSuccess(payload));
  } catch (error) {
    yield put(updatePositionError(error));
  }
}
