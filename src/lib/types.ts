export type Status = 'todo' | 'inprogress' | 'done';

export type Priority = 'Low' | 'Medium' | 'High';

export type Category = 'Brainstorming' | 'Research' | 'Wireframes' | 'Design System';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  image?: string;
  comments: number;
  files: number;
}

export interface Column {
  id: Status;
  title: string;
  taskIds: string[];
}

export interface KanbanState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: Status[];
  filters: {
    category: 'all' | Category;
    priority: 'all' | Priority;
  };
}
