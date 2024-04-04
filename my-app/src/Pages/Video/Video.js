import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

import './Video.css'
import ReactContext from '../../ReactContext/Context';
import VideoCard from '../../Components/VideoCard/VideoCard';
import { Sidebar } from '../../Components/Sidebar/Sidebar';


const optionDetails={
  success:"SUCCESS",
  failure:"FAILURE",
  initial:"INITIAL",
  progress:"INPROGRESS"
}

export const Video = () => {
  const [getVideos,setVideos] = useState([])
  const [statusData,setStatus] = useState(optionDetails.initial)
  const {getSearchInput,setSearchInput} = useContext(ReactContext)
  const params = useParams();
  const {id} = params
  useEffect(()=>{
    const getDetails=async()=>{

        const options={
          method:"GET",
          url: 'https://youtube-v31.p.rapidapi.com/search',
          params: {
            q: id,
            part: 'snippet,id',
            regionCode: 'US',
            maxResults: '50',
            order: 'date'
          },
          headers: {
            'X-RapidAPI-Key': '7b165fcb75msh32aaf6485ee33b8p1ffdf4jsna46b67aed186',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
          }
        }

        const response = await axios.request(options)
  
        if(response.status===200){
          setStatus(optionDetails.success)
          setSearchInput(id)
          // console.log(response.data)
          setVideos(response.data)

        }
    }

    getDetails();
  },[id])
  

  const loadingView=()=>(
    <div>Loading......</div>
  )

  const successView=()=>(
    <div className="success-container">

      <Sidebar/>
  
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
      {renderView()}
    </div>
  )
}
