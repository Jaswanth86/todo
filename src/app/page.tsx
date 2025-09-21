import ClientPage from '@/components/kanban/client-page';
import { PersistProvider } from '@/lib/redux/persistor-provider';
import { StoreProvider } from '@/lib/redux/provider';

export default function Home() {
  return (
    <StoreProvider>
      <PersistProvider>
        <ClientPage />
      </PersistProvider>
    </StoreProvider>
  );
}
