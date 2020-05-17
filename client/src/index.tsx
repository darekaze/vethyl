import React from 'react'
import ReactDOM from 'react-dom'
import 'rsuite/dist/styles/rsuite-default.css'
import './app/index.css'

import App from './app/App'
import * as serviceWorker from './app/service-worker'

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register()
