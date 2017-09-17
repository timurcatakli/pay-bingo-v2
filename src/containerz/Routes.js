import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import User from './User'
import Admin from './Admin'
import './App.css'

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/user" component={User}/>
      <Route path="/admin" component={Admin}/>
    </Switch>
  </main>
)

export default Routes
