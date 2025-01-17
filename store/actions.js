// actions.js
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const addTask = (task) => ({
  type: ADD_TASK_REQUEST,
  payload: task,
});

export const fetchTasks = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const updateTask = (task) => ({
  type: UPDATE_TASK_REQUEST,
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK_REQUEST,
  payload: taskId,
});
