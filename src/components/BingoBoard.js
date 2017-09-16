import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import '../App.css'

const propTypes = {
  bingo: PropTypes.object.isRequired,
  bingoBoard: PropTypes.object.isRequired
}

const BingoBoard = (props) => {
  const bingoBoard = props.bingoBoard.values()
  const drawnBalls = props.bingo.drawn_balls
  const selectedStyle = 'selected'
  const boardEntries = Array.from(bingoBoard).map((ball, index) => {
    if (drawnBalls.has(ball)) { return <Grid key={`key-${index}`} className={`bingo-entry ${selectedStyle}`}>{ball}</Grid> }
    return <Grid key={`key-${index}`} className="bingo-entry">{ball}</Grid>
  })
  return (
    <Grid item md={12}>
      <Paper>
        <Grid container style={{padding: '0px'}}>{boardEntries}</Grid>
      </Paper>
    </Grid>
  )
}

BingoBoard.propTypes = propTypes
export default BingoBoard
