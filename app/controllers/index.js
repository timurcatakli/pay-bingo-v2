// These directories may seem like overkill
// for a simple small app,
// but they are for knowlegde demonstration purposes

const getNewUniqueBall = () => {
  const drawnBallsSet = new Set()
  return (draw) => {
    if (!draw && arguments.length > 0) {
      drawnBallsSet.clear()
    } else {
      const totalDrawings = 100
      const currentSize = drawnBallsSet.size
      let generate = true
      // JS Set only contains unique values
      // so we loop until size is increased by 1
      // also utilize closure to remember set values
      // finally convert set to array and send
      while (generate && currentSize < totalDrawings) {
        drawnBallsSet.add(Math.floor(Math.random() * 100) + 1)
        if (drawnBallsSet.size === (currentSize + 1)) { generate = false}
      }
    }
    return Array.from(drawnBallsSet)
  }
}
const draw = getNewUniqueBall()

exports.getDrawnBalls = (req, res) => {
  res.send(draw(true))
}

exports.getNewBingo = (req, res) => {
  res.send(draw(false))
}

const confirmBingoResult = (drawnBalls, bingoBoardValues) => {
  const boardSize = 25
  if (drawnBalls) {
    if (drawnBalls.length < boardSize ) {
      return false
    }
    for (const num of bingoBoardValues) {
      if (drawnBalls.indexOf(num) === -1) { return false}
    }
  } else {
    return false
  }
  return true
}

exports.confirmBingo = (req, res) => {
  const {drawnBalls, bingoBoardValues} = req.body
  res.send(confirmBingoResult(drawnBalls, bingoBoardValues))
}
