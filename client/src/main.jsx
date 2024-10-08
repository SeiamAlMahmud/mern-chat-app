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
import { SocketContextProvider } from './context/SocketContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
            <Home />),
      },
      {
        path: "/login",
        element: ( <Login />
        ),
      },
      {
        path: "/signup",
        element: (<Signup /> ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <RouterProvider router={router} />
        </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
