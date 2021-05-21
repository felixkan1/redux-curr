export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_TWEET_TO_USER = 'ADD_TWEET_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addTweetToUser(tweetID, author) {
  return {
    type: ADD_TWEET_TO_USER,
    tweetID,
    author,
  };
}
