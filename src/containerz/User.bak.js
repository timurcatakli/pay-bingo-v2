import React from 'react'
// import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { Modal, Grid, Col, Row } from 'react-bootstrap'
import BingoBoard from '../components/BingoBoard'
import ScoreBoard from '../components/ScoreBoard'

function User() {
  const drawnBallsSet = new Set()
  drawnBallsSet.add(1)
  drawnBallsSet.add(46)
  drawnBallsSet.add(36)
  drawnBallsSet.add(99)
  drawnBallsSet.add(35)
  drawnBallsSet.add(51)

  const bingoBoard = new Set()
  bingoBoard.add(9)
  bingoBoard.add(36)
  bingoBoard.add(35)
  bingoBoard.add(86)
  bingoBoard.add(12)
  bingoBoard.add(17)
  bingoBoard.add(24)
  bingoBoard.add(32)
  bingoBoard.add(77)
  bingoBoard.add(2)
  bingoBoard.add(22)
  bingoBoard.add(62)
  bingoBoard.add(8)
  bingoBoard.add(57)
  bingoBoard.add(51)
  bingoBoard.add(41)
  bingoBoard.add(16)
  bingoBoard.add(82)
  bingoBoard.add(25)
  bingoBoard.add(94)
  bingoBoard.add(29)
  bingoBoard.add(27)
  bingoBoard.add(1)
  bingoBoard.add(49)
  bingoBoard.add(42)

  const bingoObject = {
    drawn_balls: drawnBallsSet,
    game_mode: true
  }
  return (
    <Grid>
      <Row>
        <Col md={12}><ScoreBoard bingo={bingoObject} /></Col>
      </Row>
      <Row>
        <Col md={6}><BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} /></Col>
        <Col md={6}><BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} /></Col>
      </Row>
      <Row>
        <Col md={6}><BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} /></Col>
        <Col md={6}><BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} /></Col>
      </Row>
      <Modal show={!bingoObject.game_mode}>
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

export default User
