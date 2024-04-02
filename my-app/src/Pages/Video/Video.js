import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import './Video.css'
import ReactContext from '../../ReactContext/Context';
import VideoCard from '../../Components/VideoCard/VideoCard';


const optionDetails={
  success:"SUCCESS",
  failure:"FAILURE",
  initial:"INITIAL",
  progress:"INPROGRESS"
}

export const Video = () => {
  const [getVideos,setVideos] = useState([])
  const [statusData,setStatus] = useState(optionDetails.initial)
  const {searchSidebar} = useContext(ReactContext)
  console.log(searchSidebar)
  const homeHeading = searchSidebar[0].toUpperCase()+searchSidebar.slice(1)
  useEffect(()=>{
    const getDetails=async()=>{

        const options={
          method:"GET",
          url: 'https://youtube-v31.p.rapidapi.com/search',
          params: {
            q: searchSidebar,
            part: 'snippet,id',
            regionCode: 'US',
            maxResults: '50',
            order: 'date'
          },
          headers: {
            'X-RapidAPI-Key': '82e9bd6c02msh6dbc6df2b769dc2p1c82cejsnecd9697be94c',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
          }
        }

        const response = await axios.request(options)
  
        if(response.status===200){
          setVideos(response.data)
          setStatus(optionDetails.success)
        }
    }

    getDetails();
  },[searchSidebar])

  console.log(getVideos)

  const loadingView=()=>(
    <div>Loading......</div>
  )

  const successView=()=>(
    <div className="success-container">
        <VideoCard videoCardData={getVideos}/>
    </div>
  )

  const renderView=()=>{
    switch (statusData) {
      case optionDetails.success:
        return successView();
      case optionDetails.progress:
        return loadingView()
      default:
        return null
    }
  }

  return (
    <div className="videos-container">
      <h1>{homeHeading} <span>videos</span></h1>
      {renderView()}
    </div>
  )
}
