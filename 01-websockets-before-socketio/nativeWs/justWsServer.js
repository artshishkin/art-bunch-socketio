// http is a core node module
const http = require('http'); //basic HTTP server, part of Node.js
// ws is a 3rd party module
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('I am connected!');
});

//WebSocket Server
const wss = new websocket.WebSocketServer({
    //server: server //as it is the same syntax allows use just `server`
    server
})

wss.on('headers', (headers, req) => {
    console.log("on Headers")
    console.log(headers);
    // console.log(req);
})

wss.on('connection', (ws, req) => {
    console.log("on Connection")
    // console.log(ws);
    ws.send('Welcome to the websocket server!!!');

    ws.on('message', (data) => {
        console.log(data.toString())
    })

})


server.listen(8000);
