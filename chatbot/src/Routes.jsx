import React, { useEffect } from 'react'
import Home from './Pages/Rooms/Rooms';
import { Routes, Route } from "react-router-dom";
import ChatPage from './Pages/Chat/ChatPage';
const MainRoutes = ({socket}) => {

  return (
    <Routes>
   
    <Route path="/" element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default MainRoutes