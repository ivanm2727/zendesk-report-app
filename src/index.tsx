import React from 'react'
import ReactDOM from 'react-dom'
import 'promise-polyfill/src/polyfill'
import App from "./components/App";

import './global.scss'
// import Navigation from './components/Navigation'
// import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'

ReactDOM.render(
    <div>

<div>Zendesk Boilerplate 2</div>
      <App/>
    </div>
  , document.getElementById('root')
)
