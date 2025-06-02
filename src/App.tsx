import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CaseList from './pages/CaseList';
import CaseDetails from './pages/CaseDetails';
import NotFound from './pages/NotFound';

// Create a client
const queryClient = new QueryClient();

// Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'cases',
        element: <CaseList />
      },
      {
        path: 'cases/:caseId',
        element: <CaseDetails />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
