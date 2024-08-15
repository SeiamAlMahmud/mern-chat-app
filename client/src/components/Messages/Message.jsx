import React from 'react'
import useConversation from '../../zustand/useConversation';
const Message = ({ items }) => {
 console.log(items)

    // localStorage.getItem("chat-user")
    const { selectedConversation } = useConversation()
    const authUserFromStorage = localStorage.getItem("chat-user");
    const fromMe = items?.senderId == authUserFromStorage._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUserFromStorage?.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-sky-500" : "bg-gray-700";


    return (
        <>
           <div className={`chat ${chatClassName}`}>
                <div className="chat-image avatar">
                    <div className='w-10 rounded-full '>
                        <img src={profilePic} alt="Tailwind Css Bubble Component" />
                    </div>
                </div>
                <div className={`text-white  chat-bubble ${bubbleBgColor}`}>{items?.message}</div>
                <div className="flex gap-1 opacity-50 items-center chat-footer text-xs mt-1">12:45</div>
            </div>
        </>
    )
}

export default Message