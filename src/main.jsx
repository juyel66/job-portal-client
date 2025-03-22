import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Components/Layout/MainLayout';
import Home from './Components/pages/Home';
import Register from './Components/Register';
import SignIn from './Components/SignIn';
import AuthProvider from './Components/AuthProvider';
import JobDetails from './Components/JobDetails';
import PrivetRout from './Components/PrivetRout';
import JobApply from './Components/JobApply';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h1 className='text-red-500 text-center mt-50 text-5xl'>Page is not found</h1>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
    {
        path: "/register",
      element: <Register></Register>
    },
    {
      path: "/signIn",
      element: <SignIn></SignIn>
    },
    {
      path: '/jobs/:id',
      element: <PrivetRout><JobDetails></JobDetails></PrivetRout>,
      loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
    },
    {
      path: '/jobApply/:id',
      element: <JobApply></JobApply>
    }
    ]
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
