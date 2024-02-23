import styles from "./Rooms.module.css";

const Rooms = () => {
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
          <button className="btn btn-secondary">Join Room</button>
        </div>
      </div>
      <div className={styles.create__room}></div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>{`Create New Room`}</h1>
          <input className={styles.input} placeholder="Ime sobe..." />

          <button className="btn btn-secondary">Create</button>
        </div>
      </div>
    </>
  );
};

export default Rooms;
