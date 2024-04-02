import React from 'react'
import {NavLink} from 'react-router-dom'

import { IoIosCheckmarkCircle } from "react-icons/io";

import './VideoCard.css'

const VideoCard = ({videoCardData}) => {
  return (
    <div className='video-card-container'>
        <ul className="videos-list-conatiner">
            {videoCardData.items.map((eachItem)=>(
                <NavLink to={`video/${eachItem.id.videoId}`} className='nav-link'>
                    <li className='video-list-items'>
                        <img src={eachItem.snippet.thumbnails.high.url} alt="" className='video-image' />
                        <h1 className='channel-title'>{eachItem.snippet.title}</h1>
                        <div className='channel-container'>
                            <p>{eachItem.snippet.channelTitle}</p>
                            <IoIosCheckmarkCircle className='check-circle-icon'/>
                        </div>
                    </li>
                </NavLink>
            ))}
        </ul>
    </div>
  )
}

export default VideoCard