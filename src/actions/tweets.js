import { showLoading, hideLoading } from 'react-redux-loading';
import { addTweetToUser } from './users';
import authedUser from '../reducers/authedUsers';
import { saveLikeToggle, saveTweet } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const ADD_TWEET = 'ADD_TWEET';
export const ADD_REPLY = 'ADD_REPLY';

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

export function toggleLike({ id, hasLiked, authedUser }) {
  return {
    type: TOGGLE_LIKE,
    id,
    hasLiked,
    authedUser,
  };
}

export function handleToggleLike(info) {
  //API call to add like to database

  return (dispatch) => {
    dispatch(toggleLike(info));
    saveLikeToggle(info);
  };
}

export function addReply(replyingToID, replyID) {
  return {
    type: ADD_REPLY,
    replyingToID,
    replyID,
  };
}

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  };
}

export function handleAddTweet(tweetInfo) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveTweet(tweetInfo).then((tweet) => {
      dispatch(addTweet(tweet));
      if (tweet.replyingTo) {
        dispatch(addReply(tweet.replyingTo, tweet.id));
      }
      dispatch(addTweetToUser(tweet.id, tweet.author));
      dispatch(hideLoading());
    });
  };
}
