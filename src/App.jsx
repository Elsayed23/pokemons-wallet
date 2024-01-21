import React from 'react'
import Home from './components/Home';
import Layout from './components/layout/Layout';
import { RouterProvider, createBrowserRouter, createHashRouter, useLocation } from 'react-router-dom';
import Favourite from './components/Favourite';

function App() {


  const router = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'favourite', element: <Favourite /> },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
