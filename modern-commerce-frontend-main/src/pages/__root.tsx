import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Toaster } from 'sonner';
import ErrorBoundary from '~/components/Error';

export const Route = createRootRoute({ component: RootRoute });

function RootRoute() {
  return (
    <>
      <ErrorBoundary>
        <Outlet />
        <Toaster />
      </ErrorBoundary>
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </>
  );
}
