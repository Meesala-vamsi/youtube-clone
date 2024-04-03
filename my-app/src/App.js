import {Routes,Route} from 'react-router-dom'


import './App.css'
import Home from './Pages/Home/Home'
import VideoDetails from './Components/VideoDetails/VideoDetails'
import Navbar from './Components/Navbar/Navbar'
import ContextProvider from './ReactContext/ContextProvider'
import { useState } from 'react'
import Channel from './Components/Channels/Channel'
import { Video } from './Pages/Video/Video'
import { Sidebar } from './Components/Sidebar/Sidebar'

const App=()=>{
  return(
    <ContextProvider>
      <Navbar/>
      {/* <div className='some'> */}
        {/* <Sidebar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path = '/video/:id' element={<Video/>}/>
        <Route path="/videoDetails/:videoId" element={<VideoDetails/>}/>
        <Route path='/channel/:channelId' element={<Channel/>}/>
      </Routes>
      {/* </div> */}
    </ContextProvider>
  )
}

export default App