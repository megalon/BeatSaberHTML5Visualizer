// Store and display all of the bloqs, bombs, and obstacles in the beatmap. 
import { PI_DIVISIONS } from '../utils/constants.js'
import { makeBloq, makeWall } from './bloqbuilder.js'
import Bloq from './Bloq.js'
import Wall from './Wall.js'

// Bloqs are only displayed within this range (offset from current time)
let minX = 0
let maxX = 10

// Hold all of the bloqs in the beatmap
let bloqs = [
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]],
]

// Hold all of the walls in the beatmap
let obstacles = [
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]],
]

export default class BeatMapBuilder {
  buildBeatmap(jsondata) {
    //console.log(jsondata)
    const { _notes, _obstacles } = jsondata
    //console.log(JSON.stringify(_notes))
  
    console.log(`Building beatmap...`)
    console.log(`_notes.length: ${_notes.length}`)
  
    for (let i = 0; i < _notes.length; ++i) {
      let note = _notes[i]
      let bloq = new Bloq(note._time, 3 - note._lineIndex, note._lineLayer, note._type, note._cutDirection)

      // Store the bloqs into the correct array for depth sorting
      bloqs[note._lineLayer][note._lineIndex].push(bloq)
    }

    for (let i = 0; i < _obstacles.length; ++i) {
      let obstacle = _obstacles[i]
      let wall = new Wall(obstacle._time, obstacle._lineIndex, obstacle._type, obstacle._duration, obstacle._width)

      obstacles[obstacle._type][obstacle._lineIndex].push(wall)
    }
  }
  
  drawBeatmap(iso, timeOffset, xyzOffsets, rotationPoints, rotations) {
    // Loop through all of the lineLayers
    for (let lineLayer = 0; lineLayer < bloqs.length; ++lineLayer){
      let lineIndexLoop = true
      let lineIndex = -1
      if (rotations.z > PI_DIVISIONS.piover4) {
        lineIndex = bloqs[lineLayer].length
      }
      
      // Loop through all of the lineIndexes in this lineLayer
      // Using a while loop here to allow different loop conditions
      // based on camera placement (to preserve Z depth)
      while (lineIndexLoop) {
        // Swap iteration direction based on viewpoint
        // This preserves correct Z layering
        if (rotations.z < PI_DIVISIONS.piover4){
          if (lineIndex >= bloqs[lineLayer].length - 1) { 
            lineIndexLoop = false
            continue
          }
          ++lineIndex
        } else {
          if (lineIndex <= 0) { 
            lineIndexLoop = false
            continue
          }
          --lineIndex
        }
        
        // Store lineIndex length so we don't have to get it for each item in the array
        let lineIndexLength = bloqs[lineLayer][lineIndex].length
        // Loop through all of the bloqs in this lineIndex
        // This time, loop in reverse order for depth sorting!
        let tempX = undefined
        let bloq = undefined
        for (let bloqIndex = lineIndexLength - 1; bloqIndex >= 0; --bloqIndex) {
          bloq = bloqs[lineLayer][lineIndex][bloqIndex]

          tempX = bloq.getXPosition() + timeOffset + xyzOffsets.x

          // Skip drawing the bloqs if they aren't visible
          if (tempX < minX + xyzOffsets.x || tempX - xyzOffsets.x > maxX) continue

          bloq.draw(iso, timeOffset, xyzOffsets, rotationPoints, rotations)
        }

        // -----------------
        // Draw the obstacles here
        // -----------------
        // Store amount of obstacles in the array so we don't have to get it for each item in the array

        
        lineIndexLength = obstacles[lineLayer][lineIndex].length
        tempX = 0
        let obstacle = undefined
        for (let obstacleIndex = lineIndexLength - 1; obstacleIndex >= 0; --obstacleIndex) {
          obstacle = obstacles[lineLayer][lineIndex][obstacleIndex]

          tempX = obstacle.getXPosition() + timeOffset + xyzOffsets.x
          
          //console.log(obstacle.duration)
          // Skip drawing the obstacles if they aren't visible
          if (tempX < minX + xyzOffsets.x + 1 || tempX - xyzOffsets.x > maxX + obstacle.duration) continue

          obstacle.draw(iso, timeOffset, xyzOffsets, rotationPoints, rotations)
        }
      }
    }
  }
}

