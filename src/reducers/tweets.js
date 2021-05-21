import {
  RECEIVE_TWEETS,
  TOGGLE_LIKE,
  ADD_TWEET,
  ADD_REPLY,
} from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        //merge obj properities, in case of key collisions, last object overwrites
        ...state,
        ...action.tweets,
      };
    case TOGGLE_LIKE:
      const { id, hasLiked, authedUser } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          likes:
            hasLiked === false
              ? state[id].likes.concat(authedUser)
              : state[id].likes.filter((uid) => uid !== authedUser),
        },
      };
    case ADD_TWEET:
      return {
        ...state,
        [action.tweet.id]: {
          ...action.tweet,
        },
      };

    case ADD_REPLY:
      return {
        ...state,
        [action.replyingToID]: {
          ...state[action.replyingToID],
          replies: state[action.replyingToID].replies.concat(action.replyID),
        },
      };

    default:
      return state;
  }
}
