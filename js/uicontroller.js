
let canvas = undefined

export class UIController {

  constructor(canvas) {
    this.canvas = canvas
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