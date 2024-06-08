const socket = io();
const wetterElement = document.getElementById("wetter");

let XY;
let canvasXY;
let wetter = "sommer";

socket.on("vars", ({ xy, canvas, wetter }) => {
  XY = xy;
  canvasXY = canvas;
  wetter = wetter;
});

socket.on('wetter', (w) => {
    wetter = w;
});

function setup() {
  createCanvas(900, 900);
  noStroke();
}

socket.on("matrix", ({ matrix, colors }) => {
  let aktivesArray = matrix;
  let kästchenXY = canvasXY / aktivesArray.length;
  for (let zeile = 0; zeile < XY; zeile++) {
    for (let spalte = 0; spalte < XY; spalte++) {
      element = matrix[zeile][spalte];
      if (element === 0) {
        fill(colors[wetter][0]);
      } else if (element === 1) {
        fill(colors[wetter][1]);
      } else if (element === 2) {
        fill(colors[wetter][2]);
      } else if (element === 3) {
        fill(colors[wetter][3]);
      } else if (element === 4) {
        fill(colors[wetter][4]);
      }
      rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY);
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const gras = document.getElementById("gras");
  const city = document.getElementById("city");
  const rasenFresser = document.getElementById("rasen-fresser");
  const cityDestroyer = document.getElementById("city-destroyer");

  socket.on("data", (data) => {
    gras.children[1].innerText = data.gras.created;
    gras.children[2].innerText = data.gras.living;

    city.children[1].innerText = data.city.created;
    city.children[2].innerText = data.city.living;

    cityDestroyer.children[1].innerText = data.city_destroyer.created;
    cityDestroyer.children[2].innerText = data.city_destroyer.living;
    cityDestroyer.children[3].innerText = data.city_destroyer.destroied_citys;

    // console.log(cityDestroyer.children[2].innerText);

    rasenFresser.children[1].innerText = data.rasen_fresser.created;
    rasenFresser.children[2].innerText = data.rasen_fresser.living;
  });
});

// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
// city stirbt bei zu wenig resurcen
