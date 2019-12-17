const path = require("path")
const http = require("http")
const express = require("express")
const socketIO = require("socket.io")

const publicPath = path.join(__dirname + "/../public")
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server) // initialize a new instance of socket.io 

app.use(express.static(publicPath))


/**
 * io :- for singular connection
 * socket :- for broadcast 
 * -----------------------------
 * socket.emit :- will emit new event 
 * socket.on :- will listen those event 
 * 
 */


/**
 * --------- ACC to SOCKET.IO documentation ----------
 * To send an event to everyone(BROADCAST), Socket.IO gives us the >>-- io.emit --<<
 * 
 */
io.on('connection', (socket) => { // Listening on the connection event
    console.log("A new user just connected")

    // socket.emit('newMessage', {
    //     from: "Admin",
    //     texts: "Welcome to the chat app! ",
    //     createdAt: new Date().getTime()
    // })

    // socket.broadcast.emit('newMessage', {
    //     from: "Admin",
    //     texts: "New user joined the chat app! ",
    //     createdAt: new Date().getTime()
    // })

    // socket.on('createMessage', (message) => {
    //     console.log("CREATEmESSAGE.", message)
    //     io.emit('newMessage', {
    //         from: message.from,
    //         text: message.text,
    //         createdAt: new Date().getTime()
    //     })
    // })

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => { // Each socket also fires a special disconnect event
        console.log("User was disconnected.")
    })
})

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
})