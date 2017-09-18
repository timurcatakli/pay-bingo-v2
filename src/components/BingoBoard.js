import React from 'react'
import PropTypes from 'prop-types'
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import '../containerz/App.css'

const propTypes = {
  bingo: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  bingoBoard: PropTypes.object,
  onBingoClaim: PropTypes.func.isRequired
}

const style = {
  button: {
    fontSize: '24px',
    width: '60px',
    height: '60px'
  },
  buttonToolbar: {
    marginBottom: '40px'
  }
}

const BingoBoard = (props) => {
  const {bingoBoard = new Set(), onBingoClaim, value} = props
  const drawnBalls = props.bingo.drawn_balls || new Set()
  const bingoButtonDisabled = drawnBalls.size === 0 ? true : false
  const boardEntries = Array.from(bingoBoard.values()).map((ball, index) => {
    const selectedStyle = drawnBalls.has(ball) ? 'success' : 'default'
    const divider = (index + 1) % 5 === 0 ? <br/> : null
    const tag = <span key={`key-${index}`}><Button bsStyle={selectedStyle} style={style.button}>{ball}</Button>{divider}</span>
    return tag
  })
  return (
    <ButtonGroup>
      {boardEntries}
      <br />
      <center><Button bsStyle="info" disabled={bingoButtonDisabled} onClick={onBingoClaim} value={value}>BINGO!</Button></center>
    </ButtonGroup>
  )
}

BingoBoard.propTypes = propTypes
export default BingoBoard
