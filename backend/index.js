const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  socket.on('message', obj => io.emit('message', obj))
})

http.listen(3001, () => console.log('Backend is running on *:3001'))