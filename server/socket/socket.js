import express from 'express';
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        // https://mern-chat-app-y0qi.onrender.com/
        origin: ["http://localhost:5173","https://mern-chat-app-y0qi.onrender.com/"],
        methods: ["GET", "POST"]
    }

});

export const getReceiverId = (receiverId)=> {
    return userSocketMap[receiverId]
}

const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
    console.log("a user connected", socket.id);


    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients. 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen  to the events. can be used both on client and server side
    io.on('disconnect', () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
})

export { app, io, server }
