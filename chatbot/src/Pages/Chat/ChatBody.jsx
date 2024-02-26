import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Chat.css"
const ChatBody = ({ socket, room, setRoom, user, setUSer, rooms, users, messages, typingStatus, setTypingStatus, lastMessageRef, setMessages }) => {
  const [last10Messages, set10LAstMessages] = useState([])
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("")
  useEffect(() => {
    socket.on("message", (data) => {
      setTypingStatus("")
      setMessages([...messages, data])
    })
    return () => {
      socket.off("message");
    };
  }, [socket, messages])


  useEffect(() => {
    socket.on("messages", (data) => {
      setMessages(data.messages);
    });
    return () => {
      socket.off("messages");
    };
  }, [socket, messages])


  useEffect(()=>{
      setTimeout(()=>{
        setAlertMessage("")
      }, 5000)

  }, [alertMessage])


  useEffect(() => {
    let currData = {
      name: "",
      room: "",
    };
    socket.on("userJoinedRoom", (data) => {
      currData = {
        name: data.name,
        room: data.room
      }
      setAlertMessage({ user: "", message: `${currData.name} Joined This Room` })

    })



    
    const { name, room } = currData;
    return () => {
      socket.off("userJoinedRoom");
    };
  }, [socket]);



  useEffect(() => {

    socket.on("typingResponse", data => setTypingStatus(data.status))
  }, [socket])

  const handleLeaveGroup = () => {
    setMessages([])
    socket.emit("leaveRoom", { name: room })

  };

  const handleDeleteGroup = () => {
    socket.emit("deleteRoom", { name: room })

  }


  useEffect(()=>{
    socket.on("userLeftRoom", data => {
      setAlertMessage({user: "", message: `${data.name} left room`})

    })
  }, [socket])


  useEffect(() => {
    socket.on("roomDeleted", data => {
      setAlertMessage({ user: "", message: "This room is deleted" })

    })


  }, [socket, rooms])


  return (
    <>
      <header className="chat__mainHeader">
        {room && <><p>Room Developers</p>
          <button className="leaveChat__btn" onClick={handleLeaveGroup}>
            LEAVE GROUP
          </button><button className="leaveChat__btn" onClick={handleDeleteGroup}>
            DELETE GROUP
          </button>
        </>}
      </header>
      <div className="message__container">
        {(messages.length > 0) && messages.map((message, index) => (
          <div className="message__chats" key={index}>
            {(message.user === user) && (
              <>
                <p className="sender__name">{message.user}</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </>
            )}{message.user != "" && message.user != user && (
              <>
                <p>{message.user}</p>
                <div className="message__recipient">
                  <p>{message.message}</p>
                </div>
              </>
            )}
            {message.user === ""  && (
              <>
                <p>{message.user}</p>
                <div className="message__recipient" style={{ backgroundColor: "grey" }}>
                  <p>{message.message}</p>
                </div>
              </>
            )}
            
          </div>
        ))}
        {alertMessage != "" && <div className="message__recipient" style={{ backgroundColor: "grey" }}>
              <p>{alertMessage.message}</p>
            </div>}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
