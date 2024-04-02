import React, { useContext, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import  axios  from 'axios'
import ReactPlayer from 'react-player'
import './VideoDetails.css'
import { IoIosCheckmarkCircle } from "react-icons/io";
import ReactContext from '../../ReactContext/Context'
import { RelatedVideosCard } from '../RelatedVideosCard/RelatedVideosCard'
import { VideoComments } from '../VideoComments/VideoComments'
import {Sidebar} from '../Sidebar/Sidebar'

const optionDetails={
  success:"SUCCESS",
  failure:"FAILURE",
  initial:"INITIAL",
  progress:"INPROGRESS"
}

const VideoDetails = () => {
  const params = useParams()
  const {videoId} = params
  const [getVideos,setVideoDetails] = useState([])
  const [getPageStatus,setPageStatus] = useState(optionDetails.initial)
  const {setChannelId} = useContext(ReactContext);
  const isplaying=true
  
  useEffect(()=>{
    const getVideoDetails=async()=>{
      setPageStatus(optionDetails.progress)
      const options={
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/videos',
        params: {
          part: 'contentDetails,snippet,statistics',
          id: videoId
        },
        headers: {
          'X-RapidAPI-Key': '82e9bd6c02msh6dbc6df2b769dc2p1c82cejsnecd9697be94c',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      }

      
      try{
        const response = await axios.request(options);
        setPageStatus(optionDetails.success)
        if(response.data.items[0]!==undefined){
        setVideoDetails(response.data.items[0])
        }
        // setChannelId(response.data.items[0].snipet.channelId)
      }catch(e){
        console.log(e.message)
        setPageStatus(optionDetails.failure)
      } 
      
    }
    getVideoDetails();
  },[videoId])

  // console.log(getVideos)

 if(!getVideos?.snippet) return 'Loading...'

  const successView=()=>(
    <div className="video-details-container">
      <div className='container1'>
      <div className="success-video-details-container">
        <div style={{ borderRadius: '15px', overflow: 'hidden', height:'100%' }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls  className='reac-player' width="100%" height="100%" borderRadius="30px"/>
        </div>
        <h1 className='video-details-heading'>{getVideos.snippet.title}</h1>
        <div className='title-container'>
          <Link to={`/channel/${getVideos.snippet.channelId}`} className='channel-container nav-link'>
            <p>{getVideos.snippet.channelTitle}</p>
            <IoIosCheckmarkCircle className='check-circle-icon'/>
          </Link>
          <div className='likes-container'>
            <p>{parseInt(getVideos.statistics.likeCount).toLocaleString()} likes</p>
            <p>{parseInt(getVideos.statistics.viewCount).toLocaleString()} views</p>
          </div>
        </div>
        <VideoComments videoId={videoId}/>
      </div>
      <RelatedVideosCard videoId={videoId}/>
      </div>
    </div>
  )

  const failureView=()=>(
    <div>
      <p>Failed</p>
    </div>
  )


  const renderView=()=>{
    switch(getPageStatus){
      case optionDetails.success:
        return successView();
      case optionDetails.failure:
        return failureView();
      default:
        return null;
    }
  }
  return (
    <div>
      {renderView()}
    </div>
  )
}

export default VideoDetails