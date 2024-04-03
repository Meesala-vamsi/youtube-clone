import React, { useContext, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";

import './Navbar.css'
import ReactContext from '../../ReactContext/Context';
import { Link } from 'react-router-dom';

const Navbar=(props)=>{
  const {setSidebar,setSearchInput} = useContext(ReactContext)

  const onChangeInput=(event)=>{
    setSearchInput(event.target.value)
  }
  return (
    <nav className='nav-container'>
      
      <div className='nav-left flex-div'>
        <CiMenuBurger className='menu-icon' onClick={()=>setSidebar(prevState=>prevState===false?true:false)}/>
        <Link to='/video/new'className='nav-link'>
        <div>
          <FaYoutube className='youtube-icon'/>
          <h1 className=''>YouTube</h1>
        </div>
        </Link>
      </div>
      
      <div className='nav-middle flex-div'>
        <div className="search-box flex-div">
          <input type="search" className='nav-input' placeholder='Search' onChange={onChangeInput} />
          <GoSearch className='search-icon'/>
        </div>
        
      </div>
      <div className="nav-right flex-div">
        <MdOutlineVideoCall className='nav-right-icon'/>
        <div className='notifications'>
          <IoMdNotifications className='nav-right-icon'/>
          <p className='notifications-count'>3</p>
        </div>
        <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1711704711/unnamed_wfzswu.jpg" alt="profile" className="profile-image" />
      </div>
    </nav>
  )
}

export default Navbar