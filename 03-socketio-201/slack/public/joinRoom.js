function joinRoom(roomName) {
    //send this room name to the server
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers, msg, roomHistory) => {
        console.log(msg);
        // console.log(roomHistory);
        const messagesUl = $('#messages');
        messagesUl.empty();
        roomHistory.forEach(fullMsg => messagesUl.append(buildMessageHTML(fullMsg)));
        //we want to update the room member total now we have joined
        $('.curr-room-num-users').html(`${newNumberOfMembers}<span class="glyphicon glyphicon-user"></span>`);
    });

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