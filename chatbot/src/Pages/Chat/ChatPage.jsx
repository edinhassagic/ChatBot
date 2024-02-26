import React, { useEffect, useState, useRef } from 'react';
import ChatBar from "./ChatBar";
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./Chat.css"

const ChatPage = ({ socket }) => {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState("")



  useEffect(() => {

    socket.on('rooms', (data) => {
      
      setRooms(data)

    })
    console.log(rooms, "room")

  }, [socket])

  useEffect(() => {

    socket.on('users', (data) => {

      setUsers(data);

    })


  }, [socket])

 


/*
  useEffect(() => {
    socket.on('typing_response', data => setTypingStatus(data))

    return () => socket.off('typing_response')
  }, [socket])


  useEffect(() => {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);*/

  return (
    <div className="chat">



    
      <ChatBar socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} setUser={setUser}/>
      <div className="chat__main">
        <ChatBody socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} setMessages= {setMessages} />
        <ChatFooter socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} setMessages={setMessages} messages={messages} />
      </div>
    </div>
  );
};

export default ChatPage;