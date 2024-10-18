import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import authSlice from './features/auth';
import { authSagaWatcher } from './features/auth/saga';
import logger from 'redux-logger';
import { testSagaWatcher } from './features/test/saga';
import { testSlice } from './features/test';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  auth: authSlice,
  test: testSlice,
});

function* rootSaga() {
  yield all([fork(authSagaWatcher), fork(testSagaWatcher)]);
}

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export default store;
