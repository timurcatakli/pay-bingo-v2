module.exports = (app) => {
  const bingo = require('../controllers/')
  app.get('/bingo/drawnballs', bingo.getDrawnBalls)
  app.post('/bingo', bingo.confirmBingo)
}
