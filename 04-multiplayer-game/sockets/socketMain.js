//Where all our main socket stuff will go
const io = require('../servers').io;

const PrivateData = require('./classes/PrivateData')
const PublicData = require('./classes/PublicData')
const Player = require('./classes/Player')
const Orb = require('./classes/Orb');
let orbs = [];
let settings = {
    defaultOrbs: 500,
    defaultSpeed: 6,
    defaultSize: 6,
    // as the player gets bigger  the zoom needs to go out
    defaultZoom: 1.5,
    worldWidth: 500,
    worldHeight: 500,
}

let players = [];

initGame();

io.sockets.on('connect', (socket) => {

    const privateData = new PrivateData(settings);
    const publicData = new PublicData('Art', settings);
    const player = new Player(socket.id, privateData, publicData);
    players.push(player);

    socket.emit('init', {
        orbs
    })

    socket.on('disconnect', () => {
        players = players.filter(pl => pl.socketId !== socket.id);
    })
})

//Run at the beginning of a new Game
function initGame() {

    for (let i = 0; i < settings.defaultOrbs; i++) {
        orbs.push(new Orb(settings));
    }

}


module.exports = io