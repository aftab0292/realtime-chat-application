// External Imports
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const users = [];
const activeChats = [];

exports.createUser = (socket_id, username) => ({
  id: uuidv4(),
  socket_id,
  username
})

exports.addUser = (newUser) => {
  const existingUserIndex = users.findIndex(existingUser => {
    return existingUser.username === newUser.username
  })
  if (existingUserIndex !== -1) {
    console.info(`Existing Users`, JSON.stringify(users));
    return users;
  }
  // Store User
  users.push(newUser);
  console.info(`Connected Users`, JSON.stringify(users));
  return users;
}

exports.removeUsers = (socket_id) => {
  const index = users.findIndex(user => user.socket_id === socket_id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

exports.resetUnreadMessageCount = (sender, receiver) => {
  activeChats.forEach(chat => {
    if(chat.users.includes(sender.id) &&chat.users.includes(receiver.id)){
      chat.read = true
    }
  })
  return activeChats;
}
exports.fetchConnectedUserCountLog = () => {
  console.debug(`Total number of connected users are: ${users.length}`);
}
exports.getConnectedUsers = () => {
  return users;
}

exports.createChat = (sender, receiver, message) => {
  activeChats.push({
    id: uuidv4(),
    fromUsernname: sender.username,
    toUsername: receiver.username,
    message,
    users: [sender.id, receiver.id],
    time: moment().format('h:mm a'),
    read: false
  });
  return activeChats;
};

exports.isUsernameExist = (username) => {
  const existingUserIndex = users.findIndex(user => user.username === username);
  console.debug(`existingUserIndex`, existingUserIndex)
  if (existingUserIndex !== -1) {
    console.info(`Existing Users`, JSON.stringify(users[existingUserIndex]));
    return true;
  }
  return false;
}