function joinRoom(roomName) {
    //send this room name to the server
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers, msg) => {
        console.log(msg);
        //we want to update the room member total now we have joined
        $('.curr-room-num-users').html(`${newNumberOfMembers}<span class="glyphicon glyphicon-user"></span>`);
    });

}