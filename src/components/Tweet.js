import * as React from 'react';
import {TiArrowBackOutline, TiHeartOutline, TiHeart} from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import {handleToggleLike} from '../actions/tweets'

export function Tweet (props) {
  const {id, author, replyingTo, likes, replies, timestamp, text} = props.tweet;
  const dispatch = useDispatch();
  const {users, tweets, authedUser} = props
  const time = timeConverter(timestamp);

  const liked = likes.includes(authedUser);

  const handleLike = (evt, info) => {
    evt.stopPropagation();
    console.log("like info",info, evt);

    dispatch(handleToggleLike(info))

  }

  //handle click on like
  //1. update redux
  //2. update database?
  //3. update user

  return (
    <li key={id} className='tweet-container'>
      <a  href='/new' className='tweet'>
        <img 
          className='avatar'
          src={users[author].avatarURL}
          alt={`Avatar of ${users[author].name}`}
        />
        <div className='tweet-data'>
          <div className='tweet-info'>
            <div>
              <span>{users[author].name}</span>
              <div className='time'>{time}</div>

              {replyingTo &&
                  <button className='replying-to'>
                    replying to @{tweets[replyingTo].author}
                </button>   
              }
              <p>
                {text}
              </p>
            </div>
          </div>
        </div>
      </a>
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



    </li>
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