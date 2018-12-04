import BeatmapController from './beatmap/beatmapcontroller.js'
import Playbutton from './ui/playbutton.js';
import MapSlider from './ui/mapslider.js';

const { Point, Shape, Color } = Isomer

const canvas = document.querySelector('canvas')
//canvas.width = 500
//canvas.height = 500

// Isomer object that handles drawing
const iso = new Isomer(document.getElementById("art"))

// Rendering and movement of the beatmap
const beatmapController = new BeatmapController()

//const testSongPath = '../testdata/Test Track/Easy.json'
const testSongPath = '../testdata/Your voice so - PSYQUI/ExpertPlus.json'
//const testSongPath = '../testdata/ExpertPlus.json'
//const testSongPath = '../testdata/Tank! (Ben Briggs Remix)/Expert.json'
beatmapController.loadBeatmap(testSongPath)

var ctx = canvas.getContext('2d')
var cvWidth = canvas.width
var cvHeight = canvas.height

let x = 0
let xRotation = 0
let yRotation = 0
let zRotation = 0
let rotationSpeed = 0.01
let rotationMax = Math.PI / 2
let rotationMin = 0
let speed = 0.03
let paused = true
let playButton = new Playbutton(0, 1000 - 200, 100, 100)
let mapSlider = new MapSlider(0, 1000 - 100, 1000, 100)

function animate() {
  // call again next time we can draw
  requestAnimationFrame(animate)
  // clear canvas
  ctx.clearRect(0, 0, cvWidth, cvHeight)

  beatmapController.draw(iso, -x, {'x':-2, 'y':1.5, 'z':1}, {'x':xRotation, 'y':yRotation, 'z':zRotation})
  //beatmapController.draw(iso, -x, 0, 0, 0, {'x':xRotation, 'y':yRotation, 'z':zRotation})

  playButton.draw(ctx)
  mapSlider.draw(ctx)

  if(!paused){
    x += speed
    //zRotation += speed
  }
}

animate()

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

let oldMousePos = undefined
let mouseRotationSpeed = 0.01
const MOUSE_DRAGGING_EVENT = 1

// Drag to change Z rotation
canvas.addEventListener('mousemove', function(evt) {
  let mousePos = getMousePos(canvas, evt)
  if (evt.which === MOUSE_DRAGGING_EVENT){
    if (oldMousePos !== undefined){
      if (mousePos.y < 450) {
        //yRotation += (mousePos.y - oldMousePos.y) * mouseRotationSpeed
        zRotation += (mousePos.x - oldMousePos.x) * mouseRotationSpeed
      }
    }

    if (mapSlider.getClicked(mousePos)) {
      x = mousePos.x
    }

    oldMousePos = mousePos
  } else {
    // Reset so rotation doesn't jump to value where mouse is clicked next
    oldMousePos = undefined
  }
}, false)

canvas.addEventListener('click', function(evt) {
  let mousePos = getMousePos(canvas, evt)
  // Scale to CSS size
  // Since canvas is scaled down by two, need to scale this down as well
  console.log(mousePos)
  if(playButton.getClicked(mousePos))
    paused = !paused
})