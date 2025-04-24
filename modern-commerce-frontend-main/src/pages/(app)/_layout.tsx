import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';
import Navbar from '~/components/Navbar';
import { SidebarProvider } from '~/components/ui/sidebar';

export const Route = createFileRoute('/(app)/_layout')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <NuqsAdapter>
      <SidebarProvider>
        <div>
          <Navbar />
          <div className="m-0 mt-12 h-[90%] w-screen px-8">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
