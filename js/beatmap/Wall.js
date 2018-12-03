import bloqbuilder from './bloqbuilder.js'
import NoteParent from './noteParent.js';

export default class Wall extends NoteParent{
  constructor(time, lineIndex, type, duration, width){
    super(time, lineIndex)
    this.type = type
    this.duration = duration
    this.width = width

    this.wall = bloqbuilder.makeWall(time, lineIndex, type, duration, width)
  }
}