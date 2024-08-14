import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const useLogOut = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext()
  const logOut = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/logout')

      if (response.data?.error) {
        throw new Error(response.data?.error)
      }
      if (response.data?.message) {
        toast.success(response.data?.message)
        localStorage.removeItem("chat-user")
        setAuthUser(null)
        navigate("/login")
      }
    } catch (error) {

      if (error.response) {
        switch (error.response.status) {
          case 400:
            // Custom error message from the server
            toast.error(error.response.data?.error || 'Bad Request');
            break;
          case 401:
            toast.error(error.response.data?.error || 'Unauthorized access');
            break;
          case 403:
            toast.error(error.response.data?.error || 'Forbidden: You donât have permission');
            break;
          case 404:
            toast.error(error.response.data?.error || 'Resource not found');
            break;
          case 500:
            toast.error(error.response.data?.error || 'Internal server error');
            break;
          default:
            toast.error(error.response.data?.error || 'An unexpected error occurred');
        }
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false)
    }
    //
  }
  return { logOut, loading }
}

export default useLogOut