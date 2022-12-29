import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  currentId: number;
  todos: Array<{ id: number; text: string; done: boolean }>;
};

const initialState: initialStateType = {
  currentId: 0,
  todos: [],
};

const todoSlice = createSlice({
  name: 'TODO',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.currentId++;
      state.todos.push({
        id: state.currentId,
        text: action.payload,
        done: false,
      });
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, toggleTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice;
