import {RECEIVE_TWEETS} from '../actions/tweets';


export default function tweets (state={}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return { //merge obj properities, in case of key collisions, last object overwrites
        ...state,
        ...action.tweets
      };
    default:
      return state;
  }


}