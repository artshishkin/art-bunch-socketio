const express = require('express');
const socketio = require('socket.io')

const app = express();

// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);

const io = socketio(expressServer);

io.on('connection', (socket) => {

    console.log(`${socket.id} connected to the ${socket.nsp.name} (default) namespace`)

    socket.emit("messageFromServer", `Hello from server to ${socket.id}`)

    socket.on('messageToServer', (dataFromClient) => {
        console.log(`${socket.id} sent me a message ${JSON.stringify(dataFromClient)}`)
    })

    socket.on('newMessageToServer', (msg) => {
        console.log(`${socket.id} sent me a message ${JSON.stringify(msg)}`)

        //next lines are equivalent
        io.of('/').emit('messageToClients', {text: msg.text});
        // io.emit('messageToClients', {text: msg.text});

        // socket.broadcast.emit('messageToClients', msg); //send to everyone except socket
    })

    socket.on("pingFromClient", (callback) => {
        callback();
    });

})

io.of('/admin').on('connect', (socket) => {
    console.log(`${socket.id} connected to the ${socket.nsp.name} namespace`)
    socket.emit('welcome', 'Welcome to the admin channel!');
})

