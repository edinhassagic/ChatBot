import React, { useEffect } from "react";
import "./Chat.css";

import Rooms from "../Rooms/Rooms";

const ChatBar = ({
  socket,
  room,
  setRoom,
  user,
  setUsers,
  rooms,
  users,
  setUser,
}) => {
  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    if (localStorage.getItem("user"))
      socket.emit("login", { name: localStorage.getItem("user") });
  }, []);

  const login = () => {
    localStorage.setItem("user", user);
    socket.emit("login", { name: user });
  };

  // Convert object keys to array of usernames
  const activeUsers = users ? Object.keys(users) : [];

  return (
    <div className="chat__sidebar">
      <div className="login">
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        ></input>
        <button onClick={login}>Login</button>
      </div>
      <h2>Open Chat</h2>
      {user}

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
         {activeUsers.map((username, index) => (
            <p key={index}>{username}</p>
          ))}
        </div>
      </div>
      <Rooms
        socket={socket}
        room={room}
        setRoom={setRoom}
        user={user}
        setUsers={setUsers}
        rooms={rooms}
        users={users}
      />
    </div>
  );
};

export default ChatBar;
