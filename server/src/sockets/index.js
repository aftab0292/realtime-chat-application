/**
 * Socket.io configuration
 */

// User Helpers 
const userHelper = require('./user')

// When the user disconnects.. perform this
const onDisconnect = (socket, io) => {
  userHelper.removeUsers(socket.id)
  userHelper.fetchConnectedUserCountLog();
  io.emit('CONNECTED_USERS', userHelper.getConnectedUsers())
}

// When the user connects.. perform this
const onConnect = (socket, io) => {
  console.debug(`New user connected with socket id: ${socket.id}`);
  userHelper.fetchConnectedUserCountLog();
  
  // To Verify Username
  socket.on('VERIFY_USER', (username, callback) => {
    if (userHelper.isUsernameExist(username)) {
      callback({ isUsernameExist: true, user: null });
    } else {
      const newUser = userHelper.createUser(socket.id, username);
      callback({ isUsernameExist: false, user: newUser });
    }
  });

  //User Connects with username
  socket.on('USER_CONNECTED', (user) => {
    const connectedUsers = userHelper.addUser(user)
    io.emit('CONNECTED_USERS', connectedUsers)
    console.log(connectedUsers);
  })

  socket.on('MESSAGE_SENT', ({ sender, receiver, message }) => {
    console.log('MESSAGE_SENT', sender, receiver, message)
    const activeChats = userHelper.createChat(sender, receiver, message)
    socket.to(receiver.socket_id).emit('MESSAGE_RECIEVED', activeChats)
    socket.emit('MESSAGE_RECIEVED', activeChats)
  })

  socket.on('RESET_UNREAD_MESSAGE_COUNT', ({ sender, receiver }) => {
    const activeChats = userHelper.resetUnreadMessageCount(sender, receiver)
    io.emit('MESSAGE_RECIEVED', activeChats)
  })
}

module.exports = (socketio) => {
  socketio.on('connection', (socket) => {
    // Call onDisconnect.
    socket.on('disconnect', () => {
      console.log('CLIENT DISCONNECTED');
      onDisconnect(socket, socketio);
    });
    console.log('CLIENT CONNECTED');
    // Call onConnect.
    onConnect(socket, socketio);
  });
};
