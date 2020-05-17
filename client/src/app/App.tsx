import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import { Container } from 'rsuite'

import Navi from './nav/Navi'
import Routes from './nav/Routes'
import store from './store'

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <Container>
          <Navi />
          <Routes />
        </Container>
      </Router>
    </StoreProvider>
  )
}

export default App
