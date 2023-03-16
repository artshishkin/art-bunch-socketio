//Where all our main socket stuff will go
const io = require('../servers').io;

const Orb = require('./classes/Orb');
let orbs = [];
const ORB_COUNT = 500;

initGame();

io.sockets.on('connect',(socket)=>{
    socket.emit('init',{
        orbs
    })
})

//Run at the beginning of a new Game
function initGame() {

    for (let i = 0; i < ORB_COUNT; i++) {
        orbs.push(new Orb());
    }

}


module.exports = io