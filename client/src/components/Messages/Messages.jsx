import React from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkeleton from '../messageSkeleton/MessageSkeleton'

const Messages = () => {
  const { loading, messages } = useGetMessages()
  console.log(messages, "messages")
  return (
    <div className='px-4 flex-1 overflow-auto'>

      {
        !loading &&  messages.length > 0 && ( messages.map((items,idx)=> { return <Message key={idx} items={items}></Message>
          })
        )
      }
      {
        loading && [...Array(3).map((_,idx)=>  <MessageSkeleton key={idx} />)]
      }
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start conversation.</p>
      )}
    </div>
  )
}

export default Messages