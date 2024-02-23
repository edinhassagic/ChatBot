import React from 'react'
import Home from './Pages/Rooms/Rooms';
import { Routes, Route } from "react-router-dom";
import ChatPage from './Pages/Chat/ChatPage';
const MainRoutes = () => {
  return (
    <Routes>
   
    <Route path="/" element={<ChatPage />} />
    </Routes>
  )
}

export default MainRoutes