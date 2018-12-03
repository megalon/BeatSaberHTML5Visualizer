// Store and display all of the bloqs, bombs, and obstacles in the beatmap. 
import { PI_DIVISIONS } from '../utils/constants.js'
import { makeBloq, makeWall } from './bloqbuilder.js'

// Draw the support lines below the bloqs
let drawSupports = false;
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
      let bloq = makeBloq(note._time, 3 - note._lineIndex, note._lineLayer, note._type, note._cutDirection)
      //console.log(bloq)

      // Store the bloqs into the correct array for depth sorting
      bloqs[note._lineLayer][note._lineIndex].push(bloq)
    }

    for (let i = 0; i < _obstacles.length; ++i) {
      let obstacle = _obstacles[i]
      console.log(obstacle)
      let wall = makeWall(obstacle._time, obstacle._lineIndex, obstacle._type, obstacle._duration, obstacle._width)
      console.log(obstacles)
      obstacles[obstacle._type][obstacle._lineIndex].push(wall)
    }
  }
  
  drawBeatmap(iso, timeOffset, xoffset, yoffset, zoffset, rotationPoints, rotations) {
    // Loop through all of the lineLayers
    for (let lineLayer = 0; lineLayer < bloqs.length; ++lineLayer){
      // Loop through all of the lineIndexes in this lineLayer

      let lineIndexLoop = true
      let lineIndex = -1
      if (rotations.z > PI_DIVISIONS.piover4) {
        lineIndex = bloqs[lineLayer].length
      }
      
      while (lineIndexLoop) {
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
        let tempX = 0
        for (let bloqIndex = lineIndexLength - 1; bloqIndex >= 0; --bloqIndex) {
          let bloq = bloqs[lineLayer][lineIndex][bloqIndex]

          // -----------------
          // Add the bloqs to the iso so they can be drawn onto the canvas
          // -----------------

          tempX = bloq.cube.shape.paths[0].points[0].x + timeOffset + xoffset
          
          // Skip drawing the bloqs if they aren't visible
          if (tempX < minX + xoffset || tempX - xoffset > maxX) continue

          // Draw the support stick
          if (bloq.supportStick !== undefined && drawSupports)
            iso.add(
              bloq.supportStick.shape
              .translate(timeOffset + xoffset, yoffset, zoffset)
              .rotateX(rotationPoints.x, rotations.x)
              .rotateY(rotationPoints.y, rotations.y)
              .rotateZ(rotationPoints.z, rotations.z)
              , bloq.supportStick.color
              )

          // Draw the cube
          iso.add(
            bloq.cube.shape
            .translate(timeOffset + xoffset, yoffset, zoffset)
            .rotateX(rotationPoints.x, rotations.x)
            .rotateY(rotationPoints.y, rotations.y)
            .rotateZ(rotationPoints.z, rotations.z)
            , bloq.cube.color
            )

          // Draw the arrow, if it exists. (Bombs have no arrow)
          if (bloq.arrow !== undefined)
            iso.add(
              bloq.arrow.shape
              .translate(timeOffset + xoffset, yoffset, zoffset)
              .rotateX(rotationPoints.x, rotations.x)
              .rotateY(rotationPoints.y, rotations.y)
              .rotateZ(rotationPoints.z, rotations.z)
              , bloq.arrow.color
              )
        }

        // -----------------
        // Draw the obstacles here
        // -----------------
        // Store amount of obstacles in the array so we don't have to get it for each item in the array
        lineIndexLength = obstacles[lineLayer][lineIndex].length
        tempX = 0
        for (let obstacleIndex = lineIndexLength - 1; obstacleIndex >= 0; --obstacleIndex) {
          let obstacle = obstacles[lineLayer][lineIndex][obstacleIndex]

          // The extra 1 is to make sure the walls appear / disappear at the right time
          tempX = obstacle.wall.shape.paths[0].points[0].x + timeOffset + xoffset
          
          //console.log(obstacle.duration)
          // Skip drawing the obstacles if they aren't visible
          if (tempX < minX + xoffset + 1 || tempX - xoffset > maxX + obstacle.duration) continue

          //console.log(`zRotationPoint:${zRotationPoint} zrotation:${zrotation}`)

          iso.add(
            obstacle.wall.shape
            .translate(timeOffset + xoffset, yoffset, zoffset)
            .rotateX(rotationPoints.x, rotations.x)
            .rotateY(rotationPoints.y, rotations.y)
            .rotateZ(rotationPoints.z, rotations.z)
            , obstacle.wall.color
            )
        }
      }
    }
  }

  getBloqs() {
    return bloqs
  }
}

