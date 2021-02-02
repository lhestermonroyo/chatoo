import React from 'react';
import './App.css';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';

const App = () => {
  return (
    <React.Fragment>
      <ChatEngine
        height={`100vh`}
        publicKey={`5466c855-7287-4d11-b633-36171ccbcf76`}
        userName={`lhestermonroyo`}
        userSecret={`123456789`}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </React.Fragment>
  );
};

export default App;
