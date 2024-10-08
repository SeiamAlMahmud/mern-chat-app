import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti"
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'



const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    // cleanup function (mounts)
    return () => setSelectedConversation(null)
  }, [])

  const { authUser } = useAuthContext()
  let objectAuthUser;
  if (authUser?.fullname) {
    objectAuthUser = authUser.fullName;
  }else{
    objectAuthUser = " "
  }
  const NoChatSelected = () => {
    return (
      <div className=" flex items-center justify-center h-full w-full ">
        <div className='text-center px-4 sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
          <p>Welcome {objectAuthUser} * </p>
          <p>Select a chat to start messaging.</p>
          {/* <TiMessages className='text-center text-3xl md:text-6xl' /> */}
          <p className='text-center text-lg'>Send</p>
        </div>
      </div>
    )
  }
  return (
    <div className='flex flex-col md:min-w-[450px]'>
      {
        !selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Header  */}
            <div className='bg-slate-600 px-4 py-2 mb-2 text-left'> To: {selectedConversation.fullName}</div>
            <Messages />
            <MessageInput />
          </>
        )
      }

    </div>
  )
}

export default MessageContainer