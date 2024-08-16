import { useEffect, useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast';



const useGetConversation = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true)
      try {

        const response = await axios.get("/api/users")
        setConversations(response.data)

        if (response.data?.error) {
          throw new Error(response.data?.error)
        }

      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              // Custom error message from the server
              toast.error(error.response.data?.error || 'Bad Request');
              break;
            case 401:
              console.log(error.response.data?.error || 'Unauthorized access');
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
      }
    }

    getConversation()
  }, [])
  return { loading, conversations }
}

export default useGetConversation