import * as React from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {handleAddTweet} from '../actions/tweets'


export default function CreateTweet (props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const author = useSelector((state) => state.authedUser);
  const replyingTo = props.replyingTo ? props.replyingTo : ""

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(replyingTo === "") {
      history.push('/')
    }else {
      history.push(`/tweet/${replyingTo}`)
    }
   

    //dispatch new tweet (text, author, replyingTo)
    dispatch(handleAddTweet({text, author, replyingTo }))
    setText("");
  }

  const isDisabled = () => {
    return text === ''
  }

  return(
    
   
    <form className='new-tweet' onSubmit={handleSubmit}>
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        name='tweet'
        className='textarea'
        maxlength="280"
        type='text'
      />
      <button  className='btn' type='submit' disabled={isDisabled()}>    
        Submit
      </button>
    </form>

  )
}