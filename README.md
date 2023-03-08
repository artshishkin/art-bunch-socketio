[![GitHub issues](https://img.shields.io/github/issues/artshishkin/art-bunch-socketio)](https://github.com/artshishkin/art-bunch-socketio/issues)
![Project licence][licence]

# art-bunch-socketio

Socket.IO (with websockets) - the details. (socket io v2) - Tutorial from Robert Bunch (Udemy)

---

### Section 2: Websockets - Before Socketio...

#### 5. Housekeeping - How I do node/express

1. Install nodemon globally
    - `npm install -g nodemon`
2. Run nodemon
    - `cd 01-websockets-before-socketio`
    - `nodemon howidonode.js` instead of node `howidonode.js`
    - **or**
    - `npx nodemon howidonode.js` (if nodemone installed locally)

#### 9. A short overview of native websockets (finally some code!!)

1. Client
    - [The WebSocket API (WebSockets)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
2. Server
    - [ws: a Node.js WebSocket library](https://www.npmjs.com/package/ws)
    - `npm init -y`
    - `npm install ws`
3. Run server
    - `nodemon justWsServer.js`
    - check
    - curl [http://localhost:8000](http://localhost:8000)

---

### Section 3: Socket.io 101

#### 12. The basics & socket.io vs. ws

- `npm init`
- `npm instal socket.io --save`
- test with Postman
- New &rarr; WebSocket Request
- `ws://localhost:8000`
- Message: `hi`
- Add Event Listener:
    - Events &rarr; Add `message`
    - Events &rarr; Add `welcome` (custom event)
- Event name: `message` &rarr; Send



[licence]: https://img.shields.io/github/license/artshishkin/art-bunch-socketio.svg