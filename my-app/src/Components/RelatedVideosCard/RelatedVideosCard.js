import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './RelatedVideosCard.css'
import { Link,useNavigate } from 'react-router-dom'
import { IoIosCheckmarkCircle } from "react-icons/io";

const optionDetails={
    success:"SUCCESS",
    failure:"FAILURE",
    initial:"INITIAL",
    progress:"INPROGRESS"
  }

export const RelatedVideosCard = ({videoId}) => {
  const navigate=useNavigate();
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
              'X-RapidAPI-Key': 'c65ea66a1dmsh07b6a7a3aed4a42p1b432ejsnd86eda6c2d3e',
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

      const navigatePage = (someId)=>{
        navigate(`/videoDetails/${someId}`)
    }

      const successView=()=>(
        <ul className="related-videos-container">
        {getRelatedVideos.map((eachVideo)=>(
          <div onClick={()=>navigatePage(eachVideo.id.videoId)} style={{cursor:"pointer"}}>
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
          </div>
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
