import { call, put, takeLatest } from 'redux-saga/effects';
import { createTestError, createTestSuccess, getCurrentTestError, getCurrentTestSuccess } from '.';
import { createTestReq, getCurrentTestReq } from '../../../api';
import { CREATE_TEST, GET_CURRENT_TEST } from './constants';

export function* testSagaWatcher() {
  yield takeLatest(GET_CURRENT_TEST, getCurrentTestWorker);
  yield takeLatest(CREATE_TEST, createTestWorker);
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
    // const errText = error.response.data || 'Server error';
    // yield put(createTestError(errText));
    console.log(error);
    
  }
}
