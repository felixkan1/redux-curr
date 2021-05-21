import * as React from 'react';
import { useSelector } from 'react-redux';
import { Tweet } from './Tweet';

export default function Home() {
  const tweets = useSelector((state) => state.tweets);
  const sortedTweets = Object.keys(tweets)
    .map((id) => tweets[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  const users = useSelector((state) => state.users);

  return (
    <div className="tweets-container">
      <ul className="tweet-list">
        {sortedTweets.map((tweet) => {
          return (
            <React.Fragment>
              <Tweet id={tweet.id} />
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
