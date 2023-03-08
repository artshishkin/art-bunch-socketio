// http is a core node module
//We need http because we do not have express
const http = require('http'); //basic HTTP server, part of Node.js
// socket.io is a 3rd party module
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('I am connected!');
});

const io = new socketio.Server(server);

io.on('connection', (socket, req) => {
    console.log("on Connection")
    // socket.send('Welcome to the socket.io server!!!');
    socket.emit('Welcome to the socket.io server!!!');

    socket.on('message', (data) => {
        console.log(data.toString())
    })

})

server.listen(8000);