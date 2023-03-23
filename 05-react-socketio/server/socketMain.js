function socketMain(io, socket) {
    console.log(`Socket connected ${socket.id}`)
    // console.log("Someone called me! I'm socketMain")

    socket.on('clientAuth', (key) => {
        if (key === 'jdkf8j8n3kme9sdk_nodeClientApiKey') {
            //valid Node Client
            socket.join('clients');
        } else if (key === 'nke8kwje3230mkmsk_uiClientApiKey') {
            //valid UI client
            socket.join('ui');
        } else {
            //an invalid client has joined. Goodbye
            console.log('an invalid client has joined. Goodbye');
            socket.disconnect(true);
        }
    })

    socket.on('perfData', (data) => {
        console.log(data);
    })
}

module.exports = socketMain;