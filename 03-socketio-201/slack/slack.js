const express = require('express');
const socketio = require('socket.io')
const namespaces = require('./data/namespaces')

// console.log(namespaces)
// console.log(namespaces[0])

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

//loop through all namespaces and listen for a connection
namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connect', (socket) => {
        console.log(`Server received a connection to namespace ${namespace.endpoint} from socket ${socket.id}`)
    })
})

