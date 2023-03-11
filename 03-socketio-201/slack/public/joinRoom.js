function joinRoom(roomName) {

    function displayClientsCount(newNumberOfMembers) {
        $('.curr-room-num-users').html(`${newNumberOfMembers}<span class="glyphicon glyphicon-user"></span>`);
    }

    //send this room name to the server
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers, msg, roomHistory) => {
        console.log(msg);
        // console.log(roomHistory);
        const messagesUl = $('#messages');
        messagesUl.empty();
        roomHistory.forEach(fullMsg => messagesUl.append(buildMessageHTML(fullMsg)));
        messagesUl.scrollTop(messagesUl.prop('scrollHeight'));
        //we want to update the room member total now we have joined
        displayClientsCount(newNumberOfMembers);
    });

    nsSocket.on('messageToClients', (msg) => {
        const messagesUl = $('#messages');
        messagesUl.append(buildMessageHTML(msg));
        // animate the scrollTop property to the height of the messagesUl
        messagesUl.animate({scrollTop: messagesUl.prop('scrollHeight')}, 1000);
    });

    nsSocket.on('updateMembersCount', (clientsCount) => {
        displayClientsCount(clientsCount);
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