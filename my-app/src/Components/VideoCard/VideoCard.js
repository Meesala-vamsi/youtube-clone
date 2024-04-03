import React from 'react'
import {Link,useParams,useNavigate} from 'react-router-dom'

import { IoIosCheckmarkCircle } from "react-icons/io";

import './VideoCard.css'

const VideoCard = ({videoCardData}) => {
    const navigate=useNavigate()
    const params = useParams();
    const {id} = params

    
    
  return (
    <div className='video-card-container'>
        <h1>{id} <span>videos</span></h1>
        <ul className="videos-list-conatiner">
            {videoCardData.items.map((eachItem)=>(
                <Link to={`/videoDetails/${eachItem.id.videoId}`} className='nav-link'>
                    <li className='video-list-items'>
                        <img src={eachItem.snippet.thumbnails.high.url} alt="" className='video-image' />
                        <h1 className='channel-title'>{eachItem.snippet.title}</h1>
                        <div className='channel-container'>
                            <p>{eachItem.snippet.channelTitle}</p>
                            <IoIosCheckmarkCircle className='check-circle-icon'/>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    </div>
  )
}

export default VideoCard