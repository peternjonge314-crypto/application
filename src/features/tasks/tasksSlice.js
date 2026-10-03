import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [] },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
    editTask: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) task.description = action.payload.description;
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;