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

1. Save this docker-compose.yml
2. Run this command: `docker-compose up`
3. Launch a separate terminal to access redis-cli
    - `docker exec -it redis bash`
4. Start Redis CLI
    - type `redis-cli`
5. Ping
    - `ping` -> Response `PONG`

---

#### Monitor Redis traffic

1. Run Redis CLI
    - `docker exec -it redis redis-cli`
2. Start monitoring
    - `monitor`
3. Restart servers and node client applications
4. Will see logs

```
1679579605.629002 [0 172.18.0.1:46140] "info"
1679579605.641171 [0 172.18.0.1:46140] "psubscribe" "socket.io#/#*"
1679579605.641195 [0 172.18.0.1:46140] "subscribe" "socket.io-request#/#" "socket.io-response#/#"
1679579605.641291 [0 172.18.0.1:46142] "info"
1679579605.707050 [0 172.18.0.1:46146] "info"
1679579605.707104 [0 172.18.0.1:46144] "info"
1679579605.722891 [0 172.18.0.1:46150] "info"
1679579605.723102 [0 172.18.0.1:46144] "psubscribe" "socket.io#/#*"
1679579605.723114 [0 172.18.0.1:46144] "subscribe" "socket.io-request#/#" "socket.io-response#/#"
...
```
