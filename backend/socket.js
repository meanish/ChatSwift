const SocketUtils = require("./utils/SocketUtil");

module.exports = function (io) {


  io.on("connection", (socket) => {
    console.log("User is  Coonnected to a socket of id:", socket.id);
    socket.emit("connected");



    //create a new room room:selected._id
    socket.on("join_room", (room) => {
      console.log(`User entered room ${socket.id} enterd room ${room}`);
      socket.join(room);
    });


    socket.on("typing", (room) => {

      console.log("User is typing")
      // Exclude the sender's socket ID from the recipients
      const senderSocketId = socket.id;

      const roomSockets = io.sockets.adapter.rooms.get(room);

      const recipients = new Set(roomSockets);
      console.log(`Total users in room`, recipients);
      recipients.delete(senderSocketId);
      console.log(`Removed users in room`, recipients);
      recipients.forEach((recipientSocketId) => {
        socket.in(recipientSocketId).emit("typing", room);
      });
    });

    socket.on("stop_typing", (room) => {
      // Exclude the sender's socket ID from the recipients
      const senderSocketId = socket.id;
      const roomSockets = io.sockets.adapter.rooms.get(room);
      const recipients = new Set(roomSockets);
      recipients.delete(senderSocketId);

      recipients.forEach((recipientSocketId) => {
        socket.in(recipientSocketId).emit("stop_typing");
      });
    });

    socket.on("new_message", (newmsgrreceived) => {
      const recipients = SocketUtils.excludeSenderAndEmitMessage(
        //remove the sender from room
        io,
        socket,
        newmsgrreceived
      );

      // Emit the message to the recipients in the room
      recipients.forEach((recipientSocketId) => {
        socket.to(recipientSocketId).emit("message_received", newmsgrreceived);
      });
    });

    socket.on("disconnect", () => {
      socket.emit("disconnected"); //loggout false and exit
      console.log("User Dixconnected", socket.id);
    });
  });
};
