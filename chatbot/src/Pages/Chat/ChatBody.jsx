import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Chat.css"
const ChatBody = ({ socket, room, setRoom, user, setUSer, rooms, users, messages, setTypingStatus, lastMessageRef, setMessages }) => {
  const [last10Messages, set10LAstMessages] = useState([])
  const navigate = useNavigate();
  /*
  
    useEffect(() => {
      socket.on('last_10_messages', (last10Messages) => {
        last10Messages = JSON.parse(last10Messages);
        setMessagesReceived((state) => [...last10Messages, ...state]);
      });
  
      return () => socket.off('last_10_messages');
    }, [socket]);
  
  
  */


  useEffect(() => {
    let currData = {
      user: "",
      message: ""
    }
    socket.on("message", (data) => {
      currData = {
        user: data.user,
        message: data.message
      }


    })

    setMessages([...messages, { user: currData.user, message: currData.message }])
    console.log(messages, "messages")

    return () => {
      socket.off("message");
    };

  }, [socket])

  useEffect(()=>{

    let currData = {
      room: "",
      messages: []
    }
    socket.on("messages", (data)=>{
        currData = {
          room: data.room,
          messages: data.messages
        }
    
    })

    setMessages(currData)
    console.log("messages:   ",messages)

    return () => {
      socket.off("messages");
    };
  }, [socket])





  useEffect(() => {
    let currData = {
      name: "",
      room: ""
    }
    socket.on("userJoinedRoom", (data) => {
      currData = {
        name: data.name,
        room: data.room
      }
    })
    
    const { name, room } = currData;
    console.log(name, "joined room")
    return () => {
      socket.off("userJoinedRoom");
    };
  }, [socket])





  const handleLeaveGroup = () => {
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Room Developers</p>
        <button className="leaveChat__btn" onClick={handleLeaveGroup}>
          LEAVE GROUP
        </button>
      </header>
      <div className="message__container">
        {(messages.length > 0) && messages.map((message, index) => (
          <div className="message__chats" key={index}>
            {message.user === user ? (
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
        ))}<div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>


    </>
  );
};

export default ChatBody;