import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"
import notificationSound from "../assets/sounds/simple-notification-152054.mp3"


const useListenMessages = () => {

    const { socket } = useSocketContext()
    const { messages, setMessage } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            // const sound  = new Audio(notificationSound);
            // sound.play()
            setMessage([...messages, newMessage])
        })

        return () => socket?.off("newMessage")
    }, [socket, messages, setMessage])
}

export default useListenMessages