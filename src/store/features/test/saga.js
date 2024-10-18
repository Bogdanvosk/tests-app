import { takeLatest } from 'redux-saga/effects';
import { getCurrentTestError, getCurrentTestSuccess } from '.';
import { getCurrentTestReq } from '../../../api';
import { GET_CURRENT_TEST } from './constants';

export function* testSagaWatcher() {
  yield takeLatest(GET_CURRENT_TEST, getCurrentTestWorker);
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
