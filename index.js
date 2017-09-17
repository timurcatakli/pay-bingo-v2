const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

// Handles all routes so you do not get a not found error
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.post('/', (req, res) => {
  const { Body, From, MediaUrl0 } = req.body
  const message = {
    body: Body,
    from: From.slice(8),
    img: MediaUrl0
  }
  io.emit('message', message)
  res.send(`
           <Response>
            <Message>Thanks for texting!</Message>
           </Response>
           `)
})

io.on('connection', socket => {
  socket.on('bingo', bingo => {
    socket.broadcast.emit('bingo', bingo)
  })
})

server.listen(3000)
