import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import axios from 'axios'
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)

    const { selectedConversation, messages, setMessage } = useConversation()
  

    
    useEffect(() => {

        const getMessages = async () => {

            setLoading(true)
            try {

                const response = await axios.get(`/api/messages/${selectedConversation?._id}`)
                
                
                setMessage(response?.data)
                // console.log(response, "response")
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
                            toast.error(error.response.data?.error || 'Unauthorized access');
                            break;
                        case 403:
                            toast.error(error.response.data?.error || 'Forbidden: You donât have permission');
                            break;
                        case 404:
                            toast.error(error.response.data?.error || 'Message not Found');
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
        }

        if (selectedConversation?._id) {
            getMessages()
        }

    }, [selectedConversation?._id, setMessage ])

    return { loading, messages }
}

export default useGetMessages