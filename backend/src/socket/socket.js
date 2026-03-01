import { Server } from "socket.io";
import http from "http";
// console.log("socket file start")
import { app } from "../app.js"
// console.log("after import")

// const app = express()
// console.log("ffff")

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

export {app, io, server}