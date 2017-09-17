import React from 'react'
import PropTypes from 'prop-types'
import { Jumbotron, Button, Grid, Col, Row } from 'react-bootstrap'
import '../containerz/App.css'

const style = {
  button: {
    fontSize: '24px',
    width: '60px',
    height: '60px',
    marginRight: '4px'
  }
}
const propTypes = {
  bingo: PropTypes.shape({
    game_mode: PropTypes.oneOf(['on', 'off', 'paused']),
    drawn_balls: PropTypes.object
  })
}

const ScoreBoard = (props) => {
  const {bingo} = props
  const drawnBalls = bingo.drawn_balls ? Array.from(bingo.drawn_balls) : []
  const gameOn = drawnBalls.length > 0 ? true : false
  let lastBall = null
  let previousBalls = null
  if (drawnBalls.length > 0) {
    lastBall = drawnBalls.pop()
    previousBalls = drawnBalls.reverse().map((ball, index) => {
      return <Button style={style.button} key={index}>{ball}</Button>
    })
  }

  return (
    <Jumbotron>
      { gameOn
        ?
        <Grid>
          <Row>
            <Col md={2}><h3>Last Ball</h3></Col>
            <Col md={10}><h3>Previous Balls</h3></Col>
          </Row>
          <Row>
            <Col md={2}><Button bsStyle="primary" style={style.button}>{lastBall}</Button></Col>
            <Col md={10}>{previousBalls}</Col>
          </Row>
        </Grid>
        :
        <Grid>
          <Row>
            <Col md={12}><h3>First ball will be drawn soon...</h3></Col>
          </Row>

        </Grid>
      }
    </Jumbotron>
  )
}

ScoreBoard.propTypes = propTypes
export default ScoreBoard
