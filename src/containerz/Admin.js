import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Jumbotron, Button, Grid, Col, Row } from 'react-bootstrap'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bingo: {
        game_mode: 'off', // off - on - paused
        drawn_balls: []
      }
    }
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('bingo', bingo => {
      this.setState({bingo})
    })
  }

  render() {
    const gameMode = this.state.bingo.game_mode
    const gameOn = gameMode === 'on' ? true : false
    return (
      <Jumbotron>
        <h3>Admin Console</h3>
        <p>
          {gameOn
            ?
            <Button bsStyle="primary" onClick={this.handlePause}>Pause Game</Button>
            :
            <Button bsStyle="info" onClick={this.handleStart}>Start/Continue Game</Button>
          }

          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button bsStyle="success" disabled={!gameOn} onClick={this.handleDrawBall}>Draw Ball</Button>
        </p>
      </Jumbotron>
    )
  }

  handleDrawBall = () => {
    const url = 'http://localhost:3000/bingo/drawnballs'
    axios.get(url)
      .then((response) => {
        const bingo = Object.assign(this.state.bingo)
        if (bingo.game_mode === 'on') {
          bingo.drawn_balls = response.data
          this.setState({bingo})
          this.socket.emit('bingo', bingo)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  setAndEmit = (obj) => {
    this.setState({bingo: obj})
    this.socket.emit('bingo', obj)
  }

  handleStart = () => {
    const bingo = Object.assign(this.state.bingo)
    bingo.game_mode = 'on'
    this.setAndEmit(bingo)
  }

  handlePause = () => {
    // immutable copy
    const bingo = Object.assign(this.state.bingo)
    bingo.game_mode = 'paused'
    this.setAndEmit(bingo)
  }
}

export default Admin
