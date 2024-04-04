import React, { useContext } from 'react'
import {Link,useParams,useNavigate} from 'react-router-dom'

import { IoIosCheckmarkCircle } from "react-icons/io";

import './VideoCard.css'
import ReactContext from '../../ReactContext/Context';

const VideoCard = ({videoCardData}) => {
    const {getSearchInput} = useContext(ReactContext)
    const params = useParams();
    const {id} = params

    const filteredData=videoCardData.items.filter((eachVideo)=>(
        eachVideo.snippet.title.toLowerCase().includes(getSearchInput.toLowerCase())
    ))
    
  return (
    <div className='video-card-container'>
        <h1>{id} <span>videos</span></h1>
        <ul className="videos-list-conatiner">
            {filteredData.map((eachItem)=>(
                <Link to={`/videoDetails/${eachItem.id.videoId}`} className='nav-link' key={eachItem.id.videoId}>
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