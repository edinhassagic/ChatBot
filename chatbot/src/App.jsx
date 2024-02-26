import "./App.css";
import { BrowserRouter } from "react-router-dom";

import MainRoutes from "./Routes";
import SocketIO from "socket.io-client"


const socket = SocketIO.connect("localhost:3000", { transports: ["websocket"] })

function App() {
  return (
    <>
      <BrowserRouter>
        <MainRoutes socket = {socket}/>
      </BrowserRouter>
    </>
  );
}

export default App;
