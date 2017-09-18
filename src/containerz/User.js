import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import { Grid, Col, Row } from 'react-bootstrap'
import BingoBoard from '../components/BingoBoard'
import ScoreBoard from '../components/ScoreBoard'
import NotificationModal from '../components/NotificationModal'
import { generateBingoBoard } from '../utils/index'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bingo: {},
      bingoBoard: [],
      modal: {
        title: 'PayPal Bingo Game',
        body: 'Your Admin will start the game soon!'
      }
    }
  }

  componentWillMount() {
    this.setState({bingoBoard: generateBingoBoard()})
    this.socket = io('/')
    this.socket.on('bingo', bingo => {
      const immutableBingo = Object.assign(bingo)
      immutableBingo.drawn_balls = [...bingo.drawn_balls]
      this.setState({bingo: immutableBingo})
    })
  }

  render() {
    const {bingo} = this.state
    const gameMode = bingo.game_mode
    const drawnBalls = bingo.drawn_balls
    const showModal = gameMode ? false : true
    return (
      <Grid>
        <Row>
          <Col md={12}><ScoreBoard drawnBalls={drawnBalls} /></Col>
        </Row>
        <Row style={{marginBottom: '40px'}}>
          <Col md={6}>
            <BingoBoard
              bingoBoard={this.state.bingoBoard[0]}
              drawnBalls={drawnBalls}
              onBingoClaim={this.handleBingoClaim}
              value="0"
            />
          </Col>
          <Col md={6}>
            <BingoBoard
              bingoBoard={this.state.bingoBoard[1]}
              drawnBalls={drawnBalls}
              onBingoClaim={this.handleBingoClaim}
              value="1"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BingoBoard
              bingoBoard={this.state.bingoBoard[2]}
              drawnBalls={drawnBalls}
              onBingoClaim={this.handleBingoClaim}
              value="2"
            />
          </Col>
          <Col md={6}>
            <BingoBoard
              bingoBoard={this.state.bingoBoard[3]}
              drawnBalls={drawnBalls}
              onBingoClaim={this.handleBingoClaim}
              value="3"
            />
          </Col>
        </Row>
        <NotificationModal
          title={this.state.modal.title}
          body={this.state.modal.body}
          show={showModal}
        />
      </Grid>
    )
  }

  setAndEmit = (obj) => {
    this.setState({bingo: obj})
    this.socket.emit('bingo', obj)
  }

  handleBingoClaim = (e) => {
    const bingo = Object.assign(this.state.bingo)
    const bingoBoardValues = Array.from(this.state.bingoBoard[e.target.value])
    const drawnBalls = [...this.state.bingo.drawn_balls]
    const url = 'http://localhost:3000/bingo'
    axios.post(url, {
      bingoBoardValues,
      drawnBalls
    })
      .then((response) => {
        const result = response.data
        if (result) {
          this.setState(
            {
              bingo: {game_mode: false},
              modal: {title: 'Congratulations', body: 'Bingo!, you won!'}
            }
          )
        } else {
          this.setState(
            {
              bingo: {game_mode: false},
              modal: {title: 'Sorry', body: 'It is not Bingo!'}
            }
          )
        }
        bingo.game_mode = false
        this.socket.emit('bingo', bingo)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default User
