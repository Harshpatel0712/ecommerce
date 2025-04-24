import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ZodError } from 'zod';
import './index.css';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError | ZodError;
  }
}

document.title = import.meta.env.VITE_APP_TITLE;

console.log(import.meta.env);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
