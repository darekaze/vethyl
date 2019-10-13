import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import { Routes, NavigationBar, store } from '.'

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
