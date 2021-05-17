import {saveLikeToggle} from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

export function toggleLike ({id, hasLiked, authedUser}) {
  return {
    type: TOGGLE_LIKE,
    id,
    hasLiked,
    authedUser
  }
}



export function handleToggleLike (info) {
  //API call to add like to database

  return (dispatch) => {
    saveLikeToggle(info) //API call updates database
      .then(() => dispatch(toggleLike(info))) //update redux state
  }

}