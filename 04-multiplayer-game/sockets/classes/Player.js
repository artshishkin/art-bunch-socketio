//this is where ALL the data about a given player is stored
class Player {

    constructor(socketId, privateData, publicData) {
        this.socketId = socketId;
        this.privateData = privateData;
        this.publicData = publicData;
    }

    updatePosition(settings) {
        const distX = this.privateData.xVector;
        const distY = this.privateData.yVector;
        const speed = this.privateData.speed;
        const distAbs = Math.sqrt(distX * distX + distY * distY);

        let deltaX = speed * distX / distAbs;
        if (deltaX) this.publicData.locX += deltaX;
        let deltaY = speed * distY / distAbs;
        if (deltaY) this.publicData.locY += deltaY;

        const worldWidth = settings.worldWidth;
        const worldHeight = settings.worldHeight;

        if (this.publicData.locX < 5) this.publicData.locX = 5;
        if (this.publicData.locX > worldWidth - 5) this.publicData.locX = worldWidth - 5;
        if (this.publicData.locY < 5) this.publicData.locY = 5;
        if (this.publicData.locY > worldHeight - 5) this.publicData.locY = worldHeight - 5;
    }

}

module.exports = Player