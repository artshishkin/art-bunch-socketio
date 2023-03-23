function socketMain(io, socket) {
    console.log(`Socket connected ${socket.id}`)
    // console.log("Someone called me! I'm socketMain")
    socket.on('perfData', (data) => {
        console.log(data);
    })
}

module.exports = socketMain;