function excludeSenderAndEmitMessage(io, socket, newmsgrreceived) {

  const roomId = newmsgrreceived.chat._id;
  const message = newmsgrreceived.message;

  // Exclude the sender's socket ID from the recipients
  const senderSocketId = socket.id;

  const roomSockets = io.sockets.adapter.rooms.get(roomId);

  const recipients = new Set(roomSockets);
  recipients.delete(senderSocketId);

  return recipients; //This excludes the admin one who sends the msg
}

module.exports = {
  excludeSenderAndEmitMessage,
};
