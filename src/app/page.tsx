import ClientPage from '@/components/kanban/client-page';
import { Sidebar } from '@/components/layout/sidebar';
import { PersistProvider } from '@/lib/redux/persistor-provider';
import { StoreProvider } from '@/lib/redux/provider';

export default function Home() {
  return (
    <StoreProvider>
      <PersistProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <ClientPage />
        </div>
      </PersistProvider>
    </StoreProvider>
  );
}
