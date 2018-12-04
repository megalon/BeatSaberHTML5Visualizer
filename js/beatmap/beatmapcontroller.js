import BeatmapBuilder from './beatmapbuilder.js'
const { Point, Shape, Color } = Isomer

const builder = new BeatmapBuilder()

const rotationPointMaster = new Point(0.5 + 5, 2, 0)
let rotationPoints = {'x': rotationPointMaster, 'y': rotationPointMaster, 'z': rotationPointMaster}

let tempRotationPoint = undefined
let tempRotationPoints = undefined

let drawingScale = 4

export default class BeatmapController {
  loadBeatmap(jsonfilepath) {
    // Load an actual file here
    fetch(jsonfilepath)
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        builder.buildBeatmap(myJson)
    })
  }

  draw(iso, timeOffset, xyzOffsets, rotations){
    tempRotationPoint = new Point(rotationPointMaster.x + xyzOffsets.x, rotationPointMaster.y + xyzOffsets.y, rotationPointMaster.z + xyzOffsets.z)
    tempRotationPoints = {'x': tempRotationPoint, 'y': tempRotationPoint, 'z': tempRotationPoint}

    this.drawGrid(iso, timeOffset, xyzOffsets, tempRotationPoints, rotations, drawingScale)
    builder.drawBeatmap(iso, timeOffset, xyzOffsets, tempRotationPoints, rotations, drawingScale)
  }

  drawGrid(iso, timeOffset, xyzOffsets, rotationPoints, rotations, drawingScale) {
    let floorLength = 10
    let gridlineWidth = 1/16
    let halfgridlineWidth = gridlineWidth / 2
    let gridColor = new Color(200, 200, 200)

    // Floor
    iso.add(
      Shape.Prism(Point.ORIGIN, 10, 4, 0.01)
      .translate(0.5 + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z - 0.01)
      .rotateX(rotationPoints.x, rotations.x)
      .rotateY(rotationPoints.y, rotations.y)
      .rotateZ(rotationPoints.z, rotations.z)
      )

    // Generate gridLines
    let numGridLines = Math.ceil(floorLength / drawingScale)
    for (let i = 0; i < numGridLines; i += 1) {
      let xPos = ((i + timeOffset) % numGridLines) * drawingScale + floorLength  + xyzOffsets.x
      if (xPos < xyzOffsets.x)
        continue
      iso.add(
        Shape.Prism(
          // Starting position
          Point(
            xPos,
            xyzOffsets.y,
            xyzOffsets.z
          ),
          // Ending position
          gridlineWidth,
          4,
          0.05)
        .translate(0.5 + halfgridlineWidth, 0, 0)
        .rotateX(rotationPoints.x, rotations.x)
        .rotateY(rotationPoints.y, rotations.y)
        .rotateZ(rotationPoints.z, rotations.z)
        , gridColor)
    }
  }
}