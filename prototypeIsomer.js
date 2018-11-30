var Point  = Isomer.Point;
var Path   = Isomer.Path;
var Shape  = Isomer.Shape;
var Vector = Isomer.Vector;
var Color  = Isomer.Color;

var iso = new Isomer(document.getElementById("canvas"));

var piover4 = Math.PI/4;

var red = new Color(160, 60, 50);
var blue = new Color(50, 60, 160);
var gridColor = new Color(200, 200, 200);
var gray = new Color(150, 150, 150);
var white = new Color(255, 255, 255);

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
const arrowDirections = {
    'u':0,
    'd':1,
    'l':2,
    'r':3,
    'ul':4,
    'ur':5,
    'dl':6,
    'dr':7,
    'n':8,
}

let supportStickScale = 16;
let arrowExtrusion = 0.1; 

function placeBloq(time, lineIndex , lineLayer, cutDirection, type){
    if (lineLayer  > 0)
        iso.add(getSupportStick(lineIndex , lineLayer, time), gray)
    
    let color = red
    switch (type){
        case 0: color = red; break
        case 1: color = blue; break
    }
    iso.add(Shape.Prism(Point(time, lineIndex , lineLayer)), color)
    
    iso.add(makeArrow(arrowDirectionToNumber(cutDirection))
    .translate(time, lineIndex , lineLayer), white)
}

function makeArrow(direction) {
    return Shape.extrude(
        new Path([
            Point(1, 0, 0),
            Point(1, 1, 0),
            Point(0.5, 0.5, 0),
        ]),
        arrowExtrusion
    ).rotateY(Point(0,0,0), Math.PI/2)
    .rotateX(Point(0,0.5,0.5), arrowDirectionToRadians(direction))
    .scale(Point(0,0.5,0.5), 1, 0.75, 0.75)
}

function arrowDirectionToNumber(direction){
    switch (direction){
        case 'u':
            return arrowDirections.u;
        case 'd':
            return arrowDirections.d;
        case 'l':
            return arrowDirections.l;
        case 'r':
            return arrowDirections.r;
    }
}

function arrowDirectionToRadians(direction) {
    let radians = 0
    switch (direction){
        case arrowDirections.u: radians = 0; break
        case arrowDirections.d: radians = Math.PI; break
        case arrowDirections.l: radians = Math.PI / 2; break
        case arrowDirections.r: radians = -Math.PI / 2; break
        default: 0; break
        
    }
    return radians
}

function getSupportStick(track, layer, time) { 
    return Shape.Prism(
        Point(
            supportStickScale/2, 
            supportStickScale/2, 
            0
        )
    ).scale(
        Point.ORIGIN,
        1/supportStickScale,
        1/supportStickScale,
        layer
    ).translate(time,track,0)
}


// Floor
let floorLength = 10
let gridlineWidth = 1/16
let halfgridlineWidth = gridlineWidth / 2
iso.add(Shape.Prism(Point.ORIGIN, 10, 4, 0));
// GridLines
for (let i = 0; i < floorLength; i+=1){
    iso.add(
        Shape.Prism(Point(i, 0, 0), gridlineWidth, 4, 0.05)
        .translate(0.5-halfgridlineWidth, 0, 0), gridColor
    );
}

placeBloq(6, 3, 2, 'l', 0);
placeBloq(4, 3, 1, 'r', 0);
placeBloq(2, 1, 0, 'd', 0);
placeBloq(0, 3, 0, 'u', 0);

placeBloq(9, 0, 1, 'r', 1);
placeBloq(7, 0, 1, 'l', 1);
placeBloq(2, 0, 0, 'd', 1);
placeBloq(0, 2, 0, 'u', 1);


