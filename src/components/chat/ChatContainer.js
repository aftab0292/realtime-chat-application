import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import Conversations from './Conversations';
import UserList from './UserList';

const ChatContainer = props => {
  const { socket, activeUser, connectedUsers, activeChats } = props;
  const [activeChatUser, setActiveChatUser] = useState('');
  const [chatTitle, setChatTitle] = useState('');

  useEffect(() => {
    setChatTitle(<h1><i className="fas fa-user"></i> {activeUser.username}</h1>)
  }, [activeUser])

  const handleActiveChatUser = (user) => {
    console.log('handleActiveChatUser', user);
    setActiveChatUser(user)
    const chatTitleChange = `${activeUser.username} & ${user.username}`
    setChatTitle(<h1><i className="fas fa-comments"></i> {chatTitleChange}</h1>)
    socket.emit('RESET_UNREAD_MESSAGE_COUNT', { sender: activeUser, receiver: user });
  }

  const sendMessageHandler = (message) => {
    socket.emit('MESSAGE_SENT', { sender: activeUser, receiver: activeChatUser, message: message });
  }

  const getDefaultConversations = () => {
    return (
      <div className="chat-messages">
        <div className="message">
          <p className="text">Welcome {activeUser.username}, Please select user to initiate chat!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> Chat App</h1>
        {chatTitle}
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-users"></i> Users</h3>
          <UserList
            activeUser={activeUser}
            activeChats={activeChats}
            activeChatUser={activeChatUser}
            connectedUsers={connectedUsers}
            setActiveChat={handleActiveChatUser}
          />
        </div>
        {activeChatUser ?
          <Conversations
            activeUser={activeUser}
            activeChatUser={activeChatUser}
            activeChats={activeChats}
          /> : getDefaultConversations()}
      </main>
      < MessageInput activeChatUser={activeChatUser} sendMessage={sendMessageHandler} />
    </div>
  )
}

export default ChatContainer