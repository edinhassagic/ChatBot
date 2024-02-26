import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Chat.css"
const ChatBody = ({ socket, room, setRoom, user, setUSer, rooms, users, messages, typingStatus, setTypingStatus, lastMessageRef, setMessages }) => {
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

    const [alertMessage,setAlertMessage] = useState("")


  useEffect(() => {

    socket.on("message", (data) => {
      setTypingStatus("")

      setMessages([...messages, data])

      console.log("dosao")
    })
    return () => {
      socket.off("message");
    };
  }, [socket, messages])



  useEffect(() => {

    socket.on("messages", (data) => {
      setMessages(data.messages)

    })
    return () => {
      socket.off("messages");
    };
  }, [socket, messages])





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

    console.log("currdata", currData)

    const { name, room } = currData;
    console.log("name", "joined room")
    return () => {
      socket.off("userJoinedRoom");
    };
  }, [socket])


  useEffect(() => {

    socket.on("typingResponse", data => setTypingStatus(data.status))
  }, [socket])

  const handleLeaveGroup = () => {
    setMessages([])
    socket.emit("leaveRoom", {name: room})

  };

  const handleDeleteGroup =() => {
    socket.emit("deleteRoom", {name: room})

  }



  useEffect(()=> {
    socket.on('userLeftRoom', (data) => {
      
      console.log(messages + "messages")
      setMessages([...messages, {user: "", message: `${data.name} left this room`}])
      console.log("u svim korisnicima sam primio")
    })
    

  }, [socket, messages]) 
  
  useEffect(()=> {
    socket.on("roomDeleted", data => {
      setAlertMessage({user:"", message: "This room is deleted"})

    })


  }, [socket, rooms])

  return (
    <>
      <header className="chat__mainHeader">
        <p>Room Developers</p>
        <button className="leaveChat__btn" onClick={handleLeaveGroup}>
          LEAVE GROUP
        </button><button className="leaveChat__btn" onClick={handleDeleteGroup}>
          DELETE GROUP
        </button>
      </header>
      <div className="message__container">
        {(messages.length > 0) && messages.map((message, index) => (
          <div className="message__chats" key={index}>
            {(message.user === localStorage.getItem("user")) && (
              <>
                <p className="sender__name">{message.user}</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </>
            ) }{message.user != "" && message.user != localStorage.getItem("user") && ( 
              <>
                <p>{message.user}</p>
                <div className="message__recipient">
                  <p>{message.message}</p>
                </div>
              </>
            )}
            { message.user ==="" && (
              <>
              <p>{message.user}</p>
              <div className="message__recipient" style={{backgroundColor : "grey"}}>
                <p>{message.message}</p>
              </div>
            </>
            )}
            <div className="message__recipient" style={{backgroundColor : "grey"}}>
                <p>{alertMessage.message}</p>
                <button onClick={setMessages([])}> OK </button>
              </div>
          </div>
        ))}<div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>


    </>
  );
};

export default ChatBody;