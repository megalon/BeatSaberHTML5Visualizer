
let canvas = undefined
let iso = undefined

export class UIController {

  constructor(canvas, iso) {
    this.canvas = canvas
    this.iso = iso
  }

  getCursorPosition(event) {
    if (canvas === undefined) {
      console.log("Error: Canvas is undefined")
      return undefined
    }
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    return {'x': x, 'y': y}
  }
}