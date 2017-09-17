// dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

// app as an express instance
const app = express()
// this is important for socket.io
const server = http.createServer(app)
// initialize socketio to server not app
const io = socketIo(server)

// we connect webpack in order to utilize one (single) IP
app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

// Handles all routes so you do not get a not found error
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// turn on socket.io and broadcast bingo object under the name 'bingo'
io.on('connection', socket => {
  socket.on('bingo', bingo => {
    socket.broadcast.emit('bingo', bingo)
  })
})

// start listening for HTTP requests on specificed port.
const port = 3000
// start server to listen not the app so that socket.io can broadcast
server.listen(port)
