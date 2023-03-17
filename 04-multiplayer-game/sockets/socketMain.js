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

    // io.in('game').fetchSockets().then((clients) => {
    //     console.log('clients in room `game`:', clients.map(soc => soc.id));
    // });

    let player = {};

    socket.on('init', (data) => {

        //add the user to the `game` room
        socket.join('game');

        const privateData = new PrivateData(settings);
        const publicData = new PublicData(data.playerName, settings);
        player = new Player(socket.id, privateData, publicData);
        players.push(player);

        //issue a message to EVERY connected socket 30 fps
        setInterval(() => {

            player.updatePosition(settings);

            socket.emit('tock', {
                players: players.map(p => p.publicData),
                playerX: player.publicData.locX,
                playerY: player.publicData.locY
            })
        }, 33)

        socket.emit('initReturn', {
            orbs
        })
    })

    socket.on('tick', (data) => {
        if (player.privateData) {
            player.privateData.xVector = data.xVector;
            player.privateData.yVector = data.yVector;
        }
    });

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