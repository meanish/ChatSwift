import io from "socket.io-client";

const socket = io(process.env.ENDPOINT);

export default socket;
