import React, { useState } from 'react';
export const LoginForm = (props) => {
  const { socket, setUser } = props;
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    socket.emit('VERIFY_USER', username, validateUser)
  }

  const onChangeHandler = (event) => {
    setUsername(event.target.value);
  }

  const validateUser = ({ user, isUsernameExist }) => {
    if (isUsernameExist) {
      setError('This username already exists');
    } else {
      setUser(user);
      setErrorMessage(null)
    }
  }

  const setError = (error) => {
    setErrorMessage(error);
  }

  return (
    <div className="join-container">
      <header className="join-header">
        <h1><i className="fas fa-smile"></i> Chat App</h1>
      </header>
      <main className="join-main">
        <form onSubmit={onSubmitHandler}>
          <div className="form-control">
            <div className="error">{errorMessage ? errorMessage : null}</div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={onChangeHandler}
              placeholder="Enter username..."
              required
            />
          </div>
          <button type="submit" className="btn">Join Chat</button>
        </form>
      </main>
    </div>
  )
}

export default LoginForm
