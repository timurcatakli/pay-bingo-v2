import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import deepOrange from 'material-ui/colors/deepOrange'
import deepPurple from 'material-ui/colors/deepPurple'
import '../App.css'

const styles = {
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: deepPurple[500]
  }
}

const propTypes = {
  bingo: PropTypes.shape({
    game_mode: PropTypes.bool.isRequired,
    drawn_balls: PropTypes.object.isRequired
  })
}

const ScoreBoard = (props) => {
  const gameMode = props.bingo.game_mode || false
  const drawnBalls = props.bingo.drawn_balls.values()
  const lastBall = drawnBalls.next().value
  const previousBalls = Array.from(drawnBalls).map((ball, index) => {
    return <Avatar style={styles.orangeAvatar} className="previous-balls" key={index}>{ball}</Avatar>
  })
  return (
    <Grid item md={12}>
      <Paper elevation={0} className="scoreboard">
        { gameMode ?
          <Grid container>
            <Grid item md={2}>Last Ball</Grid>
            <Grid item md={10}>Previous Balls</Grid>
            <Grid item md={2}><Avatar style={styles.purpleAvatar} className="previous-balls">{lastBall}</Avatar></Grid>
            <Grid item md={10}>{previousBalls}</Grid>
          </Grid>
          :
          <h2>Please be patient! Your admin will start a new game, soon...</h2>
        }
      </Paper>
    </Grid>
  )
}

ScoreBoard.propTypes = propTypes
export default ScoreBoard
