'use client';

import { useHydrated } from '@/hooks/use-hydrated';
import { KanbanBoard } from './kanban-board';
import { KanbanHeader } from './kanban-header';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ClientPage() {
  const isHydrated = useHydrated();

  // Prevents hydration mismatch by rendering a loader on the server and initial client render.
  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {/* You can put a skeleton loader here */}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-body">
      <KanbanHeader />
      <ScrollArea className="flex-1">
        <main className="p-4 md:p-6">
          <KanbanBoard />
        </main>
      </ScrollArea>
    </div>
  );
}
