const socket = io();
const cellSize = 20;

let XY;
let canvasXY;

function setup() {
    createCanvas(900, 900);
    noStroke();
}

socket.on('vars', ({ xy, canvas }) => {
    XY = xy;
    canvasXY = canvas;
})

socket.on('matrix', (matrix) => {
    // // Die Matrix wird auf den Bildschirm gezeichnet.
    // for (let i = 0; i < matrix.length; i++) {
    //     for (let j = 0; j < matrix[i].length; j++) {
    //         fill(matrix[i][j]); 
    //         rect(j * cellSize, i * cellSize, cellSize, cellSize);
    //     }
    // }
    // console.log(XY, canvasXY);

    let aktivesArray = matrix
    let kästchenXY = canvasXY / aktivesArray.length;
    for (let zeile = 0; zeile < XY; zeile++) {
        for (let spalte = 0; spalte < XY; spalte++) {
            element = matrix[zeile][spalte]
            if (element === 0) {
                fill("yellow")
            } else if (element === 1) {
                fill("#03ab03")
            } else if (element === 2) {
                fill("#E12213")
            } else if (element === 3) {
                fill("#818285")
            } else if (element === 4) {
                fill("#000")
            } 
            rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
        }
    }
});