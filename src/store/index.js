import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import authSlice from './features/auth';
import testSlice from './features/test';
import { authSagaWatcher } from './features/auth/saga';
import { testSagaWatcher } from './features/test/saga';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  auth: authSlice,
  test: testSlice
});

function* rootSaga() {
  yield all([fork(authSagaWatcher), fork(testSagaWatcher)]);
}

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware, logger)
});

sagaMiddleware.run(rootSaga);

export default store;
