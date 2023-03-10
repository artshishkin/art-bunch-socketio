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

    //build an array to send back with the img and endpoint for each namespace
    const nsData = namespaces.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    });
    //send the ns data back to the client
    socket.emit('nsList', namespaces);

})

//loop through all namespaces and listen for a connection
namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connect', (nsSocket) => {
        console.log(`Server received a connection to namespace ${namespace.endpoint} from socket ${nsSocket.id}`)
        nsSocket.emit('nsRoomLoad', namespace.rooms)
        nsSocket.on('joinRoom', (roomName) => {
            nsSocket.join(roomName);
            nsSocket.emit('roomJoined', `You joined the room ${roomName}`)
        })
    })
})

