// sagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  UPDATE_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  ADD_TASK_REQUEST, 
  ADD_TASK_SUCCESS, 
  ADD_TASK_FAILURE
} from './actions';

const API_URL = 'https://67186d3ab910c6a6e02c0e5c.mockapi.io/api/todo/task';

function* fetchTasksSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
}

function* updateTaskSaga(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(fetchTasks()); 
  } catch (error) {
    // Handle error if needed
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(fetchTasks());
  } catch (error) {
    // Handle error if needed
  }
}

function* addTaskSaga(action) {
  try {
    const response = yield call(fetch, API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: action.payload }),
    });
    const data = yield response.json();
    yield put({ type: ADD_TASK_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADD_TASK_FAILURE, payload: error.message });
  }
}


export function* watchTaskSagas() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeEvery(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
  yield takeEvery(ADD_TASK_REQUEST, addTaskSaga);
}
