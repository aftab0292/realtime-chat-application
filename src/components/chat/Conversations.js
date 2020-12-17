import React from 'react';

const Conversations = props => {
	const { activeUser, activeChatUser, activeChats } = props;
	console.log(activeUser, activeChatUser, JSON.stringify(activeChats))
	return (
		<div className="chat-messages">
			{
				activeChats
					.filter(chat => chat.users.includes(activeUser.id) && chat.users.includes(activeChatUser.id))
					.map(chat => (
						<div className="message" key={chat.id}>
							<p className="meta">{chat.fromUsernname} <span>{chat.time}</span></p>
							<p className="text">{chat.message}</p>
						</div>
					))
			}
		</div>
	)
}

export default Conversations;