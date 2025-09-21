'use client';

import { useHydrated } from '@/hooks/use-hydrated';
import { KanbanBoard } from './kanban-board';
import { MainHeader } from '../layout/main-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppHeader } from '../layout/app-header';

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
    <div className="flex flex-1 flex-col overflow-hidden">
      <MainHeader />
      <div className="flex flex-1 flex-col overflow-y-auto border-l">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6">
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}
