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
    players = data.players;
    player.locX = data.playerX;
    player.locY = data.playerY;
    player.score = data.player.publicData.score;
    // player = players.find(p => p.socketId === socket.id);
    $('.player-score').text(player.score);
})

socket.on('orbSwitch', (data) => {
    const orbIndex = data.orbIndex;
    const newOrb = data.newOrb;
    orbs.splice(orbIndex, 1, newOrb);
})

socket.on('updateLeaderBoard', (leaders) => {
    const $leaderboardPlayer = $('.leader-board');
    $leaderboardPlayer.empty();

    leaders.forEach(p => $leaderboardPlayer
        .append(`<li class = "leaderboard-player">${p.name} - ${p.score}</li>`)
    );
})

socket.on('playerDeath', (data) => {
    // console.log(data);
    if (data.diedId === socket.id) {
        $('.player-name').text(player.name);
        $('#spawnModal').modal('show');
    }
    $('#game-message')
        .html(`${data.died.name} obsorbed by ${data.killedBy.name}`)
        .css({
            "background-color": "#00e6e6",
            "opacity": 1
        })
        .show()
        .fadeOut(5000);
})
