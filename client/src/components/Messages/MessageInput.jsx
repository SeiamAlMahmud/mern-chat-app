import React from 'react'
import {BsSend} from "react-icons/bs"
const MessageInput = () => {
    return (
        <form className='px-4 my-3'>
            <div className='w-full relative'>
                <input type="text" 
                className='border text-sm rounded-lg block p-2.5 w-full bg-gray-700 border-gray-600 text-white'
                placeholder='Send a Message..'/>
                <button type='submit' className='flex absolute items-center pe-3 end-0 inset-y-0 z-40'>
                    <BsSend />
                </button>
            </div>
        </form>
    )
}

export default MessageInput