import * as React from 'react';
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom';

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
            const {author, replyingTo, likes, replies, timestamp, text} = tweet;

            const time = timeConverter(timestamp);

            return(
              <li key={tweet.id}>
                <a className='tweet' href='/'>
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
                    <div className='tweet-icons'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="tweet-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M19.164 19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0 .534-.208 1.036-.586 1.414-.756.756-2.077.751-2.823.005l-6.293-6.207c-.191-.189-.298-.444-.298-.713s.107-.524.298-.712l6.288-6.203c.754-.755 2.073-.756 2.829.001.377.378.585.88.585 1.414v1.704c4.619.933 8 4.997 8 9.796v1c0 .442-.29.832-.714.958-.095.027-.19.042-.286.042-.331 0-.646-.165-.836-.452zm-7.141-5.536c2.207.056 4.638.394 6.758 2.121-.768-3.216-3.477-5.702-6.893-6.08-.504-.056-.888-.052-.888-.052v-3.497l-5.576 5.496 5.576 5.5v-3.499l1.023.011z">
                      </path>
                    </svg>
                    
                    <span>{replies.length}</span>
                    <button className='heart-button'>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" class="tweet-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 20c-.195 0-.391-.057-.561-.172-.225-.151-5.508-3.73-7.146-5.371-1.831-1.831-2.043-3.777-2.043-5.082 0-2.964 2.411-5.375 5.375-5.375 1.802 0 3.398.891 4.375 2.256.977-1.365 2.573-2.256 4.375-2.256 2.964 0 5.375 2.411 5.375 5.375 0 1.305-.212 3.251-2.043 5.082-1.641 1.641-6.923 5.22-7.146 5.371-.17.115-.366.172-.561.172zm-4.375-14c-1.861 0-3.375 1.514-3.375 3.375 0 1.093.173 2.384 1.457 3.668 1.212 1.212 4.883 3.775 6.293 4.746 1.41-.971 5.081-3.534 6.293-4.746 1.284-1.284 1.457-2.575 1.457-3.668 0-1.861-1.514-3.375-3.375-3.375s-3.375 1.514-3.375 3.375c0 .552-.447 1-1 1s-1-.448-1-1c0-1.861-1.514-3.375-3.375-3.375z"></path></svg>
                    
                    </button>
                        <span>{likes.length}</span>
                      
                      
                    </div>
                  </div>
                </a>
                
              </li>
            )
          })}
        </ul>

      </div>

    </Router>
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