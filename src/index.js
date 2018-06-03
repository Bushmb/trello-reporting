import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Main from './Main';
import AppState from './AppState';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppState>
    <Main />
  </AppState>, 
  document.getElementById('root'));

registerServiceWorker();
