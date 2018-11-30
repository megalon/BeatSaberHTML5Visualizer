import BeatmapBuilder from './beatmapbuilder.js'

const { Point, Shape, Color } = Isomer

let builder = new BeatmapBuilder()

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

  draw(iso, timeOffset, xoffset, yoffset, zoffset){
    this.drawGrid(iso, timeOffset, xoffset, yoffset, zoffset)
    builder.drawBeatmap(iso, timeOffset, xoffset, yoffset, zoffset)
  }

  drawGrid(iso, timeOffset, xoffset, yoffset, zoffset) {
    // Floor
    let floorLength = 10
    let gridlineWidth = 1/16
    let halfgridlineWidth = gridlineWidth / 2
    let gridColor = new Color(200, 200, 200)
    iso.add(Shape.Prism(Point.ORIGIN, 10, 4, 0).translate(xoffset + 0.5, yoffset, zoffset))

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
        .translate(0.5 - halfgridlineWidth, 0, 0),
        gridColor
      )
    }
  }
}