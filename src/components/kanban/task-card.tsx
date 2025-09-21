'use client';

import { Draggable } from 'react-beautiful-dnd';
import { Task, Priority } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const priorityStyles: Record<Priority, string> = {
    Low: 'bg-chart-2/10 text-chart-2 border-chart-2/30',
    Medium: 'bg-accent/10 text-accent border-accent/30',
    High: 'bg-destructive/10 text-destructive border-destructive/30',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-card shadow-sm hover:shadow-md transition-shadow",
            snapshot.isDragging && "shadow-lg scale-105"
          )}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-base font-medium">{task.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="font-normal">{task.category}</Badge>
              <Badge variant="outline" className={cn(priorityStyles[task.priority], "font-semibold")}>
                {task.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
