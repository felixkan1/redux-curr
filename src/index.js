import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from './middleware';
import reducer from './reducers'

function ColorfulBorder() {
  return (
    <React.Fragment>
      <ul className='border-container'>
        <li className='border-item' style={{ background: 'var(--red)' }} />
        <li className='border-item' style={{ background: 'var(--blue)' }} />
        <li className='border-item' style={{ background: 'var(--pink)' }} />
        <li className='border-item' style={{ background: 'var(--yellow)' }} />
        <li className='border-item' style={{ background: 'var(--aqua)' }} />
      </ul>
    </React.Fragment>
  )
}

const store = createStore(
  middleware, 
  reducer
)

ReactDOM.render(
  <React.StrictMode>
    <ColorfulBorder />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)