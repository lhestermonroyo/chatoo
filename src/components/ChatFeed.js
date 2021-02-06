import React from 'react';
import MessageForm from './MessageForm';
import UserMessage from './UserMessage';
import OtherMessage from './OtherMessage';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, userMessage) => {
    return chat.people.map(
      (person, i) =>
        person.last_read === message.id && (
          <div
            key={`read-${i}`}
            className='read-receipt'
            style={{
              float: userMessage ? 'right' : 'left',
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, i) => {
      const message = messages[key];
      const lastMessageKey = i === 0 ? null : keys[i - 1];
      const userMessage = userName === message.sender.username;

      return (
        <div key={`msg-${i}`} style={{ width: '100%' }}>
          <div className='message-block'>
            {userMessage ? (
              <UserMessage message={message} />
            ) : (
              <OtherMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className='read-receipts'
            style={{
              marginRight: userMessage ? 18 : 0,
              marginLeft: userMessage ? 0 : 68,
            }}
          >
            {renderReadReceipts(message, userMessage)}
          </div>
        </div>
      );
    });
  };

  const handleLogOut = () => {
    localStorage.clear();

    window.location.reload();
  };

  if (!chat)
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

  return (
    <React.Fragment>
      <div className='chat-feed'>
        <div className='chat-title-container'>
          <button className='sign-out-button' onClick={() => handleLogOut()}>
            <i className='fa fa-sign-out-alt fa-fw' />
          </button>
          <div className='chat-title'>{chat.title}</div>
          <div className='chat-subtitle'>
            {chat.people.map((person) => ` ${person.person.username}`)}
          </div>
        </div>
        {renderMessages()}
        <div style={{ height: 30 }} />
        <div className='message-form-container'>
          <MessageForm {...props} chatId={activeChat} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatFeed;
