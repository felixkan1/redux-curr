import * as React from 'react';
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom';
import {TiArrowBackOutline, TiHeartOutline, TiHeart} from 'react-icons/ti';
import {Tweet} from './Tweet'

export default function Home () {
  const authedUser = useSelector((state) => state.authedUser)
  const tweets = useSelector((state) => state.tweets)
  const sortedTweets = Object.keys(tweets).map((id) => tweets[id])
                        .sort((a,b) => b.timestamp - a.timestamp)
  const users = useSelector((state) => state.users)


  React.useEffect(() => {
    console.log('tweets', tweets);
  }, [tweets, sortedTweets])
  

  return(
    <Router>

      <div className='tweets-container'>
        <ul className='tweet-list'>
          {sortedTweets.map((tweet) => {


            return(
              <React.Fragment>
                <Tweet 
                  tweet={tweet} 
                  authedUser={authedUser} 
                  tweets={tweets}
                  users={users}
                />
              </React.Fragment>
            )
          })}
        </ul>

      </div>

    </Router>
  )
}


