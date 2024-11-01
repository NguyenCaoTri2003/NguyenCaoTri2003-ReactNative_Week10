import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://67186d3ab910c6a6e02c0e5c.mockapi.io/api/todo/task';

// Thunk cho các hành động bất đồng bộ
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
  const response = await axios.post(API_URL, { title: newTask });
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask) => {
  const response = await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
  return taskId;
});

// Tạo slice cho tác vụ
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

// Xuất các selector và reducer
export const selectTasks = (state) => state.tasks.tasks;
export const selectLoading = (state) => state.tasks.loading;
export const selectError = (state) => state.tasks.error;

export default tasksSlice.reducer;
