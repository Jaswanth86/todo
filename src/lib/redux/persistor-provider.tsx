'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import { Loader2 } from 'lucide-react';

export function PersistProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistGate
      loading={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }
      persistor={persistor}
    >
      {children}
    </PersistGate>
  );
}
