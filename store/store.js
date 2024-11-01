// store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Assume you have a root reducer
import { watchTaskSagas } from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchTaskSagas);

const storeToolKitRedux = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default storeToolKitRedux;
