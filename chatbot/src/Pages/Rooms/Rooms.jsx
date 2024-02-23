import { useState } from "react";
import styles from "./Rooms.module.css";

const Rooms = ({socket, room, setRoom, user, setUSer, rooms, users}) => {
  const [newRoom, setNewRoom] = useState("");
  





  const joinRoom =() => {
      socket.emit('join_room', data)


      }

  const createnewRoom=()=>{

    socket.emit('create_room', data)

  }
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>{`Select Room`}</h1>
          <div className={styles.roomList}>
            <ul>
              <li>Developers</li>
              <li>Gamers</li>
              <li>Designers</li>
              <li>Developers</li>
              <li>Gamers</li>
              <li>Designers</li>
              <li>Developers</li>
              <li>Gamers</li>
              <li>Designers</li>
              <li>Developers</li>
              <li>Gamers</li>
              <li>Designers</li>
              <li>Developers</li>
              <li>Gamers</li>
              <li>Designers</li>
              <li>Developers</li>
              <li>Gamers</li>
              <li>Designers</li>
            </ul>
          </div>

          <p>
            Current room :{" "}
            <span>
              <b>Developers</b>
            </span>
          </p>
          <input onChange={(e)=>{setRoom(e.target.value)}}></input>
          <button className="btn btn-secondary"  onClick={joinRoom} >Join Room</button>
        </div>
      </div>
      <div className={styles.create__room}></div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>{`Create New Room`}</h1>
          <input className={styles.input} placeholder="Ime sobe..." onChange={(e)=>setNewRoom(e.target.value)}/>

          <button  className="btn btn-secondary" onClick={createnewRoom}>Create</button>
        </div>
      </div>
    </>
  );
};

export default Rooms;
