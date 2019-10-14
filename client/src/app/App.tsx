import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import NavigationBar from './NavigationBar'
import Routes from './Routes'
import store from './store'

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <NavigationBar />
        <Routes />
      </Router>
    </StoreProvider>
  )
}

export default App
