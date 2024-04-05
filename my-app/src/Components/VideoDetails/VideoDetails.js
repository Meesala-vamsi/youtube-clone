import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import  axios  from 'axios'
import ReactPlayer from 'react-player'
import './VideoDetails.css'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RelatedVideosCard } from '../RelatedVideosCard/RelatedVideosCard'
import { VideoComments } from '../VideoComments/VideoComments'

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
          'X-RapidAPI-Key': '7b165fcb75msh32aaf6485ee33b8p1ffdf4jsna46b67aed186',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      }

      
      try{
        const response = await axios.request(options);
        setPageStatus(optionDetails.success)
        if(response.data.items[0]!==undefined){
        setVideoDetails(response.data.items[0])
        }
      }catch(e){
        console.log(e.message)
        setPageStatus(optionDetails.failure)
      } 
      
    }
    getVideoDetails();
  },[videoId])


 if(!getVideos?.snippet) return 'Loading...'

  const successView=()=>(
    <div className="video-details-container">
      <div className='container1'>
      <div className="success-video-details-container">
        <div className='react-player-container'>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls  className='react-player' width="100%" height="100%" borderRadius="30px"/>
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
        <div className='desktop-comments'>
        <VideoComments videoId={videoId} />
        </div>
      </div>
      <RelatedVideosCard videoId={videoId}/>
      <div className='mobile-comments'>
        <VideoComments videoId={videoId} />
        </div>
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