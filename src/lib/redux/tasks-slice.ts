'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { KanbanState, Status, Task } from '../types';

const initialState: KanbanState = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Implement UI from Figma', description: 'Replicate the dashboard UI as closely as possible.', status: 'todo', priority: 'High', category: 'Work' },
    'task-2': { id: 'task-2', title: 'Set up Redux store', description: 'Use Redux for state management and persist state with Local Storage.', status: 'inprogress', priority: 'High', category: 'Work' },
    'task-3': { id: 'task-3', title: 'Groceries shopping', description: 'Buy milk, bread, and eggs.', status: 'todo', priority: 'Medium', category: 'Personal' },
    'task-4': { id: 'task-4', title: 'Fix login bug', description: 'Users are reporting issues when logging in with social accounts.', status: 'done', priority: 'High', category: 'Work' },
    'task-5': { id: 'task-5', title: 'Plan weekend trip', description: 'Research destinations and book accommodation.', status: 'todo', priority: 'Low', category: 'Personal' },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-3', 'task-5'],
    },
    'inprogress': {
      id: 'inprogress',
      title: 'In Progress',
      taskIds: ['task-2'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['todo', 'inprogress', 'done'],
  filters: {
    category: 'all',
    priority: 'all',
  },
};

const tasksSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
      state.tasks[newTask.id] = newTask;
      state.columns[newTask.status].taskIds.push(newTask.id);
    },
    moveTask: (state, action: PayloadAction<{
      sourceColumnId: Status;
      destColumnId: Status;
      sourceIndex: number;
      destIndex: number;
      taskId: string;
    }>) => {
      const { sourceColumnId, destColumnId, sourceIndex, destIndex, taskId } = action.payload;

      // Remove from source column
      state.columns[sourceColumnId].taskIds.splice(sourceIndex, 1);
      
      // Add to destination column
      state.columns[destColumnId].taskIds.splice(destIndex, 0, taskId);

      // Update task status
      state.tasks[taskId].status = destColumnId;
    },
    reorderTaskInColumn: (state, action: PayloadAction<{
        columnId: Status;
        sourceIndex: number;
        destIndex: number;
        taskId: string;
      }>) => {
        const { columnId, sourceIndex, destIndex, taskId } = action.payload;
        const column = state.columns[columnId];
        column.taskIds.splice(sourceIndex, 1);
        column.taskIds.splice(destIndex, 0, taskId);
    },
    setCategoryFilter: (state, action: PayloadAction<'all' | 'Work' | 'Personal' | 'Urgent'>) => {
      state.filters.category = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<'all' | 'Low' | 'Medium' | 'High'>) => {
      state.filters.priority = action.payload;
    },
  },
});

export const { addTask, moveTask, reorderTaskInColumn, setCategoryFilter, setPriorityFilter } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.kanban.tasks;
export const selectColumns = (state: RootState) => state.kanban.columns;
export const selectColumnOrder = (state: RootState) => state.kanban.columnOrder;
export const selectFilters = (state: RootState) => state.kanban.filters;

export default tasksSlice.reducer;
