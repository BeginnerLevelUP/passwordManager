import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import './index.css'


import HomePage from './pages/home.jsx';
import ProfilePage from './pages/profile.jsx';
import SettingsPage from './pages/settings.jsx';
import ErrorPage from './pages/error.jsx';

const router=createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element:<HomePage></HomePage>
      },
      {
        path:'/me',
        element:<ProfilePage></ProfilePage>
      },
      {
        path:'/settings',
        element:<SettingsPage></SettingsPage>
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
