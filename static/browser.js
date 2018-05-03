const Sound = require('./sound.js')

let s = new Sound()

document.addEventListener('DOMContentLoaded', function (e) {
  s.randomNote()
});
