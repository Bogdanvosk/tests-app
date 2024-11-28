import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserReq, logoutReq, signInReq, signUpReq } from '../../../api';
import {
  getUserError,
  getUserSuccess,
  logoutError,
  logoutSuccess,
  signInError,
  signInSuccess,
  signUpError,
  signUpSuccess,
} from '.';
import { GET_USER, SIGN_IN, SIGN_UP, LOGOUT } from './constants';

export function* authSagaWatcher() {
  yield takeLatest(SIGN_IN, signInWorker);
  yield takeLatest(SIGN_UP, signUpWorker);
  yield takeLatest(GET_USER, getUserWorker);
  yield takeLatest(LOGOUT, logoutWorker);
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

function* logoutWorker() {
  try {
    const data = yield call(logoutReq);
    yield put(logoutSuccess(data));
  } catch (error) {
    const errText = error.response.data || 'Server error';
    yield put(logoutError(errText));
  }
}
