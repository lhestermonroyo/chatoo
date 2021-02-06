import axios from 'axios';
import React, { useState } from 'react';

const LoginForm = () => {
  const [formFields, setFormFields] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      'Project-ID': '5466c855-7287-4d11-b633-36171ccbcf76',
      'User-Name': formFields.username,
      'User-Secret': formFields.password,
    };

    const config = {
      headers: authObject,
    };

    try {
      setLoading(true);
      await axios.get('https://api.chatengine.io/chats', config);

      localStorage.setItem('username', formFields.username);
      localStorage.setItem('password', formFields.password);

      window.location.reload();
    } catch (error) {
      alert(`An error occured: ${error}`);
      setLoading(false);
    }
  };

  return (
    <div className='login-screen'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Chatoo</h1>
        <p>Your online chatting app.</p>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={(e) => handleChange(e)}
          value={formFields.username}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e) => handleChange(e)}
          value={formFields.password}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? `Loading...` : `Log In`}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
