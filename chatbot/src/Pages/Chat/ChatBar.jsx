import React, { useEffect, useState } from "react";
import "./Chat.css";
import styles1 from "../Rooms/Rooms.module.css"

import Rooms from "../Rooms/Rooms";

const ChatBar = ({ socket, room, setRoom, user, setUsers, rooms, users, setUser }) => {
  const [showLoginInput, setShowLoginInput] = useState(false)

  const login = () => {
    setShowLoginInput(true)
    socket.emit('login', { name: user });}

    // Convert object keys to array of usernames
    const activeUsers = users ? Object.keys(users) : [];

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
                {activeUsers.map((username, index) => (
                  <p key={index}>{username}</p>
                ))}
              </div>
            </div>
            <Rooms socket={socket} room={room} setRoom={setRoom} user={user} setUsers={setUsers} rooms={rooms} users={users} />
          </>)}
      </div>
    );
  };

  export default ChatBar;
