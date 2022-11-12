import {RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Router from './Router/Router';

const queryClient = new QueryClient()

// {
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 1000,
//     },
//   },
// }

const App = ()=> {


  return (
    <QueryClientProvider  client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  )
}

export default App
