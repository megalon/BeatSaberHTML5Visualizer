import Clickable from "./clickable.js";

export default class MapSlider extends Clickable{
  constructor(_x, _y, _w, _h){
    super(_x, _y, _w, _h)
  }

  draw(ctx){
    ctx.fillStyle = '#aaa';
    super.draw(ctx)
  }
}