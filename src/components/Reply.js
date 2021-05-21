import * as React from 'react';
import { useDispatch } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Tweet} from './Tweet';
import CreateTweet from './createTweet';

export default function Reply () {
  const tweets = useSelector((state) => state.tweets);
  const { id } = useParams();
  const tweet = tweets[id];
  const replies = tweet.replies; //array of reply IDs
  const sortedTweets = replies.map(id => tweets[id])
                        .sort((a,b) => b.timestamp - a.timestamp)
  



  if(!tweet) {
    return <p>This tweet doesn't exist</p>
  }

  return (
    <React.Fragment>
      <Tweet id={tweet.id}></Tweet>
      <CreateTweet replyingTo={tweet.id} />
      {sortedTweets.map((tweet) => {
          return(
            <React.Fragment>
              <Tweet 
                id={tweet.id} 
              />
            </React.Fragment>
          )
          })}
    </React.Fragment>
  )
} 
