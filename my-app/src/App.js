import {Routes,Route} from 'react-router-dom'


import './App.css'
import Home from './Pages/Home/Home'
import VideoDetails from './Components/VideoDetails/VideoDetails'
import Navbar from './Components/Navbar/Navbar'
import ContextProvider from './ReactContext/ContextProvider'
import { useState } from 'react'
import Channel from './Components/Channels/Channel'

const App=()=>{
  return(
    <ContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/video/:videoId" element={<VideoDetails/>}/>
        <Route path='/channel/:channelId' element={<Channel/>}/>
      </Routes>
    </ContextProvider>
  )
}

export default App