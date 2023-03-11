function joinNs(nsEndpoint) {
    nsSocket = io(BASE_URL + nsEndpoint);
    nsSocket.on('nsRoomLoad', (nsRooms) => {
        // console.log(nsRooms);
        const roomListUl = $('.room-list');
        roomListUl.empty();
        nsRooms.forEach(nsRoom => {
            const glyph = nsRoom.privateRoom ? 'lock' : 'globe';
            roomListUl.append(`<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${nsRoom.roomTitle}</li>`);
        });
        roomListUl.children().click((e) => {
            const roomName = $(e.target).text();
            joinRoom(roomName);
        });

        //add room automatically... first time here
        const topRoom = roomListUl.find("li:nth-child(1)");
        const topRoomName = topRoom.text();
        joinRoom(topRoomName);

    });

    nsSocket.on('messageToClients', (msg) => {
        $('#messages').append(buildMessageHTML(msg));
    });

    $('.message-form').on('submit', (event) => {
        event.preventDefault();
        const userMsgField = $('#user-message');
        const newMessage = userMsgField.val();
        userMsgField.val('');
        // console.log(newMessage)
        nsSocket.emit('messageToServer', {text: newMessage});
    })

}
