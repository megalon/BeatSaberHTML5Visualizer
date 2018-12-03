import Clickable from "./clickable.js";

export default class Playbutton extends Clickable{
  constructor(_x, _y, _w, _h){
    super(_x, _y, _w, _h)
  }

  draw(ctx){
    //console.log(this._ctx)
    ctx.fillStyle = '#aaa';
    super.draw(ctx)

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(this.x + 20, this.y + 20)
    ctx.lineTo(this.x + 80, this.y +  50)
    ctx.lineTo(this.x + 20, this.y +  80)
    ctx.closePath()
    ctx.fill()
  }
}