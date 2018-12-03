import bloqbuilder from './bloqbuilder.js'

export default class Bloq extends NoteParent{
  constructor(time, lineIndex, lineLayer, type, cutDirection){
    super(time, lineIndex)
    this.lineLayer = lineLayer
    this.type = type
    this.cutDirection = cutDirection

    this.bloq = bloqbuilder.makeBloq(time, lineIndex, lineLayer, type, cutDirection)
  }
}