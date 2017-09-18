import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'react-bootstrap'

const propTypes = {
  drawnBalls: PropTypes.array,
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
  const {drawnBalls = [], bingoBoard = new Set(), onBingoClaim, value} = props
  const immutableDrawnBalls = [...drawnBalls]
  const bingoButtonDisabled = immutableDrawnBalls.length === 0 ? true : false
  const boardEntries = Array.from(bingoBoard.values()).map((ball, index) => {
    const selectedStyle = immutableDrawnBalls.indexOf(ball) !== -1 ? 'success' : 'default'
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
