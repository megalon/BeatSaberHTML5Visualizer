import BeatmapController from './beatmapcontroller.js'


const { Point, Shape, Color } = Isomer

const canvas = document.querySelector('canvas')
//canvas.width = 500
//canvas.height = 500

// Isomer object that handles drawing
const iso = new Isomer(document.getElementById("art"));

// Rendering and movement of the beatmap
const beatmapController = new BeatmapController()

beatmapController.drawGrid(iso)

const testSongPath = '../testdata/Your voice so - PSYQUI/ExpertPlus.json'
//const testSongPath = '../testdata/ExpertPlus.json'
//const testSongPath = '../testdata/Tank! (Ben Briggs Remix)/Expert.json'
beatmapController.loadBeatmap(testSongPath)

var ctx = canvas.getContext('2d');
var cvWidth = canvas.width;
var cvHeight = canvas.height;



let x = 0
let speed = 0.05
let paused = true

function animate() {
  // call again next time we can draw
  requestAnimationFrame(animate);
  // clear canvas
  ctx.clearRect(0, 0, cvWidth, cvHeight);

  beatmapController.draw(iso, -x, -2, 1.5, -0.5)

  //iso.add(test2.test.translate(x, 0, 0), new Color(0, 0, 0))

  if(!paused)
    x += speed     
}

animate()

// click handler to add random rects
window.addEventListener('click', function() {
  paused = !paused
});