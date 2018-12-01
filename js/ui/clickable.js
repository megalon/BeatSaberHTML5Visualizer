export default class Clickable {
  constructor(_x, _y, _w, _h) {
    this.x = _x
    this.y = _y
    this.w = _w
    this.h = _h
  }

  getRectangle() {
    return {'x': this.x, 'y': this.y, 'width': this.w, 'height': this.h}
  }

  getClicked(mousePosition) {
    // Divide by 2 for the scale of the canvas
    let mx = mousePosition.x * 2
    let my = mousePosition.y * 2
    if ( mx >= this.x
      && mx <= this.x + this.w
      && my >= this.y
      && my <= this.y + this.h
      ){
        return true
      }
      return false
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}