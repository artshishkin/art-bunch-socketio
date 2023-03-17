const BASE_URL = 'http://localhost:8080';
const socket = io(BASE_URL); //the / namespace/endpoint

//this function is called when the user clicks on the start button
function init() {
    draw();
    socket.emit('init', {
        playerName: player.name
    })
}

socket.on('connect', () => {
    console.log("I'm connected to the socketio server")
})

socket.on('initReturn', (data) => {
    orbs = data.orbs;
    setInterval(() => {
        socket.emit('tick', {
            xVector: player.xVector,
            yVector: player.yVector
        });
    }, 33);
})

socket.on('tock', (data) => {
    // console.log(data.players);
    players = data.players;
    // player = players.find(p => p.socketId === socket.id);
})

