'use client';

import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';
import { Task, Priority } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MessageSquare, Paperclip, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface TaskCardProps {
  task: Task;
  index: number;
}

const priorityStyles: Record<Priority, string> = {
  Low: 'bg-accent/20 text-accent-foreground',
  Medium: 'bg-orange-500/20 text-orange-600',
  High: 'bg-red-500/20 text-red-600',
};

const categoryStyles = {
  Completed: 'bg-green-500/20 text-green-600',
};

export function TaskCard({ task, index }: TaskCardProps) {

  const getImage = (id: string) => {
    return PlaceHolderImages.find(p => p.id === id);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'bg-card shadow-sm hover:shadow-md transition-shadow rounded-2xl',
            snapshot.isDragging && 'shadow-lg scale-105'
          )}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={cn(
                  'font-normal border-0',
                  task.priority === 'Low' && priorityStyles.Low,
                  task.category === 'Design System' && categoryStyles.Completed,
                )}
              >
                {task.category === 'Design System' ? 'Completed' : task.priority}
              </Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="font-semibold text-lg mb-1">{task.title}</p>
            {task.image && (
               <div className="relative w-full h-40 my-2 rounded-lg overflow-hidden">
                <Image
                  src={getImage(task.image)!.imageUrl}
                  alt={task.title}
                  fill
                  className="object-cover"
                  data-ai-hint={getImage(task.image)!.imageHint}
                />
               </div>
            )}
            <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex -space-x-2 overflow-hidden">
                {PlaceHolderImages.slice(0, 3).map((img) => (
                    <Image
                      key={img.id}
                      src={img.imageUrl}
                      alt={img.description}
                      width={24}
                      height={24}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-background"
                      data-ai-hint={img.imageHint}
                    />
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{task.comments} comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Paperclip className="h-4 w-4" />
                  <span>{task.files} files</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
