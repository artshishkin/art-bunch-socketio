function joinRoom(nsSocket, roomName) {
    //send this room name to the server
    nsSocket.emit('joinRoom', roomName);

    nsSocket.on('roomJoined', (msg) => {
        console.log(msg);
    })

}