const bingoRoutes = require('./bingo_routes')
module.exports = function(app, db) {
  bingoRoutes(app, db)
  // Other route groups could go here, in the future
}
