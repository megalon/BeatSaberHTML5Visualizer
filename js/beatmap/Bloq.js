import { makeBloq } from './bloqbuilder.js'
import NoteParent from './NoteParent.js'

export default class Bloq extends NoteParent{
  constructor(time, lineIndex, lineLayer, type, cutDirection){
    super(time, lineIndex)
    this.lineLayer = lineLayer
    this.type = type
    this.cutDirection = cutDirection

    this.bloq = makeBloq(0, lineIndex, lineLayer, type, cutDirection)
  }

  getXPosition() {
    return this.bloq.cube.shape.paths[0].points[0].x
  }

  draw(iso, timeOffset, xyzOffsets, rotationPoints, rotations, gridScale) {
    let scaledTimeOffset = (this.time + timeOffset) * gridScale
    //let timeDifference = this.time - timeOffset
    //let scaledTimeOffset = (timeDifference * this.gridScale) - timeDifference
    //idk come back ehre next time
    // Draw the support stick
    if (this.bloq.supportStick !== undefined && this.drawSupports)
      iso.add(
        this.bloq.supportStick.shape
        .translate(scaledTimeOffset + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z)
        .rotateX(rotationPoints.x, rotations.x)
        .rotateY(rotationPoints.y, rotations.y)
        .rotateZ(rotationPoints.z, rotations.z)
        , this.bloq.supportStick.color
        )

    // Draw the cube
    iso.add(
      this.bloq.cube.shape
      .translate(scaledTimeOffset + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z)
      .rotateX(rotationPoints.x, rotations.x)
      .rotateY(rotationPoints.y, rotations.y)
      .rotateZ(rotationPoints.z, rotations.z)
      , this.bloq.cube.color
      )

    // Draw the arrow, if it exists. (Bombs have no arrow)
    if (this.bloq.arrow !== undefined)
      iso.add(
        this.bloq.arrow.shape
        .translate(scaledTimeOffset + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z)
        .rotateX(rotationPoints.x, rotations.x)
        .rotateY(rotationPoints.y, rotations.y)
        .rotateZ(rotationPoints.z, rotations.z)
        , this.bloq.arrow.color
        )
  }
}