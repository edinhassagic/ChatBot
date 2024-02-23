import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Chat.css"
const ChatBody = ({socket, room, setRoom, user, setUSer, rooms, users, messages, setTypingStatus, lastMessageRef}) => {
  const [last10Messages, set10LAstMessages] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    socket.on('last_10_messages', (last10Messages) => {
      last10Messages = JSON.parse(last10Messages);
      setMessagesReceived((state) => [...last10Messages, ...state]);
    });

    return () => socket.off('last_10_messages');
  }, [socket]);




  const handleLeaveGroup = () => {
    socket.emit('leave_group', {user, room});
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Room Developers</p>
        <button className="leaveChat__btn" onClick={handleLeaveGroup}>
          LEAVE GROUP
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        {/*This shows messages received by you*/}
        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>
        </div>

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;