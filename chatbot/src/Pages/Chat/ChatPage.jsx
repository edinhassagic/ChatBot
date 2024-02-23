import React from 'react';
import ChatBar from "./ChatBar";
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./Chat.css"

const ChatPage = () => {
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPage;