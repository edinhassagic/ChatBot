import React, { useEffect } from "react";
import "./Chat.css";

import Rooms from "../Rooms/Rooms";

const ChatBar = ({socket, room, setRoom, user, setUSer, rooms, users}) => {
  useEffect(()=>{
    socket.on('users', (data)=>{

      
      
    })
    return () => socket.off('users');

  }, [socket])



  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p>
        </div>
      </div>
    <Rooms/>
    </div>
  );
};

export default ChatBar;
