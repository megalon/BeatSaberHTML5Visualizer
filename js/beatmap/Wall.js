import { makeWall } from './bloqbuilder.js'
import NoteParent from './NoteParent.js';

export default class Wall extends NoteParent{
  constructor(time, lineIndex, type, duration, width){
    super(time, lineIndex)
    this.type = type
    this.duration = duration
    this.width = width

    this.wall = makeWall(time, lineIndex, type, duration, width)
  }

  getXPosition(){
    return this.wall.shape.paths[0].points[0].x
  }

  draw(iso, timeOffset, xyzOffsets, rotationPoints, rotations) {
    iso.add(
      this.wall.shape
      .translate(timeOffset + xyzOffsets.x, xyzOffsets.y, xyzOffsets.z)
      .rotateX(rotationPoints.x, rotations.x)
      .rotateY(rotationPoints.y, rotations.y)
      .rotateZ(rotationPoints.z, rotations.z)
      , this.wall.color
      )
  }
}