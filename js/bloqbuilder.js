// This file generates uses isomer.js to draw the actual bloq objects

import { cutDirections, noteTypes, obstacleTypes } from './utils/constants.js'
const { Color, Shape, Point, Path } = Isomer

const yes = 'yes'
export default yes

let red = new Color(160, 60, 50)
let blue = new Color(50, 60, 160)
let redSupport = new Color(160, 60, 50, 0.25)
let blueSupport = new Color(50, 60, 160, 0.25)
let gray = new Color(50, 50, 50, 1)
let graySupport = new Color(50, 50, 50, 0.25)
let white = new Color(255, 255, 255)
let redwall = new Color(255, 0, 0, 0.25)

let piover2 = Math.PI / 2
let piover4 = Math.PI / 4

let supportStickScale = 16
let arrowExtrusion = 0.1

/**
 * 
 * @param {Isomer} iso 
 * @param {*} time 
 * @param {*} lineIndex 
 * @param {*} lineLayer 
 * @param {*} cutDirection 
 * @param {*} type 
 */
export function makeBloq(time, lineIndex, lineLayer, type, cutDirection) {
  let color = red
  // The support strut under raised bloqs
  let colorSupport = redSupport

  switch (type) {
    case noteTypes.red:
      color = red
      colorSupport = redSupport
      break
    case noteTypes.blue:
      color = blue
      colorSupport = blueSupport
      break
    case noteTypes.bomb:
      color = gray
      colorSupport = graySupport
      break
  }

  let supportStick = undefined
  let cube = undefined
  let arrow = undefined

  if (lineLayer > 0)
    supportStick = getColoredShape(getSupportStick(lineIndex, lineLayer, time), colorSupport)

  // Rotate cube for angled bloqs
  if (type === noteTypes.bomb) {
    let bomb = makeBomb().translate(time, lineIndex, lineLayer)
    cube = getColoredShape(bomb, gray)
  }else{
    if (cutDirection >= cutDirections.downleft && cutDirection <= cutDirections.upright)
      cube = getColoredShape(Shape.Prism(Point.ORIGIN).rotateX(Point(0, 0.5, 0.5), piover4).translate(time, lineIndex, lineLayer), color)
    else
      cube = getColoredShape(Shape.Prism(Point(time, lineIndex, lineLayer)), color)

    arrow = getColoredShape(makeArrow(cutDirection).translate(time, lineIndex, lineLayer), white)
  }

  return {'cube': cube, 'arrow': arrow, 'supportStick': supportStick}
}

export function makeWall(time, lineIndex, type, duration, width) {
  // iso.add(Shape.Prism(Point(0,0,0),red).scale(Point.ORIGIN,1,1,4))
  let wall = undefined
  if (type === obstacleTypes.wall) {
    wall = Shape.Prism(Point.ORIGIN)
      .scale(Point.ORIGIN, -duration, width, 4)
      .translate(time + duration, 4 - lineIndex - width, 0)
      // ^ this translate is 3 - lineIndex - width + 1
  }else{
    wall = Shape.Prism(Point.ORIGIN)
      .scale(Point.ORIGIN, -duration, width, 2)
      .translate(time + duration, 4 - lineIndex - width, 2)
      // ^ this translate is 3 - lineIndex - width + 1
  }
  return { 'wall': getColoredShape(wall, redwall), 'duration': duration }
}

function makeBomb() {
  return Shape.extrude(
    // Path.Star = function(origin, outerRadius, innerRadius, points) {
    Path.Star(Point(0.5, 0.5, 0), 0.5, 0.25, 6),
    0.5
  ).rotateY(Point(0, 0, 0), piover2)
  .translate(1.25, 0, 0)
}

function makeArrow(direction) {
  if (direction === cutDirections.none){
    // Path.Circle = function(origin, radius, vertices) {
    return Shape.extrude(
      Path.Circle(Point(0.5, 0.5, 0), 0.3, 6),
      arrowExtrusion
    ).rotateY(Point(0, 0, 0), piover2)
    .rotateX(Point(0, 0.5, 0.5), arrowDirectionToRadians(direction))
    .scale(Point(0, 0.5, 0.5), 1, 0.75, 0.75)
  }
  return Shape.extrude(
      new Path([
        Point(1, 0, 0),
        Point(1, 1, 0),
        Point(0.5, 0.5, 0),
      ]),
      arrowExtrusion
    ).rotateY(Point(0, 0, 0), piover2)
    .rotateX(Point(0, 0.5, 0.5), arrowDirectionToRadians(direction))
    .scale(Point(0, 0.5, 0.5), 1, 0.75, 0.75)
}

function arrowDirectionToRadians(direction) {
  let radians = 0
  switch (direction) {
    case cutDirections.up:
      radians = 0;
      break
    case cutDirections.down:
      radians = Math.PI;
      break
    case cutDirections.left:
      radians = piover2;
      break
    case cutDirections.right:
      radians = -piover2;
      break
    case cutDirections.upleft:
      radians = Math.PI + piover4;
      break
    case cutDirections.upright:
      radians = Math.PI - piover4;
      break
    case cutDirections.downleft:
      radians = -piover4;
      break
    case cutDirections.downright:
      radians = piover4;
      break
    default:
      0;
      break
  }
  return radians
}

function getSupportStick(track, layer, time) {
  return Shape.Prism(
    Point(
      supportStickScale / 2,
      supportStickScale / 2,
      0
    )
  ).scale(
    Point.ORIGIN,
    1 / supportStickScale,
    1 / supportStickScale,
    layer
  ).translate(time, track, 0)
}

function getColoredShape(shape, color) {
  return { 'shape': shape, 'color': color}
}