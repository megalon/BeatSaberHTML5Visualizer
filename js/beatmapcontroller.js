import BeatmapBuilder from './beatmap/beatmapbuilder.js'

const { Point, Shape, Color } = Isomer

const builder = new BeatmapBuilder()

const rotationPointMaster = new Point(0.5 + 5, 2, 0)

let rotationPoints = {'x': rotationPointMaster, 'y': rotationPointMaster, 'z': rotationPointMaster}

let tempRotationPoint = undefined
let tempRotationPoints = undefined

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
    //console.log(`zRotationPointMaster:${zRotationPointMaster} zrotation:${zrotation}`)
    //console.log(zRotationPointMaster)
    //rotationPointMaster.translate(xoffset, yoffset, zoffset)
    //tempRotationPoints = {'x': rotationPointMaster, 'y': rotationPointMaster, 'z': rotationPointMaster}
    tempRotationPoint = new Point(rotationPointMaster.x + xyzOffsets.x, rotationPointMaster.y + xyzOffsets.y, rotationPointMaster.z + xyzOffsets.z)
    tempRotationPoints = {'x': tempRotationPoint, 'y': tempRotationPoint, 'z': tempRotationPoint}

    this.drawGrid(iso, timeOffset, xyzOffsets, tempRotationPoints, rotations)
    builder.drawBeatmap(iso, timeOffset, xyzOffsets, tempRotationPoints, rotations)
  }

  drawGrid(iso, timeOffset, xyzOffsets, rotationPoints, rotations) {
    // Floor
    let floorLength = 10
    let gridlineWidth = 1/16
    let halfgridlineWidth = gridlineWidth / 2
    let gridColor = new Color(200, 200, 200)
    iso.add(
      Shape.Prism(Point.ORIGIN, 10, 4, 0.01)
      .translate(0.5 + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z - 0.01)
      .rotateX(rotationPoints.x, rotations.x)
      .rotateY(rotationPoints.y, rotations.y)
      .rotateZ(rotationPoints.z, rotations.z)
      )

    // Generate gridLines
    for (let i = 0; i < floorLength; i += 1){
      iso.add(
        Shape.Prism(
          // Starting position
          Point(
            (i + timeOffset) % floorLength + floorLength + xyzOffsets.x,
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