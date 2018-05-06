let args = process.argv.slice(2)

const serial = require('serialport')
const portName = args[3] || 'COM6'
const sPort = new serial(portName, 9600)
const parser = new serial.parsers.Readline()
sPort.pipe(parser)

const Request = require('request')
const bp = require('body-parser')

const express = require('express')
const app = express()
const ip = args[0] || 'localhost'
const port = args[1] || 5000
const target = args[2] || 'localhost:5050'

app.set('view engine', 'pug')
app.use('/static', express.static(__dirname + '/static'))
app.use('/tone', express.static(__dirname + '/node_modules/tone/build'))
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())

app.get('/', (cReq, cRes) => {
  cRes.render('index', {ip: ip, port: port})
})

app.post('/boop', (cReq, cRes) => {
  let num = cReq.body.number
  io.emit('sound', num)
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
  //io.emit('sound', data)
  console.log('posting...')
  let url = `http://${target}/boop`
  let jData = {
    number: data
  }
  Request.post({
    url: url,
    json: true,
    body: jData
  }, (err, res, body) => {
    console.log(body)
  })
}

sPort.on('open', () => {
  console.log(`Port open at ${sPort.baudRate} baud!`)
})

sPort.on('error', () => {
  console.log('PORT ERROR')
})

parser.on('data', readSerial)
