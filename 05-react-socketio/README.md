### Initialization

---
#### Node Client module

- `npm init -y`
- `npm install farmhash`
- `npm install socket.io-client`

---
#### Server module

- `npm init -y`
- `npm install socket.io`
- `npm install socket.io-client`
- `npm install farmhash`

---
#### React Client module 

- `npm install create-react-app -g` - globally
- `npx create-react-app reactclient`

---
#### Redis Setup Using Docker

1.  Save this docker-compose.yml
2.  Run this command: `docker-compose up`
3.  Launch a separate terminal to access redis-cli
    -  `docker exec -it redis bash`
4.  Start Redis CLI
    -  type `redis-cli`
5.  Ping
    -  `ping` -> Response `PONG` 