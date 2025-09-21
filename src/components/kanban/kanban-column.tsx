'use client';

import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { selectTasks, selectFilters } from '@/lib/redux/tasks-slice';
import { TaskCard } from './task-card';
import { Column, Status } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AddTaskDialog } from './add-task-dialog';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface KanbanColumnProps {
  column: Column;
}

const columnStyles: Record<Status, { indicator: string }> = {
  todo: { indicator: 'bg-chart-1' },
  inprogress: { indicator: 'bg-chart-2' },
  done: { indicator: 'bg-chart-3' },
};

export function KanbanColumn({ column }: KanbanColumnProps) {
  const allTasks = useSelector(selectTasks);
  const filters = useSelector(selectFilters);

  const tasks = column.taskIds
    .map(taskId => allTasks[taskId])
    .filter(task => {
      if (!task) return false;
      const categoryMatch = filters.category === 'all' || task.category === filters.category;
      const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
      return categoryMatch && priorityMatch;
    });

  const { indicator } = columnStyles[column.id];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', indicator)}></span>
          <h2 className="font-medium text-muted-foreground">{column.title}</h2>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className='h-6 w-6'>
          <Plus className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      <div className={cn('h-1 w-full rounded-full', indicator)}></div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ScrollArea className="flex-1 mt-4">
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "flex h-full flex-col gap-4 p-1 transition-colors",
                snapshot.isDraggingOver ? 'bg-muted' : 'bg-transparent'
              )}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </ScrollArea>
        )}
      </Droppable>
    </div>
  );
}
