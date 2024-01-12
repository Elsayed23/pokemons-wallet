import React from 'react'
import Home from './components/Home';
import Layout from './components/layout/Layout';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Favourite from './components/Favourite';

function App() {

  const [search, setSearch] = React.useState('')
  const [currType, setCurrType] = React.useState('all')

  const router = createHashRouter([
    {
      path: '', element: <Layout setSearch={setSearch} currType={currType} setCurrType={setCurrType} />, children: [
        { path: '', element: <Home search={search} currType={currType} /> },
        { path: 'home', element: <Home search={search} currType={currType} /> },
        { path: 'favourite', element: <Favourite search={search} currType={currType} /> },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
