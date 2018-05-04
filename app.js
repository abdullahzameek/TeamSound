const serial = require('serialport')
const portName = process.argv[2]
const sPort = new serial(portName, 9600)
const parser = new serial.parsers.Readline()
sPort.pipe(parser)

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

// sockets

const io = require('socket.io').listen(server);
let servers = [];
let browser = null;

io.on('connection', (socket) => {
  console.log('boop')
})

io.on('browser-connect', (socket) => {
  console.log(`${socket}: browser connected`)
  browser = socket;
})

io.on('server connect', (socket) => {
  console.log(`${socket}: server connected`)
  servers.push(socket)
})

io.on('sound', (socket, data) => {
  if (browser) {
    browser.emit('sound', data)
  }
})

const boop = () => {
  io.emit('sound')
}

// serial

const readSerial = (data) => {
  //console.log(data)
  io.emit('sound', data)
}

sPort.on('open', () => {
  console.log(`Port open at ${sPort.baudRate} baud!`)
})

sPort.on('error', () => {
  console.log('PORT ERROR')
})

parser.on('data', readSerial)
