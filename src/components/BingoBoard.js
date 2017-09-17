import React from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import '../containerz/App.css'

const propTypes = {
  bingo: PropTypes.object.isRequired,
  bingoBoard: PropTypes.object.isRequired
}
const style = {
  button: {
    fontSize: '24px',
    width: '60px',
    height: '60px'
  },
  buttonToolbar: {
    width: '320px',
    marginBottom: '40px'
  }
}
const BingoBoard = (props) => {
  const bingoBoard = props.bingoBoard.values()
  const drawnBalls = props.bingo.drawn_balls || new Set()
  const boardEntries = Array.from(bingoBoard).map((ball, index) => {
    const selectedStyle = drawnBalls.has(ball) ? 'success' : 'default'
    const tag = <Button key={`key-${index}`} bsStyle={selectedStyle} style={style.button}>{ball}</Button>
    return tag
  })
  return (
    <ButtonToolbar style={style.buttonToolbar}>
      <ButtonGroup>{boardEntries}</ButtonGroup>
    </ButtonToolbar>
  )
}

BingoBoard.propTypes = propTypes
export default BingoBoard
