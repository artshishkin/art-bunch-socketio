const socket = io('http://localhost:8000'); //the / namespace/endpoint
const socket2 = io('http://localhost:8000/admin'); //the /admin namespace
// const socket2 = io('http://localhost:8000/marketing'); //the /marketing namespace

socket.on('connect', () => {
    console.log(`Socket default: ${socket.id}`);
})
socket2.on('connect', () => {
    console.log(`Socket /admin: ${socket2.id}`);
})

socket2.on('welcome', (msg) => {
    console.log(msg)
})

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