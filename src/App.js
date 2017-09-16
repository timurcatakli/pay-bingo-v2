import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Header from './components/Header'
import PlayerContainer from './containers/PlayerContainer'
import './App.css'

class App extends Component {
  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }))
  // }

  render() {
    return (
      <Grid container spacing={24}>
        <Header label="PayPal Bingo Game"/>
        <PlayerContainer />
      </Grid>
      // <div className="App">
      //   <PlayerContainer />
      // {/* <h1>Users</h1>
      // {this.state.users.map(user =>
      //   <div key={user.id}>{user.username}</div>
      // )} */}
      // </div>
    )
  }
  state = { users: [] }
}

export default App
