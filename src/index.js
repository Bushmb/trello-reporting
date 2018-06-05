import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

// import App from './App';
import Main from './Main';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('root'));

registerServiceWorker();
