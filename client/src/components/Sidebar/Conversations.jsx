import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../Hooks/useGetConversation'

const Conversations = () => {
  const { loading, conversations } = useGetConversation()
  // console.log("CONVERSATION", conversations)
  return (
    <>
      <div className="flex flex-col overflow-auto py-2">
        {
          conversations.map((conversation, index) => {
            return <Conversation key={conversation._id} conversation={conversation}
              lastIndex={index === conversation.length - 1} />
          })
        }

        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
      </div>
    </>
  )
}

export default Conversations