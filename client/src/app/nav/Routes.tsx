import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { Home, EthTransaction, EthBlock, EthBalance } from 'view'
import { Home } from 'view'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/tx">
        {/* <EthTransaction /> */}
        <Home />
      </Route>
      <Route path="/block">
        {/* <EthBlock /> */}
        <Home />
      </Route>
      <Route path="/balance">
        {/* <EthBalance /> */}
        <Home />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes
