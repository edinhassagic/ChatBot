import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "./Chat.css";

const ChatPage = ({ socket }) => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    socket.on('rooms', (data) => {
      setRooms(data)
    })
  }, [socket, rooms])

  useEffect(() => {
    socket.on('users', (data) => {
      setUsers(data);
    })
  }, [socket, users])




  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} setUser={setUser} />
      <div className="chat__main">
        <ChatBody socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} messages={messages} typingStatus={typingStatus} setTypingStatus={setTypingStatus} lastMessageRef={lastMessageRef} setMessages={setMessages} />
        <ChatFooter socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} setMessages={setMessages} messages={messages} setTypingStatus={setTypingStatus} />
      </div>
    </div>
  );
};

export default ChatPage;
