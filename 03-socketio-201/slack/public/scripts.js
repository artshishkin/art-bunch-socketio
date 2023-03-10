const socket = io('http://localhost:8000'); //the / namespace/endpoint
const socket2 = io('http://localhost:8000/wiki'); //the /wiki namespace
const socket3 = io('http://localhost:8000/mozilla'); //the /mozilla namespace
const socket4 = io('http://localhost:8000/linux'); //the /linux namespace

socket2.on('welcome', (msg) => {
    console.log(msg)
})

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', {data: 'This is from the client'})
});

socket.on('joined', (msg) => {
    console.log(msg);
});

$('#message-form').on('submit', (event) => {
    event.preventDefault();
    const newMessage = $('#user-message').val();
    // console.log(newMessage)
    socket.emit('messageToServer', {text: newMessage});
})
