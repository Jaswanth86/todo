'use client';

import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { selectTasks, selectFilters } from '@/lib/redux/tasks-slice';
import { TaskCard } from './task-card';
import { Column } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: Column;
}

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

  return (
    <Card className="flex h-[calc(100vh-10rem)] flex-col bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
        <CardTitle className="text-lg font-semibold">{column.title}</CardTitle>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary-foreground">
          {tasks.length}
        </div>
      </CardHeader>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ScrollArea className="flex-1">
            <CardContent
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "p-4 transition-colors",
                snapshot.isDraggingOver ? 'bg-primary/10' : 'bg-transparent'
              )}
            >
              <div className="flex flex-col gap-4">
                {tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            </CardContent>
          </ScrollArea>
        )}
      </Droppable>
    </Card>
  );
}
