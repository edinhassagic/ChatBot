import React, { useState } from "react";
import "./Chat.css";
const ChatFooter = ({
  socket,
  room,
  setRoom,
  user,
  setUSer,
  rooms,
  users,
  setMessages,
  messages,
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit("message", { name: room, message: message });
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form">
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="sendBtn">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
