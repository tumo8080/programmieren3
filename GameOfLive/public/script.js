const socket = io();
const cellSize = 20;

function setup() {
    createCanvas(100, 100);
}

socket.on('matrix', (matrix) => {
    console.log(matrix);
});