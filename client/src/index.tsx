import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import { App } from './app'
import * as serviceWorker from './service-worker'

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register()
