class Sound {
  constructor() {
    this.notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
            'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']

    this.basicSynth = new Tone.Synth().toMaster();

    this.cIndex = 0;

    this.buffer = []
  }

  play(ind) {
    this.basicSynth.triggerAttackRelease(this.notes[ind], '8n')
  }

  randomNote() {
    let note = Math.floor(Math.random()*this.notes.length)
    this.basicSynth.triggerAttackRelease(this.notes[note], '8n')
  }

  noteUp() {
    this.play(this.cIndex)
    ++this.cIndex;
    this.cIndex %= this.notes.length;
  }

  noteDown() {
    this.play(this.cIndex)
    --this.cIndex
    if (this.cIndex < 0) {
      this.cIndex = this.notes.length - 1
    }
  }

  push(d) {
    this.buffer.push(d)
  }

  avg(cb) {
    let a = 0;
    let l = this.buffer.length;
    for (let i = 0; i < l; ++i) {
      a += this.buffer[i]
    }
    a /= l
    this.buffer.splice(0, this.buffer.length);

    if (cb) {
      cb(a)
    }
  }

  threshold(t, cb) {
    let trigger = false;
    let val = 0;
    for (let i = 0; i < this.buffer.length; ++i) {
      let x = this.buffer[i]
      if (x <= t) {
        trigger = true
        val = x
        break
      }
    }

    if (trigger) {
      cb(val)
    }
  }
}

document.addEventListener('DOMContentLoaded', function (e) {
  //s.randomNote()
  //socket.emit('browser-connect', 'floop')
  let d = document.getElementById('datadiv')
  let ip = d.dataset.ip
  let port = d.dataset.port

  let s = new Sound()
  let socket = io.connect(`http://${ip}:${port}`, {reconnect: true})

  socket.on('sound', (data) => {
    console.log('boop')
    data = data.trim();
    s.push(parseFloat(data))
  })

  s.play(3)
  setInterval(() => {
    s.avg((a) => {
      if (a < 100) {
        s.play(Math.round(a) % s.notes.length)
      }
    })
  }, 1000)
  // setInterval(() => {
  //   s.threshold(100, (a) => {
  //     console.log(a)
  //     s.play(Math.round(a)*5 % s.notes.length)
  //   })
  // }, 100)
});
