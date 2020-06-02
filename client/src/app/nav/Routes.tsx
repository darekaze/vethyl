import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Home,
  EthTransaction,
  GetEthBlock,
  GetEthRangeBlock,
  GetEthBalanceState,
  GetEthBalanceRecord,
} from 'view'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/tx">
        <EthTransaction />
      </Route>
      <Route path="/block">
        <GetEthBlock />
      </Route>
      <Route path="/block-range">
        <GetEthRangeBlock />
      </Route>
      <Route path="/balance-state">
        <GetEthBalanceState />
      </Route>
      <Route path="/balance-record">
        <GetEthBalanceRecord />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes
