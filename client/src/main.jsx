import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import './index.css'

import SignupPage from './pages/signup.jsx';
import LoginPage from './pages/login.jsx';
import HomePage from './pages/home.jsx';
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
        path:'/login',
        element:<LoginPage></LoginPage>
      },
      {
        path:'/signup',
        element:<SignupPage></SignupPage>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
