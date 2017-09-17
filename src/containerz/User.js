import React from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { Modal, Grid, Col, Row } from 'react-bootstrap'
import BingoBoard from '../components/BingoBoard'
import ScoreBoard from '../components/ScoreBoard'
import { generateBingoBoard } from '../utils/index'

const propTypes = {}
const drawnBallsSet = new Set()
drawnBallsSet.add(1)
drawnBallsSet.add(46)
drawnBallsSet.add(36)
drawnBallsSet.add(99)
drawnBallsSet.add(35)
drawnBallsSet.add(51)

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bingo: {},
      bingoBoard: new Set()
    }
  }

  componentDidMount() {
    this.setState({bingoBoard: generateBingoBoard()})
    this.socket = io('/')
    this.socket.on('bingo', bingo => {
      const x = Object.assign(bingo)
      x.drawn_balls = new Set(bingo.drawn_balls)
      this.setState({bingo: x})
    })
  }

  render() {
    const gameMode = this.state.bingo.game_mode
    const bingoObject = this.state.bingo
    const showModal = gameMode === 'on' ? false : true
    return (
      <Grid>
        <Row>
          <Col md={12}><ScoreBoard bingo={bingoObject} /></Col>
        </Row>
        <Row>
          <Col md={6}><BingoBoard bingoBoard={this.state.bingoBoard[0]} bingo={bingoObject} /></Col>
          <Col md={6}><BingoBoard bingoBoard={this.state.bingoBoard[1]} bingo={bingoObject} /></Col>
        </Row>
        <Row>
          <Col md={6}><BingoBoard bingoBoard={this.state.bingoBoard[2]} bingo={bingoObject} /></Col>
          <Col md={6}><BingoBoard bingoBoard={this.state.bingoBoard[3]} bingo={bingoObject} /></Col>
        </Row>
        <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>PayPal Bingo Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Please be patient!</h4>
            <p>Your admin will start the game, soon...</p>
          </Modal.Body>
        </Modal>
      </Grid>
    )
  }
}

User.propTypes = propTypes
export default User
