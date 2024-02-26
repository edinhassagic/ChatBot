import React, { useEffect } from "react";
import "./Chat.css";

import Rooms from "../Rooms/Rooms";

const ChatBar = ({ socket, room, setRoom, user, setUsers, rooms, users , setUser}) => {
  useEffect(() => {
    console.log(users)
  }, [users])


  const login = () => {
    socket.emit('login', { name: user });


  }

  return (
    <div className="chat__sidebar">

      <div className='login'>
        <input type='text' placeholder="Enter your username" onChange={(e) => { setUser(e.target.value) }} ></input>
        <button onClick={login}>Login</button>
      </div>
      <h2>Open Chat</h2>
      {user}

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p>
        </div>
      </div>
      <Rooms socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} />
    </div>
  );
};

export default ChatBar;
