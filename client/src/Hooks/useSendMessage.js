import { useState } from "react"
import useConversation from '../zustand/useConversation'
import axios from "axios"


const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const { selectedConversation, setSelectedConversation, messages, setMessage } = useConversation()

    const sendMessage = async (message) => {


        setLoading(true)
        try {
            const response = await axios.post(`api/messages/send/${selectedConversation._id}`, { message })

            if (response.data?.error) {
                throw new Error(response.data?.error)
            }
// console.log('send message', response.data)
            setMessage([...messages, response.data])

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
    } // sendMessage
    return { sendMessage, loading }
}

export default useSendMessage