import React, { useEffect, useState, useRef } from 'react';
import ChatBar from "./ChatBar";
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./Chat.css"

const ChatPage = ({socket}) => {
  const [user, setUSer] = useState("")
  const [room, setRoom] = useState("")
  const [rooms, setRooms] = useState([])
  const [users, setUSers] = useState([])
  const [messages, setMessages] = useState([])
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState("")



  useEffect(()=>{

    socket.on('rooms', (data)=> {

      setRooms(data)

    })


  }, [socket])




  useEffect(()=> {
    socket.on('typing_response', data => setTypingStatus(data))

    return ()=> socket.off('typing_response')
  }, [socket])


  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} room={room} setRoom={setRoom} user={user} setUSer={setRoom} rooms={rooms} users={users} />
      <div className="chat__main">
        <ChatBody socket={socket} room={room} setRoom={setRoom} user={user} setUSer={setRoom} rooms={rooms} users={users} messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} room={room} setRoom={setRoom} user={user} setUSer={setRoom} rooms={rooms} users={users}  />
      </div>
    </div>
  );
};

export default ChatPage;