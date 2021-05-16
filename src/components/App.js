import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {handleInitialData} from '../actions/home'
import Nav from './Nav'
import Home from './Home';
import Tweet from './Tweet';


export default function App () {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authedUser === null);

  React.useEffect(() => {
    dispatch(handleInitialData())
  })


  return (
    <Router>
      <div className='container'>
        <Nav/>
        <div>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/new' exact>
            <Tweet/>
          </Route>


        </div>
      </div>
    </Router>
  )
}

