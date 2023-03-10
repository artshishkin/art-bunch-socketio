class Room {

    constructor(roomId, name, namespace, privateRoom = false) {
        this.roomId = roomId;
        this.roomTitle = name;
        this.namespace = namespace;
        this.privateRoom = privateRoom;
        this.history = [];
    }

    addMessage(message) {
        this.history.push(message);
    }

    clearHistory() {
        this.history = [];
    }
}

module.exports = Room;