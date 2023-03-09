const socket = io('http://localhost:8000');

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', {data: 'This is from the client'})
});

$('#message-form').on('submit', (event) => {
    event.preventDefault();
    const newMessage = $('#user-message').val();
    // console.log(newMessage)
    socket.emit('newMessageToServer', {text: newMessage});
})

socket.on('messageToClients', (msg) => {
    console.log(msg)
    $('#messages').append(`<li>${msg.text}</li>`);
})