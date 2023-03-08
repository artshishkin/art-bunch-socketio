const express = require('express');
const socketio = require('socket.io')

const app = express();

// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);

const io = socketio(expressServer);

io.on('connection', (socket) => {

    console.log(socket.id)

    socket.emit("messageFromServer", `Hello from server to ${socket.id}`)

    socket.on('messageToServer', (dataFromClient) => {
        console.log(`${socket.id} sent me a message ${JSON.stringify(dataFromClient)}`)
    })

    socket.on("pingFromClient", (callback) => {
        callback();
    });

})

