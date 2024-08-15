import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../Hooks/useGetMessages'
import MessageSkeleton from '../messageSkeleton/MessageSkeleton'
import useConversation from '../../zustand/useConversation'

const Messages = () => {
  const { loading, messages } = useGetMessages()
  const {selectedConversation, setMessage} = useConversation()
  console.log(messages, "messages")

  const messageRef = useRef(null);
    
//   useEffect(() => {
//     // Wait for the message element to be rendered in the DOM
//     if (messageRef.current) {
//       const messageElement = messageRef.current;

//       // Calculate the total scrollable height
//       const totalHeight = messageElement.scrollHeight;
// console.log('kk')
//       // Optionally, adjust for potential margins or padding
//       const adjustedHeight = totalHeight - messageElement.clientHeight;
   
//        // Scroll to the last item smoothly (using requestAnimationFrame for performance)
//        const scrollToLast = () => {
//         let currentScrollPosition = 0;
//         const scrollStep = 60; // Adjust scroll step size for desired animation speed

//         const scroll = () => {
//           currentScrollPosition += scrollStep;
//           if (currentScrollPosition >= adjustedHeight) {
//             currentScrollPosition = adjustedHeight; // Ensure we don't overscroll
//           }
//           messageElement.scrollTop = currentScrollPosition;


//           if (currentScrollPosition < adjustedHeight) {
//             requestAnimationFrame(scroll);
//           }
//         };

//         requestAnimationFrame(scroll);
//       };

//       scrollToLast();
//     }
//   }, ); // Re-run useEffect when messages change

useEffect(() => {
  // Wait for the message element to be rendered in the DOM
  if (messageRef.current) {
    const messageElement = messageRef.current;

    // Directly set the scroll position to the bottom
    messageElement.scrollTop = messageElement.scrollHeight - messageElement.clientHeight;
  }
}, ); // Re-run useEffect when messages change

  return (
    <div className='px-4 flex-1 overflow-auto' ref={messageRef}>

      {
        !loading &&  messages.length > 0 && ( messages.map((items,idx)=> { return <Message key={idx} items={items}></Message>
          })
        )
      }
      {
        loading && <MessageSkeleton />
      }
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start conversation.</p>
      )}
    </div>
  )
}

export default Messages