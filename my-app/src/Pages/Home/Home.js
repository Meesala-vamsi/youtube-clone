import React from 'react'
import "./Home.css"
import { Sidebar } from '../../Components/Sidebar/Sidebar'
import { Video } from '../Video/Video'

 const Home = (props) => {
  return (
    <div className='home-container'>
      <Sidebar/>
      <Video/>
    </div>
  )
}


export default Home