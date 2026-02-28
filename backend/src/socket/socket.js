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

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
})

export {app, io, server}