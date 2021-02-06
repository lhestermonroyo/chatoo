import React, { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (e) => {
    setValue(e.target.value);

    isTyping(props, chatId);
  };

  const handleUpload = (e) => {
    sendMessage(creds, chatId, { files: e.target.files, text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = value.trim();

    if (text.length !== 0) sendMessage(creds, chatId, { text });

    setValue('');
  };

  return (
    <form className='message-form' onSubmit={handleSubmit}>
      <input
        className='message-input'
        placeholder='Send a message...'
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor='upload-button'>
        <span className='image-button'>
          <i className='fa fa-camera fa-fw picture-icon' />
        </span>
      </label>
      <input
        type='file'
        multiple={false}
        id='upload-button'
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <button type='submit' className='send-button'>
        <i className='fa fa-paper-plane fa-fw' />
      </button>
    </form>
  );
};

export default MessageForm;
