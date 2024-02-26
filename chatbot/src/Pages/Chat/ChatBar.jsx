import React, { useEffect, useState } from "react";
import "./Chat.css";
import styles1 from "../Rooms/Rooms.module.css"

import Rooms from "../Rooms/Rooms";

const ChatBar = ({ socket, room, setRoom, user, setUsers, rooms, users, setUser }) => {
  const [showLoginInput, setShowLoginInput] = useState(false)

  const login = () => {
    setShowLoginInput(true)
    socket.emit('login', { name: user });


  }

  return (
    <div className="chat__sidebar">

      {!showLoginInput ? (<div className='login'>
        <input className={styles1.input} type='text' placeholder="Enter your username" onChange={(e) => { setUser(e.target.value) }} ></input>
        <button className="btn btn-secondary" onClick={login}>Login</button>
      </div>) :
      (<><h2>Let's Chat</h2>
        <p>Username: {user}</p>

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
      </>)}
    </div>
  );
};

export default ChatBar;
