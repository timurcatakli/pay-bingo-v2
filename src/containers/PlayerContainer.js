import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import ScoreBoard from '../components/ScoreBoard'
import BingoBoard from '../components/BingoBoard'

const styles = () => ({
  x: {
    width: '960px',
    margin: '0 auto 0'
  }
})

function ButtonAppBar(props) {
  const classes = props.classes
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
    <Grid container spacing={24} className={classes.x}>
      <ScoreBoard bingo={bingoObject} />
      <Grid item md={6}>
        <BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} />
      </Grid>
      <Grid item md={6}>
        <BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} />
      </Grid>
      <Grid item md={6}>
        <BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} />
      </Grid>
      <Grid item md={6}>
        <BingoBoard bingoBoard={bingoBoard} bingo={bingoObject} />
      </Grid>
    </Grid>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
