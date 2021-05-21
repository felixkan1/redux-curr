import { RECEIVE_USERS, ADD_TWEET_TO_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        //merge obj properities, in case of key collisions, last object overwrites
        ...state,
        ...action.users,
      };
    case ADD_TWEET_TO_USER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          tweets: state[action.author].tweets.concat([action.tweetID]),
        },
      };
    default:
      return state;
  }
}
