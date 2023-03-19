//Where all our main socket stuff will go
const io = require('../servers').io;
const checkForOrbCollisions = require('./collisions').checkForOrbCollisions
const checkForPlayerCollisions = require('./collisions').checkForPlayerCollisions

const PrivateData = require('./classes/PrivateData')
const PublicData = require('./classes/PublicData')
const Player = require('./classes/Player')
const Orb = require('./classes/Orb');
let orbs = [];
let settings = {
    defaultOrbs: 10,
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

        //issue a message to THIS connected socket 30 fps
        setInterval(() => {

            player.updatePosition(settings);

            const capturedOrb = checkForOrbCollisions(player.publicData, player.privateData, orbs, settings);
            capturedOrb
                .then((orbIndex) => {
                    //then runs if resolve runs! a collision happened
                    // console.log('Orb collision')
                    //emit to all sockets the orb to replace
                    io.sockets.emit('orbSwitch', {
                        orbIndex: orbIndex,
                        newOrb: orbs[orbIndex]
                    })
                    io.emit('updateLeaderBoard', getLeaderBoard());
                })
                .catch(() => {
                    //catch runs if reject runs! no collision
                    // console.log('No collision')
                });

            const playerDeath = checkForPlayerCollisions(player, players);
            playerDeath
                .then((data) => {
                    // console.log('Player collision', data);
                    io.emit('updateLeaderBoard', getLeaderBoard());
                })
                .catch(() => {
                    // console.log("no player Collision")
                });

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
        io.emit('updateLeaderBoard', getLeaderBoard());
    })
})

function getLeaderBoard() {
    const sorted = [...players];
    sorted.sort((a, b) => b.publicData.score - a.publicData.score);
    return sorted.slice(0, 10)
        .map(p => {
            return {
                name: p.publicData.name,
                score: p.publicData.score
            }
        });
}

//Run at the beginning of a new Game
function initGame() {

    for (let i = 0; i < settings.defaultOrbs; i++) {
        orbs.push(new Orb(settings));
    }

}


module.exports = io