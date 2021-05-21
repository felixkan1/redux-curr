import * as React from 'react';
import {TiArrowBackOutline, TiHeartOutline, TiHeart} from 'react-icons/ti';
import {formatDate} from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {handleToggleLike} from '../actions/tweets'
import {Link, useHistory} from 'react-router-dom'

export function Tweet ({id}) {
  const tweets = useSelector((state) => state.tweets);
  const {author, replyingTo, likes, replies, timestamp, text} = tweets[id];
  const dispatch = useDispatch();
  const history = useHistory();
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const time = formatDate(timestamp);

  const liked = likes.includes(authedUser);

  const handleLike = (evt, info) => {
    evt.preventDefault();
    console.log("like info",info, evt);

    dispatch(handleToggleLike(info))

  }

  const handleReply = (evt,id) => {
    evt.preventDefault();
    history.pushState(`/tweet/${id}`)
  }

  //handle click on like
  //1. update redux
  //2. update database?
  //3. update user

  return (
    
      <Link to={`/tweet/${id}`} className='tweet'>
        <img 
          className='avatar'
          src={users[author].avatarURL}
          alt={`Avatar of ${users[author].name}`}
        />
        <div className='tweet-info'>
          <div>
            <span>{users[author].name}</span>
            <div className='time'>{time}</div>

            {replyingTo &&
                <button className='replying-to'>
                  replying to @{tweets[replyingTo].author}
              </button>   
            }
            <p>{text}</p>
          </div>      
          <div className='tweet-icons'>
              <TiArrowBackOutline/>
              <span>{replies.length}</span>
              <button 
                className={`heart-button ${liked}`}
                onClick={(evt) => handleLike(evt ,{
                  id: id,
                  hasLiked: liked,
                  authedUser: authedUser,
                })} 
              >
              {liked ?  <TiHeart/>: <TiHeartOutline/>}
              </button>
          
            
              <span>{likes.length}</span>
            </div>
        </div>
      </Link> 


   
  )



}



function timeConverter(UNIX_timestamp){
  const a = new Date(UNIX_timestamp);

  const year = a.getFullYear();
  const month = a.getMonth() + 1;


  const date = a.getDate();
  const hour = a.getHours() % 12;
  const amOrPm = a.getHours() % 12 === 0 ? 'AM' : 'PM'
  const min = a.getMinutes();
  const time = hour + ':' + min + amOrPm +' | ' + month + '/' + date +'/' + year 
  return time;
}