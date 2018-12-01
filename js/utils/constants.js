/*
  Constants
*/

export const PIDIVISIONS  = {
  'piover2': Math.PI / 2,
  'piover4': Math.PI / 4,
}

/*
lineIndex : Note horizontal position (0 to 3, start from left)
0 = left
1 = mid left
2 = mid right
3 = right
*/
export const lineIndexes = {
  'left': 0,
  'midleft' : 1,
  'midright' : 2,
  'right' : 3,
}

/*
 lineLayer : Note vertical position (0 to 2, start from bottom)
*/
export const lineLayers = {
  'bottom': 0,
  'middle': 1,
  'top': 2,
}

/*
 type : Note type (0 = red, 1 = blue, 3 = bomb)
*/
export const noteTypes = {
  'red': 0,
  'blue': 1,
  'bomb': 2,
}

/*
Cut directions
0 = up, 
1 = down, 
2 = left, 
3 = right, 
4 = up left, 
5 = up right, 
6 = down left,
7 = down right, 
8 = no direction
*/
export const cutDirections = {
  'down': 0,
  'up': 1,
  'right': 2,
  'left': 3,
  'downleft': 4,
  'downright': 5,
  'upleft': 6,
  'upright': 7,
  'none': 8,
}

/*
Obstacle type
0 = wall,
1 = ceiling
*/
export const obstacleTypes = {
  'wall': 0,
  'ceiling': 1,
}