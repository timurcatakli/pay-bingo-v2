import React from 'react'
import io from 'socket.io-client'
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
    const gameOn = this.state.bingo.game_mode === 'on' ? true : false
    return (
      <Jumbotron>
        <h3>Admin Console</h3>
        <p>
          {gameOn
            ?
            <Button bsStyle="primary" onClick={this.handleStart}>Pause Game</Button>
            :
            <Button bsStyle="primary" onClick={this.handleStart}>Start Game</Button>
          }

          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button bsStyle="success" onClick={this.handleDrawBall}>Draw Ball</Button>
        </p>
      </Jumbotron>
    )
  }

  handleDrawBall = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(function(response) {
        console.log(response)
        return response
      })

    console.log('handleDrawBall')
    const bingo = Object.assign(this.state.bingo)
    if (bingo.game_mode === 'on') {
      const drawnBallsSet = bingo.drawn_balls
      drawnBallsSet.push((Math.floor(Math.random() * 100) + 1 ))
      bingo.drawn_balls = drawnBallsSet
      this.setState({bingo})
      this.socket.emit('bingo', bingo)
    }
  }

  handleStart = () => {
    const bingo = Object.assign(this.state.bingo)
    bingo.game_mode = 'on'
    this.setState({bingo})
    this.socket.emit('bingo', bingo)
  }
}

export default Admin
