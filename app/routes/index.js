module.exports = (app) => {
  const bingo = require('../controllers/')
  app.get('/bingo/drawnballs', bingo.getDrawnBalls)
  app.get('/bingo/new', bingo.getNewBingo)
  app.post('/bingo', bingo.confirmBingo)
}
