import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {handleInitialData} from '../actions/home'
import Nav from './Nav'
import Home from './Home';
import Reply from './Reply'
import CreateTweet from './createTweet';
import LoadingBar from 'react-redux-loading'



export default function App () {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tweets === null);

  React.useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])


  return (
    <Router>
      <LoadingBar />
      <div className='container'>
        <Nav/>
        {loading === true ? 
          null
          : <div>
              <Route path='/' exact>
                <Home/>
              </Route>
              <Route path='/tweet/:id'>
                <Reply/>
              </Route>
              <Route path='/new'>
                <CreateTweet replyingTo=""/>
              </Route>
            
            </div>
        }
      </div>
    </Router>
  )
}

