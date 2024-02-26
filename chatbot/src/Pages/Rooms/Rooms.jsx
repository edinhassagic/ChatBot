import { useState } from "react";
import styles from "./Rooms.module.css";

const Rooms = ({socket, room, setRoom, user, setUSer, rooms, users}) => {
  const [newRoom, setNewRoom] = useState("");

  const joinRoom =() => {

    socket.emit("joinRoom", {name: room})
    

  }

  const createnewRoom=()=>{
    socket.emit('createRoom', {name : newRoom})

  }

  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>{`Select Room`}</h1>
          <div className={styles.roomList}>
          <ul>
              {Object.keys(rooms).map(roomName => (
                <li key={roomName}>{roomName}</li>
              ))}
            </ul>
          </div>

          { room && <p>
            Current room :{" "}
            <span>
              <b>{room}</b>
            </span>
          </p>}
          <input className={styles.input} onChange={(e)=>{setRoom(e.target.value)}}></input>
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
