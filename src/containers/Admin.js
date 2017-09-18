import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Jumbotron, Button } from 'react-bootstrap'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bingo: {
        modal: {
          title: 'PayPal Bingo Game',
          body: 'Your Admin will start the game soon!'
        },
        game_mode: false,
        drawn_balls: []
      }
    }
  }

  componentWillMount() {
    this.socket = io('/')
    this.socket.on('bingo', bingo => {
      this.setState({bingo})
    })
  }

  render() {
    const gameMode = this.state.bingo.game_mode
    return (
      <Jumbotron>
        <h3>Admin Console</h3>
        {gameMode
          ?
          <Button bsStyle="primary" onClick={this.handlePause}>Pause Game</Button>
          :
          <Button bsStyle="info" onClick={this.handleStart}>Start/Continue Game</Button>
        }
        <br/>
        <br/>
        <Button bsStyle="success" disabled={!gameMode} onClick={this.handleDrawBall}>Draw Ball</Button>
        <br />
        <br />
        <Button bsStyle="danger" onClick={this.handleNew}>End Bingo</Button>
      </Jumbotron>
    )
  }

  setAndEmit = (obj) => {
    this.setState({bingo: obj})
    this.socket.emit('bingo', obj)
  }

  handleDrawBall = () => {
    const url = 'http://localhost:3000/bingo/drawnballs'
    axios.get(url)
      .then((response) => {
        const bingo = Object.assign(this.state.bingo)
        bingo.drawn_balls = response.data
        this.setAndEmit(bingo)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleNew = () => {
    const url = 'http://localhost:3000/bingo/new'
    axios.get(url)
      .then(() => {
        this.setAndEmit({
          game_mode: false,
          drawn_balls: [],
          modal: {
            title: 'PayPal Bingo Game',
            body: 'Bingo ended. A new bingo will start soon...'
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  handleStart = () => {
    const bingo = Object.assign(this.state.bingo)
    bingo.game_mode = true
    this.setAndEmit(bingo)
  }

  handlePause = () => {
    // immutable copy
    const bingo = Object.assign(this.state.bingo)
    bingo.modal = {
      title: 'PayPal Bingo Game',
      body: 'Bingo is paused. Please wait...'
    }
    bingo.game_mode = false
    this.setAndEmit(bingo)
  }
}

export default Admin
