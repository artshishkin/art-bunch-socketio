// http is a core node module
const http = require('http'); //basic HTTP server, part of Node.js
// ws is a 3rd party module
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('I am connected!');
});

server.listen(8000);
