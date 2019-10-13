import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, EthTransaction, EthBlock, EthBalance } from './views'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/tx">
        <EthTransaction />
      </Route>
      <Route path="/block">
        <EthBlock />
      </Route>
      <Route path="/balance">
        <EthBalance />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes
