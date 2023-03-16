//this is where ALL the data about a given player is stored
class Player {

    constructor(socketId, privateData, publicData) {
        this.socketId = socketId;
        this.privateData = privateData;
        this.publicData = publicData;
    }

}

module.exports = Player