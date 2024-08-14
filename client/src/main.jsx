import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Root from './Foundation/Root.jsx';
import ErrorPage from './Foundation/ErrorPage.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import PrivateRoute from './Foundation/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PrivateRoute>
            <Signup />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
