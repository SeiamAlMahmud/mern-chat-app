import React, { useState } from 'react'
import { BsSend } from "react-icons/bs"
import useSendMessage from '../../Hooks/useSendMessage'


const MessageInput = () => {
    const [message, setMessage] = useState("")
    const { sendMessage, loading } = useSendMessage()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message) return;

        sendMessage(message);
        setMessage('');
    }
    return (
        <form onSubmit={handleSubmit} className='px-4 my-3'>
            <div className='w-full relative'>
                <input type="text"
                    className='border text-sm rounded-lg block p-2.5 w-full bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a Message..'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                <button type='submit' className='flex absolute items-center pe-3 end-0 inset-y-0 z-40'>
                    {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput