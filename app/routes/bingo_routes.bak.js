// These directories may seem like overkill for a simple small app,
// but they are for knowlegde demonstration purposes


// MVC could be followed here instead of doing it all here
const getNewUniqueBall = () => {
  const drawnBallsSet = new Set()
  return () => {
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
    return Array.from(drawnBallsSet)
  }
}
const draw = getNewUniqueBall()

module.exports = (app) => {
  app.get('/bingo/balls', (req, res) => {
    res.send(draw())
  })
  app.post('/bingo/result', (req, res) => {
    console.log(req.body)
    // res.send({ "some": "json" });
    // res.send("html for Maximum Pain's web page");
    // res.send(404, 'No musicians here');
    // res.send(500, { error: 'you blew it' });
    // res.send(200);
    res.send(true)
  })
}
