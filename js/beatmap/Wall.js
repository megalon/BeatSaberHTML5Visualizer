import { makeWall } from './bloqbuilder.js'
import NoteParent from './NoteParent.js';
const { Point } = Isomer

export default class Wall extends NoteParent{
  constructor(time, lineIndex, type, duration, width){
    super(time, lineIndex)
    this.type = type
    this.duration = duration
    this.width = width

    this.wall = makeWall(0, lineIndex, type, duration, width)
  }

  getXPosition(){
    return this.wall.shape.paths[0].points[0].x
  }

  draw(iso, timeOffset, xyzOffsets, rotationPoints, rotations, gridScale) {
    let scaledTimeOffset = (this.time + timeOffset) * gridScale
    iso.add(
      this.wall.shape
      .scale(Point.ORIGIN, gridScale, 1, 1)
      .translate(scaledTimeOffset + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z)
      .rotateX(rotationPoints.x, rotations.x)
      .rotateY(rotationPoints.y, rotations.y)
      .rotateZ(rotationPoints.z, rotations.z)
      , this.wall.color
      )
  }
}