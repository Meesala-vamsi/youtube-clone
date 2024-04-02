import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './RelatedVideosCard.css'
import { Link } from 'react-router-dom'
import { IoIosCheckmarkCircle } from "react-icons/io";

const optionDetails={
    success:"SUCCESS",
    failure:"FAILURE",
    initial:"INITIAL",
    progress:"INPROGRESS"
  }

export const RelatedVideosCard = ({videoId}) => {
    const [getPageStatus,setPageStatus] = useState(optionDetails.initial)
    const [getRelatedVideos,setRelatedVideos] = useState([])
    useEffect(()=>{
        const getVideoDetails=async()=>{
        const relatedOptions={
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/search',
            params: {
              
              part: 'snippet',
              relatedToVideoId:videoId,
              regionCode: 'US',
              maxResults: '50',
              order: 'date'
            },
            headers: {
              'X-RapidAPI-Key': '82e9bd6c02msh6dbc6df2b769dc2p1c82cejsnecd9697be94c',
              'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
          }
          try{
            const response2 = await axios.request(relatedOptions)
            setPageStatus(optionDetails.success)
            setRelatedVideos(response2.data.items)
            
          }catch(e){
            console.log(e.message)
            setPageStatus(optionDetails.failure)
          } 
          
        }
        getVideoDetails();
      },[videoId])

      const successView=()=>(
        <ul className="related-videos-container">
        {getRelatedVideos.map((eachVideo)=>(
          <Link to={`/video/${eachVideo.id.videoId}`} className='nav-link'>
          <li className="related-video-list-items" key={eachVideo.id.videoId}>
            <img src={eachVideo.snippet.thumbnails.default.url} alt="" className='related-images' />
            <div className='related-videos-content-container'>
                <p className='related-videos-title'>{eachVideo.snippet.title.length>30?eachVideo.snippet.title.slice(0,80)+'...':eachVideo.snippet.title}</p>
                <div className="related-videos-channel-container">
                    <p>{eachVideo.snippet.channelTitle}</p>
                    <IoIosCheckmarkCircle className='releted-video-circle'/>
                </div>
            </div>
          </li>
          </Link>
        ))}
      </ul>
      )

      const failureView=()=>(
        <div>
            <p>failure</p>
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
    <>
    {renderView()}
    </>
  )
}
