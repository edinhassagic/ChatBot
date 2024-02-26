import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
const ChatBody = ({
  socket,
  room,
  setRoom,
  user,
  setUSer,
  rooms,
  users,
  messages,
  setTypingStatus,
  lastMessageRef,
  setMessages,
}) => {
  const [last10Messages, set10LAstMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);

      console.log("dosao");
    });
    return () => {
      socket.off("message");
    };
  }, [socket, messages]);

  useEffect(() => {
    socket.on("messages", (data) => {
      setMessages(data.messages);
    });
    return () => {
      socket.off("messages");
    };
  }, [socket, messages]);

  useEffect(() => {
    let currData = {
      name: "",
      room: "",
    };
    socket.on("userJoinedRoom", (data) => {
      currData = {
        name: data.name,
        room: data.room,
      };
    });

    console.log("currdata", currData);

    const { name, room } = currData;
    console.log("name", "joined room");
    return () => {
      socket.off("userJoinedRoom");
    };
  }, [socket]);

  const handleLeaveGroup = () => {};

  return (
    <>
      <header className="chat__mainHeader">
        <p>Room Developers</p>
        <button className="leaveChat__btn" onClick={handleLeaveGroup}>
          LEAVE GROUP
        </button>
      </header>
      <div className="message__container">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div className="message__chats" key={index}>
              {message.user === localStorage.getItem("user") ? (
                <>
                  <p className="sender__name">{message.user}</p>
                  <div className="message__sender">
                    <p>{message.message}</p>
                  </div>
                </>
              ) : (
                <>
                  <p>{message.user}</p>
                  <div className="message__recipient">
                    <p>{message.message}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
