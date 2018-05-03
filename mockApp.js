const express = require('express')
const app = express()
const port = 5000

app.set('view engine', 'pug')
app.use('/static', express.static(__dirname + '/static'))
app.use('/tone', express.static(__dirname + '/node_modules/tone/build'))

app.get('/', (cReq, cRes) => {
  cRes.render('index')
})

app.get('/boop', (cReq, cRes) => {
  boop()
  cRes.send('hi')
})

const server = app.listen(port, () => console.log(`Server listening on port ${port}...`))

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('boop')
})

const boop = () => {
  io.emit('sound', {for: 'everyone'})
}
