import {RECEIVE_TWEETS, TOGGLE_LIKE} from '../actions/tweets';


export default function tweets (state={}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return { //merge obj properities, in case of key collisions, last object overwrites
        ...state,
        ...action.tweets
      };
    case TOGGLE_LIKE:
      const {id, hasLiked, authedUser} = action;    
      return {
        ...state,
        [id]: {
          ...state[id],
          likes: state[id].likes.concat(authedUser)
            
        
        }
      }
    default:
      return state;
  }


}