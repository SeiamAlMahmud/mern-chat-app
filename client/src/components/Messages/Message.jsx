import React from 'react'

const Message = () => {
    return (
        <div className={`chat chat-end`}>
            <div className="chat-image avatar">
                <div className='w-10 rounded-full '>
                    <img src={"https://avatar.iran.liara.run/public/boy?username=sam"} alt="Tailwind Css Bubble Component" />
                </div>
            </div>
            <div className={`text-white bg-blue-500 chat-bubble`}>Hi ! What is app?</div>
            <div className="flex gap-1 opacity-50 items-center chat-footer text-xs mt-1">12:45</div>
        </div>
    )
}

export default Message