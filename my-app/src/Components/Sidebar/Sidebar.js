import React, { useContext } from 'react';
import {v4 as uuidv4} from 'uuid';
import { TiHomeOutline } from "react-icons/ti";
import { IoGameController } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoCode } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { MdMovieFilter } from "react-icons/md";



import './Sidebar.css'
import ReactContext from '../../ReactContext/Context';
import { Link } from 'react-router-dom';

export const Sidebar = (props) => {
    const {getSidebar} = useContext(ReactContext)
    const category=[
                        {id:uuidv4(),icon:<TiHomeOutline className='sidebar-icon'/>,name:'New'},
                        {id:uuidv4(),icon:<MdMovieFilter className='sidebar-icon'/>,name:"Movie"},
                        {id:uuidv4(),icon:<IoCode className='sidebar-icon'/>,name:"Coding"},
                        {id:uuidv4(),icon:<IoCode className='sidebar-icon'/>,name:"JS Mastery"},
                        {id:uuidv4(),icon:<IoCode className='sidebar-icon'/>,name:"ReactJS"},
                        {id:uuidv4(),icon:<IoGameController className='sidebar-icon'/>,name:"Gaming"},
                        {id:uuidv4(),icon:<MdLibraryMusic className='sidebar-icon'/>,name:"Music"},
                        {id:uuidv4(),icon:<GiGraduateCap className='sidebar-icon'/>,name:"Education"},
                        {id:uuidv4(),icon:<MdOutlineSportsBasketball className='sidebar-icon'/>,name:"Sport"}

                    ]
  return (
    <div className={getSidebar?'sidebar-container':'close-sidebar'}>
        <div className="shortcut-links">
            {category.map((eachItem)=>(
                <Link to={`/video/${eachItem.name.toLowerCase()}`} className='nav-link' key={eachItem.id}>
                <div className='side-link'>
                {eachItem.icon}
                <p>{eachItem.name}</p>
                </div>
                </Link>
            ))}
        </div>
        <hr/>
        <div className="subscribed-container">
            <h1 className=''>Subscribed</h1>
            <div className='subscribers-link'>
                <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='subscribe-image' />
                <p>Jethi Tech</p>
            </div>
            <div className=' subscribers-link'>
                <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='subscribe-image' />
                <p>Jenni Lecturers</p>
            </div>
            <div className='subscribers-link'>
                <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='subscribe-image' />
                <p>VR Raja</p>
            </div>
            <div className='subscribers-link'>
                <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='subscribe-image' />
                <p>Think Deep</p>
            </div>
            <div className='subscribers-link'>
                <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='subscribe-image' />
                <p>Telugu Knowledge</p>
            </div>
            <div className='subscribers-link'>
                <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='subscribe-image' />
                <p>Pink Villa</p>
            </div>
        </div>
    </div>
  )
}
