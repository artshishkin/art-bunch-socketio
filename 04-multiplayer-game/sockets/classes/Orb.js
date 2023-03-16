class Orb {

    constructor(settings) {
        this.color = this.getRandomColor();
        this.locX = this.getRandomLocation(settings.worldWidth);
        this.locY = this.getRandomLocation(settings.worldHeight);
        this.radius = 5;
    }

    getRandomColor() {
        const r = Math.floor(Math.random() * 200) + 50;
        const g = Math.floor(Math.random() * 200) + 50;
        const b = Math.floor(Math.random() * 200) + 50;
        return `rgb(${r},${g},${b})`;
    }

    getRandomLocation(maxSize) {
        return Math.floor(Math.random() * maxSize);
    }
}

module.exports = Orb