import React from 'react';

const OtherMessage = (props) => {
  const { message, lastMessage } = props;

  const isFirstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;

  return (
    <div className='message-row'>
      {isFirstMessageByUser && (
        <div
          className='message-avatar'
          style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
        />
      )}
      {message?.attachments?.length > 0 ? (
        <img
          src={message.attachments[0].file}
          alt='message-attachment'
          className='message-image'
          style={{ marginLeft: isFirstMessageByUser ? 4 : 48 }}
        />
      ) : (
        <div
          className='message'
          style={{
            float: 'left',
            background: '#cabcdc',
            marginLeft: isFirstMessageByUser ? 4 : 48,
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default OtherMessage;
