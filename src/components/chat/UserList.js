import React from 'react';

const UserList = props => {
  const { activeUser, activeChats, activeChatUser, connectedUsers, setActiveChat } = props;

  const onActiveChatHandler = (connectedUser) => {
    setActiveChat(connectedUser);
  }

  const getUnreadMessageCount = (connectedUser) => {
    const unreadMessage = activeChats.filter(chat => chat.toUsername === activeUser.username && chat.fromUsernname === connectedUser.username && chat.read === false);
    if (unreadMessage.length > 0) {
      return `(${unreadMessage.length} Unread)`
    }
    return null;
  }

  const getActiveUser = () => {
    return connectedUsers
      .filter(connectedUser => connectedUser.username !== activeUser.username)
      .map(connectedUser => (
        <li
          key={connectedUser.id}
          className={activeChatUser && connectedUser.username === activeChatUser.username ? 'active-chat' : null}
          onClick={() => onActiveChatHandler(connectedUser)}>
          <i className="fas fa-user"></i> {connectedUser.username} {getUnreadMessageCount(connectedUser)}
        </li>
      ))
  }

  return (
    <ul id="users" >{getActiveUser()}</ul>
  )
}

export default UserList;