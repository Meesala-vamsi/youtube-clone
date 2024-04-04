import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import ReactContext from '../../ReactContext/Context';
import { Sidebar } from '../Sidebar/Sidebar';
import './Channel.css'

import { IoIosCheckmarkCircle } from "react-icons/io";

const statusOptions={
    success:"SUCCESS",
    failure:"FAILURE",
    initial:"INITIAL",
    progress:"INPROGRESS"
}


const Channel = () => {
    const [getChannelData,setChannelData] = useState([])
    const [getChannelVideos,setChannelVideos] = useState([])
    const [channelStatus,setChannelStatus] = useState(statusOptions.initial)
    const {getChannelId} = useContext(ReactContext)
    const params = useParams()
    const {channelId} = params;
    useEffect(()=>{
        const getChannelDetails=async()=>{
            const options = {
                method: 'GET',
                url: 'https://youtube-v31.p.rapidapi.com/channels',
                params: {
                  part: 'snippet,statistics',
                  id: channelId
                },
                headers: {
                  'X-RapidAPI-Key': 'c65ea66a1dmsh07b6a7a3aed4a42p1b432ejsnd86eda6c2d3e',
                  'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                }
              };

              const channelVideosOptions={
                method: 'GET',
                url: 'https://youtube-v31.p.rapidapi.com/search',
                params: {
                    channelId: channelId,
                    part: 'snippet,id',
                    order: 'date',
                    maxResults: '50'
                },
                headers: {
                    'X-RapidAPI-Key': 'c65ea66a1dmsh07b6a7a3aed4a42p1b432ejsnd86eda6c2d3e',
                    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                }
              }
              
              try {
                  const response = await axios.request(options);
                  const channelVideosResponse=await axios.request(channelVideosOptions)
                  setChannelStatus(statusOptions.success)
                  setChannelVideos(channelVideosResponse.data.items)
                  setChannelData(response.data.items[0])
              } catch (error) {
                  console.error(error);
              }
        }

        getChannelDetails();
    },[channelId])

    console.log(getChannelData)

    const successView=()=>(
        <div className="channel-success-container">
            <div>
                <img src={getChannelData.brandingSettings.image.bannerExternalUrl===undefined?'https://yt3.googleusercontent.com/AozVqKuxhRmUJZCzCQW-SP8s5W1cN23Gq8vepKQoaUse8elG7-uieIIDCkx-LVjvDpTAYVLv6w':getChannelData.brandingSettings.image.bannerExternalUrl} alt='' />
            </div>
            <div className="channel-profile-container">
                <img src={getChannelData.brandingSettings.image.bannerExternalUrl===undefined?'https://yt3.googleusercontent.com/AozVqKuxhRmUJZCzCQW-SP8s5W1cN23Gq8vepKQoaUse8elG7-uieIIDCkx-LVjvDpTAYVLv6w':getChannelData.brandingSettings.image.bannerExternalUrl} alt="" />
                <div className='channel-profile-content'>
                    <div>
                        <h1>{getChannelData.brandingSettings.channel.title}</h1>
                        <IoIosCheckmarkCircle className='channel-checkcircle'/>
                    </div>
                    <div className='subscribers-container'>
                        <p>{getChannelData.snippet.customUrl}</p>
                        <p>{parseInt(getChannelData.statistics.subscriberCount).toLocaleString()+" subscribers"}</p>
                        <p>{parseInt(getChannelData.statistics.videoCount).toLocaleString()+" videos"}</p>
                    </div>
                </div>
            </div>
            <hr/>
            <ul className="channel-video-list">
                {getChannelVideos.map((eachVideo)=>(
                    <li className='channel-video-items'>
                        <Link to={`/videoDetails/${eachVideo.id.videoId}`} className='nav-link'>
                            <img src={eachVideo.snippet.thumbnails.high.url} alt="" />
                            <div>
                                <p>{eachVideo.snippet.title}</p>
                            </div>
                        </Link>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
    
    const failureView=()=>(
        <div className="failure-container">
            <p>Failed</p>
        </div>
    )

    const renderView=()=>{
        switch(channelStatus){
            case statusOptions.success:
                return successView();
            case statusOptions.failure:
                return failureView();
            default:
                return null;
        }
    }

    console.log(getChannelVideos)



  return (
    <div className='channel-main-container'>
        <Sidebar/>
        {renderView()}
    </div>
  )
}

export default Channel