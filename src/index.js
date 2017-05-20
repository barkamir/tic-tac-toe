import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game';

import store from './store';
import { Provider } from 'react-redux';
// ========================================

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
