import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {handleInitialData} from '../actions/home'
import Nav from './Nav'
import Home from './Home';
import CreateTweet from './createTweet';



export default function App () {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tweets === null);

  React.useEffect(() => {
    dispatch(handleInitialData())
  })


  return (
    <Router>
      <div className='container'>
        <Nav/>
        {loading === true ? 
          null
          : <div>
              <Route path='/' exact>
                <Home/>
              </Route>
              <Route path='/new' exact>
                <CreateTweet/>
              </Route>
            </div>
        }
      </div>
    </Router>
  )
}

