import React from 'react'
import useConversation from '../../zustand/useConversation';
const Message = ({ items }) => {
//  console.log(items)

    // localStorage.getItem("chat-user")
    const localStorageData = JSON.parse(localStorage.getItem("chat-user"))
    const { selectedConversation } = useConversation()

    const fromMe = items?.senderId === localStorageData._id;
    // console.log(items?.senderId === localstorage._id)
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? localStorageData?.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-sky-500" : "bg-gray-700";


    // time settinge
    const date = new Date(items.createdAt);
    const formatTimestamp = (createdAt) => {
        const date = new Date(createdAt);
        const now = new Date();
      
        const diffInMs = now - date;
        const diffInMinutes = diffInMs / (1000 * 60);
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
      
        if (diffInMinutes < 60) {
          // Less than 60 minutes ago
          return `${Math.floor(diffInMinutes)} minutes ago`;
        } else if (diffInHours < 24) {
          // Less than 24 hours ago
          return `${Math.floor(diffInHours)} hours ago`;
        } else if (diffInDays < 7) {
          // Less than 7 days ago
          return date.toLocaleDateString('en-US', { weekday: 'long' });
        } else {
          // More than 7 days ago
          return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        }
      };
      
      
      


    return (
        <>
           <div className={`chat ${chatClassName}`}>
                <div className="chat-image avatar">
                    <div className='w-10 rounded-full '>
                        <img src={profilePic} alt="Tailwind Css Bubble Component" />
                    </div>
                </div>
                <div className={`text-white  chat-bubble ${bubbleBgColor}`}>{items?.message}</div>
                <div className="flex gap-1 opacity-50 items-center chat-footer text-xs mt-1">{formatTimestamp(items.createdAt)}</div>
                
            </div>
        </>
    )
}

export default Message