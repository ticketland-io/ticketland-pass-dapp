import React from 'react'
import {render} from 'react-dom'
import App from './core/App'
import Store from './core/Store'
import packageJson from '../../package.json'

window.TICKETLAND_PASS_VERSION = packageJson.version

render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
