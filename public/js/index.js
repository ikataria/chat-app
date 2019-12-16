// this is going try to make a request to the backend & backend gonna respond back
let socket = io()

socket.on('connect', function() {
    console.log("Connected to server.")

})

socket.on('disconnect', function() {
    console.log("Disconnected from server.")
})

socket.on('newMessage', function(message) {
    console.log("log new msg.", message)
})