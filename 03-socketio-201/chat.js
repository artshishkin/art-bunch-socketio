const express = require('express');
const socketio = require('socket.io')

const app = express();

// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);

const io = socketio(expressServer);

io.on('connection', (socket) => {

    socket.emit("messageFromServer", `Hello from server to ${socket.id}`)
    socket.on('messageToServer', (dataFromClient) => {
        console.log(`${socket.id} sent me a message ${JSON.stringify(dataFromClient)}`)
    })
    socket.join('level1');
    // socket.to('level1').emit('joined', `${socket.id} has joined the level 1 room`); //sends to everyone except itself
    io.of('/').to('level1').emit('joined', `${socket.id} has joined the level 1 room`); //sends to everyone

})

io.of('/admin').on('connect', (socket) => {
    console.log(`${socket.id} connected to the ${socket.nsp.name} namespace`)
    socket.emit('welcome', 'Welcome to the admin channel!');
    // io.of('/admin').emit('welcome', 'Welcome to the admin channel!');
})

