import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserReq, signInReq, signUpReq } from '../../../api';
import {
  getUserError,
  getUserSuccess,
  signInError,
  signInSuccess,
  signUpError,
  signUpSuccess,
} from '.';
import { GET_USER, SIGN_IN, SIGN_UP } from './constants';

export function* authSagaWatcher() {
  yield takeLatest(SIGN_IN, signInWorker);
  yield takeLatest(SIGN_UP, signUpWorker);
  yield takeLatest(GET_USER, getUserWorker);
}

function* signInWorker({ payload }) {
  try {
    const data = yield call(signInReq, payload);

    yield put(signInSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';

    yield put(signInError(errText));
  }
}

function* signUpWorker({ payload }) {
  try {
    const data = yield call(signUpReq, payload);

    yield put(signUpSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';

    yield put(signUpError(errText));
  }
}

function* getUserWorker() {
  try {
    const data = yield call(getUserReq);

    yield put(getUserSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';

    yield put(getUserError(errText));
  }
}
