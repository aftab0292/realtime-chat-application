import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import ChatContainer from './chat/ChatContainer';

const socketUrl = "http://localhost:3007"

const Layout = props => {

  const [socket, setSocket] = useState('');
  const [activeUser, setActiveUser] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [activeChats, setActiveChats] = useState([]);

  useEffect(() => {
    initSocket()
    return () => {

    }
  }, []);

  const initSocket = () => {
    const socket = io(socketUrl)
    
    socket.on('connect', () => {
      console.log("Connected");
    })

    socket.on('CONNECTED_USERS', (users) => {
      console.log('CONNECTED_USERS', users);
      setConnectedUsers(users)
    });

    socket.on('MESSAGE_RECIEVED', (chats) => {
      console.log('MESSAGE_RECIEVED', chats);
      setActiveChats(chats)
    });

    setSocket(socket)
  }

  const addUser = (user) => {
    socket.emit('USER_CONNECTED', user);
    setActiveUser(user);
  }

  const renderPage = (user) => {
    if (!user) {
      return <LoginForm socket={socket} setUser={addUser} />
    }
    return <ChatContainer socket={socket} activeUser={activeUser} activeChats={activeChats} connectedUsers={connectedUsers} />
  }

  return (
    <div className="container">
      {renderPage(activeUser)}
    </div>
  );
}
export default Layout;
