// import io from "socket.io-client";

// const socket = io('http://localhost:8000');

// export default socket;



import io from "socket.io-client";

const socket = io('https://tranquilbytes.com', {
    path: '/chatswift/socket.io' // Custom path for socket.io
});

export default socket;