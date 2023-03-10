function joinNs(nsEndpoint) {
    const nsSocket = io(BASE_URL + nsEndpoint);
    nsSocket.on('nsRoomLoad', (nsRooms) => {
        // console.log(nsRooms);
        const roomListUl = $('.room-list');
        roomListUl.empty();
        nsRooms.forEach(nsRoom => {
            const glyph = nsRoom.privateRoom ? 'lock' : 'globe';
            roomListUl.append(`<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${nsRoom.roomTitle}</li>`);
        });
        roomListUl.children().click((e) => {
            console.log('Someone clicked on ' + e.target.innerText)
        });
    });

    nsSocket.on('messageToClients', (msg) => {
        console.log(msg);
        $('#messages').append(`<li>${msg.text}</li>`);
    });

    $('.message-form').on('submit', (event) => {
        event.preventDefault();
        const newMessage = $('#user-message').val();
        // console.log(newMessage)
        socket.emit('messageToServer', {text: newMessage});
    })

}