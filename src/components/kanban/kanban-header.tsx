'use client';

import { AddTaskDialog } from './add-task-dialog';
import { FilterControls } from './filter-controls';

export function KanbanHeader() {
  return (
    <header className="flex flex-shrink-0 items-center justify-between border-b bg-card p-4">
      <h1 className="text-2xl font-bold text-foreground">TaskZenith</h1>
      <div className="flex items-center gap-4">
        <FilterControls />
        <AddTaskDialog />
      </div>
    </header>
  );
}
