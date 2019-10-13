import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import Routes from './router'
import * as serviceWorker from './service-worker'
import { NavigationBar } from './components/app'

export const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register()
