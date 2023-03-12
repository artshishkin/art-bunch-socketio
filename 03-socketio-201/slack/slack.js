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
        nsSocket.on('joinRoom', (roomName, joiningRoomCallback) => {
            //deal with history... once we have it
            const rooms = Array.from(nsSocket.rooms);
            if (rooms[1]) {
                //leave previous room
                // console.log('leaving room ' + rooms[1])
                nsSocket.leave(rooms[1]); //[0] his own room, [1] last room client was joined to
            }
            // console.log('----------------')
            // console.log('Rooms of client: ' + nsSocket.id, rooms)
            // console.log('----------------')

            nsSocket.join(roomName);

            const nsRoom = namespace.rooms.find(r => r.roomTitle === roomName);

            io.of(namespace.endpoint).in(roomName).fetchSockets().then((clients) => {
                // console.log('Joined clients:', clients.map(soc => soc.id));
                joiningRoomCallback(clients.length, `You joined the room ${roomName}`, nsRoom.history);
                //inform other clients about new clients count
                io.of(namespace.endpoint).in(roomName).emit('updateMembersCount', clients.length);
            });

            //switch off previous listener of `messageToServer` event
            if (nsSocket.listeners('messageToServer'))
                nsSocket.removeAllListeners('messageToServer');
            nsSocket.on('messageToServer', (msg) => {
                const fullMsg = {
                    text: msg.text,
                    time: Date.now(),
                    username: 'Art',
                    avatar: `https://robohash.org/${nsSocket.id}?set=set3&size=30x30`
                };
                // console.log(`received message ${msg.text} in room '${roomName}' of '${namespace.endpoint}' namespace`)
                nsRoom.addMessage(fullMsg);
                io.of(namespace.endpoint).in(roomName).emit('messageToClients', fullMsg);
            })
        })
    })
})

