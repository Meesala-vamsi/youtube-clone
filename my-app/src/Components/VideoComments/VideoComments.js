import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

import './VideoComments.css'

const optionDetails={
    success:"SUCCESS",
    failure:"FAILURE",
    initial:"INITIAL",
    progress:"INPROGRESS"
  }

export const VideoComments = ({videoId}) => {
    const [getComments,setComments] = useState([])
    const [commentsStatus,setCommentsStatus] = useState(optionDetails.initial)
    useEffect(()=>{
        const getCommentDetails= async()=>{
            const options = {
                method: 'GET',
                url: 'https://youtube-v31.p.rapidapi.com/commentThreads',
                params: {
                  part: 'snippet',
                  videoId: videoId,
                  maxResults: '50'
                },
                headers: {
                  'X-RapidAPI-Key': 'c65ea66a1dmsh07b6a7a3aed4a42p1b432ejsnd86eda6c2d3e',
                  'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                }
              };
              
              try {
                  const response = await axios.request(options);
                  setComments(response.data.items)
                  setCommentsStatus(optionDetails.success)
              } catch (error) {
                  console.error(error);
                  setCommentsStatus(optionDetails.failure)
              }
        }

        getCommentDetails();
    },[videoId])

    console.log(getComments)

    const successView=()=>(
        <ul className="video-comments-container">
            {getComments.map((eachComment)=>(
                <li className='comments-list-items'>
                    <div>
                        <img src={eachComment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="profile" className='comment-profile-image' />
                    </div>
                    <div className='comment-content-container'>
                        <h1>{eachComment.snippet.topLevelComment.snippet.authorDisplayName}</h1>
                        <p>{eachComment.snippet.topLevelComment.snippet.textOriginal}</p>
                        <div className="comment-likes-container">
                            <div className="like-card">
                                <BiLike className='like-icon'/>
                                <p>{eachComment.snippet.topLevelComment.snippet.likeCount<=0?'': eachComment.snippet.topLevelComment.snippet.likeCount}</p>
                            </div>
                            <BiDislike className='like-icon'/>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )

    const failureView=()=>(
        <div className="failure-container">
            <h1>Failure</h1>
        </div>
    )

    const renderView=()=>{
        switch(commentsStatus){
            case optionDetails.success:
                return successView();
            case optionDetails.failure:
                return failureView();
            default:
                return null;
        }
    }
  return (
    <div>{renderView()}</div>
  )
}
