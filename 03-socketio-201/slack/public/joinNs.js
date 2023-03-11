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
            console.log('Someone clicked on ' + e.target.innerText)
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
        const newMessage = $('#user-message').val();
        // console.log(newMessage)
        nsSocket.emit('messageToServer', {text: newMessage});
    })

}

function buildMessageHTML(fullMessage) {
    // const options = {hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    // const msgTime = new Date(fullMessage.time).toLocaleTimeString('en-US', options); // output: 10:30:45 AM
    const msgTime = new Date(fullMessage.time).toLocaleString();
    return `
        <li>
            <div class="user-image">
                <img src="${fullMessage.avatar}" />
            </div>
            <div class="user-message">
                <div class="user-name-time">${fullMessage.username} <span>${msgTime}</span></div>
                <div class="message-text">${fullMessage.text}</div>
            </div>
        </li>
    `;
}