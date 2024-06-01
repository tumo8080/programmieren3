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

let c = 0;

socket.on('matrix', (matrix) => {
    let aktivesArray = matrix;
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

document.addEventListener('DOMContentLoaded', () => {
    const gras = document.getElementById('gras');
    const city = document.getElementById('city');
    const rasenFresser = document.getElementById('rasen-fresser');
    const cityDestroyer = document.getElementById('city-destroyer');
    
    console.log(gras.children);
    console.log(city);
    console.log(rasenFresser);
    console.log(cityDestroyer);

    socket.on('data', (data) => {
        gras.children[1].innerHTML = data.gras.created;
        gras.children[2].innerHTML = data.gras.living;

        city.children[1].innerHTML = data.city.created;
        city.children[2].innerHTML = data.city.living;

        rasenFresser.children[1].innerHTML = data.rasen_fresser.created;
        rasenFresser.children[2].innerHTML = data.rasen_fresser.living;

        cityDestroyer.children[1].innerHTML = data.city_destroyer.created;
        cityDestroyer.children[2].innerHTML = data.city_destroyer.living;
        cityDestroyer.children[2].innerHTML = data.city_destroyer.destroied_citys;
    });
});