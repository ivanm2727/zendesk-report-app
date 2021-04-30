import React from 'react';
import ReactDOM from 'react-dom';
import 'promise-polyfill/src/polyfill';
import App from "./containers/App";

import './global.scss';
// import Navigation from './components/Navigation'
// import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'

ReactDOM.render(
    <div>
      <App/>
    </div>
  , document.getElementById('root')
)
