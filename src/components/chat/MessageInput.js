import React, { useState } from 'react';

const MessageInput = props => {

  const { sendMessage, activeChatUser } = props;

  const [message, setMessage] = useState('');

  const onSubmitHandler = event => {
    event.preventDefault();
    console.log('message', message);
    sendMessage(message)
    setMessage('')
  }

  const onChangeHandler = event => {
    setMessage(event.target.value);
  }

  return (
    <div className="chat-form-container">
      <form id="chat-form" onSubmit={onSubmitHandler}>
        <input
          id="msg"
          type="text"
          value={message}
          onChange={onChangeHandler}
          placeholder="Enter Message"
          required
          autoComplete="off"
        />
        <button type="submit" className="btn" disabled={!activeChatUser} ><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
  )
}

export default MessageInput;