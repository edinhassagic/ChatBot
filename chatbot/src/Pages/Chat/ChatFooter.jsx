import React, { useState } from 'react';
import "./Chat.css"
const ChatFooter = ({ socket, room, setRoom, user, setUSer, rooms, users, setMessages, messages, setTypingStatus }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit('message', { name: room, message: message})
    setMessage('');
  };

  const handleTypingResponse = (e) => {

    socket.emit("typing",{room: room, status: `${localStorage.getItem("user")} is typing`})


  }



  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTypingResponse}
        />
        <button   className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;