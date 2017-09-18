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
  drawnBalls: PropTypes.array
}

const ScoreBoard = (props) => {
  const {drawnBalls = []} = props
  const immutableDrawnBalls = [...drawnBalls]
  const gameOn = immutableDrawnBalls.length > 0 ? true : false
  let lastBall = null
  let previousBalls = null
  if (immutableDrawnBalls.length > 0) {
    lastBall = immutableDrawnBalls.pop()
    previousBalls = immutableDrawnBalls.reverse().map((ball, index) => {
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
