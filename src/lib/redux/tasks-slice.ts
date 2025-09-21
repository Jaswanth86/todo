'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { KanbanState, Status, Task, Category, Priority } from '../types';

const initialState: KanbanState = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", status: 'todo', priority: 'Low', category: 'Brainstorming', comments: 12, files: 0 },
    'task-2': { id: 'task-2', title: 'Research', description: 'User research helps you to create an optimal product for users.', status: 'todo', priority: 'High', category: 'Research', image: 'task-image-1', comments: 10, files: 3 },
    'task-3': { id: 'task-3', title: 'Wireframes', description: 'Low fidelity wireframes include the most basic content and visuals.', status: 'todo', priority: 'High', category: 'Wireframes', comments: 5, files: 2 },
    'task-4': { id: 'task-4', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", status: 'inprogress', priority: 'Low', category: 'Brainstorming', comments: 8, files: 0 },
    'task-5': { id: 'task-5', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", status: 'inprogress', priority: 'Low', category: 'Brainstorming', comments: 12, files: 5 },
    'task-6': { id: 'task-6', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", status: 'done', priority: 'Low', category: 'Brainstorming', comments: 12, files: 0 },
    'task-7': { id: 'task-7', title: 'Design System', description: 'It just needs to adapt the UI from what you did before.', status: 'done', priority: 'Low', category: 'Design System', image: 'task-image-2', comments: 12, files: 15 },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'inprogress': {
      id: 'inprogress',
      title: 'On Progress',
      taskIds: ['task-4', 'task-5'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-6', 'task-7'],
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

      state.columns[sourceColumnId].taskIds.splice(sourceIndex, 1);
      state.columns[destColumnId].taskIds.splice(destIndex, 0, taskId);
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
    setCategoryFilter: (state, action: PayloadAction<'all' | Category>) => {
      state.filters.category = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<'all' | Priority>) => {
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
