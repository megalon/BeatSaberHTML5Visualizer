import BeatmapBuilder from './beatmapbuilder.js'

const { Point, Shape, Color } = Isomer

const builder = new BeatmapBuilder()

const xRotationPointMaster = new Point(1.5, 5, 0)
const yRotationPointMaster = xRotationPointMaster
const zRotationPointMaster = xRotationPointMaster

const rotationPoints = {'x': xRotationPointMaster, 'y': yRotationPointMaster, 'z': zRotationPointMaster}

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

  draw(iso, timeOffset, xoffset, yoffset, zoffset, rotations){
    //console.log(`zRotationPointMaster:${zRotationPointMaster} zrotation:${zrotation}`)
    //console.log(zRotationPointMaster)
    this.drawGrid(iso, timeOffset, xoffset, yoffset, zoffset, rotationPoints, rotations)
    builder.drawBeatmap(iso, timeOffset, xoffset, yoffset, zoffset, rotationPoints, rotations)
  }

  drawGrid(iso, timeOffset, xoffset, yoffset, zoffset, rotationPoints, rotations) {

    // Floor
    let floorLength = 10
    let gridlineWidth = 1/16
    let halfgridlineWidth = gridlineWidth / 2
    let gridColor = new Color(200, 200, 200)
    iso.add(
      Shape.Prism(Point.ORIGIN, 10, 4, 0.01)
      .translate(xoffset + 0.5, yoffset, zoffset - 0.01)
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
            (i + timeOffset) % floorLength + floorLength + xoffset,
            yoffset,
            zoffset
          ),
          // Ending position
          gridlineWidth,
          4,
          0.05)
        .translate(0.5 - halfgridlineWidth, 0, 0)
        .rotateX(rotationPoints.x, rotations.x)
        .rotateY(rotationPoints.y, rotations.y)
        .rotateZ(rotationPoints.z, rotations.z)
        , gridColor)
    }
  }
}