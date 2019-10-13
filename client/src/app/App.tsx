import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, NavigationBar } from '.'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes />
      </div>
    </Router>
  )
}

export default App
