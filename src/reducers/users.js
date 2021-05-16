import {RECEIVE_USERS} from '../actions/users';


export default function users (state={}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return { //merge obj properities, in case of key collisions, last object overwrites
        ...state,
        ...action.users
      };
    default:
      return state;
  }


}