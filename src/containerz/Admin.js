import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Jumbotron, Button, Grid, Col, Row } from 'react-bootstrap'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bingo: {
        game_mode: false,
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
    return (
      <Jumbotron>
        <h3>Admin Console</h3>
        <p>
          {gameMode
            ?
            <Button bsStyle="primary" onClick={this.handlePause}>Pause Game</Button>
            :
            <Button bsStyle="info" onClick={this.handleStart}>Start/Continue Game</Button>
          }

          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button bsStyle="success" disabled={!gameMode} onClick={this.handleDrawBall}>Draw Ball</Button>
        </p>
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


  handleStart = () => {
    const bingo = Object.assign(this.state.bingo)
    bingo.game_mode = true
    this.setAndEmit(bingo)
  }

  handlePause = () => {
    // immutable copy
    const bingo = Object.assign(this.state.bingo)
    bingo.game_mode = false
    this.setAndEmit(bingo)
  }
}

export default Admin
