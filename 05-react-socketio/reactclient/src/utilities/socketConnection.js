import io from 'socket.io-client';

const BASE_URL = 'http://localhost:8181';

let socket = io.connect(BASE_URL);

console.log(socket);

socket.emit('clientAuth', 'nke8kwje3230mkmsk_uiClientApiKey');

export default socket;