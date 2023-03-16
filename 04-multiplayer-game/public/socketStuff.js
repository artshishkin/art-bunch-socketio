const BASE_URL = 'http://localhost:8080';
const socket = io(BASE_URL); //the / namespace/endpoint

socket.on('connect', () => {
    console.log("I'm connected to the socketio server")
})

socket.on('init', (data) => {
    orbs = data.orbs;
})
