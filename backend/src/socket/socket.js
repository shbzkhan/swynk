import { Server } from "socket.io";
import http from "http";
import { app } from "../app.js"


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
        methods:["GET","POST"]
    }
})

const userSocketMap = {};

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    let userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id
    }
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

const getReceiverSocketId = (userId) =>{
    return userSocketMap[userId]
}

export {app, io, server, getReceiverSocketId}