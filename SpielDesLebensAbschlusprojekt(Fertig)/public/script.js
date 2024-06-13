const socket = io();

let XY;
let canvasXY;
let wetter = "sommer";
let process = 0;
let nextWetter = "winter";

socket.on("vars", ({ xy, canvas, wetter }) => {
  XY = xy;
  canvasXY = canvas;
  wetter = wetter;
});

socket.on("wetter", ({ w, wetterProcess, nextW }) => {
  wetter = w;
  process = wetterProcess;
  nextWetter = nextW;
});

function setup() {
  createCanvas(900, 900);
  noStroke();
}

function getColorBetweenTwoColorsByProcess(color1, color2, process) {
  process = Math.max(0, Math.min(100, process));
  let t = process / 100;
  
  let r = X(color1.levels[0], color2.levels[0], t);
  let g = X(color1.levels[1], color2.levels[1], t);
  let b = X(color1.levels[2], color2.levels[2], t);
  let a = X(color1.levels[3], color2.levels[3], t);
  
  return color(r, g, b, a);
}

function X(start, end, t) {
  return start + t * (end - start);
}


socket.on("matrix", ({ matrix, colors }) => {
  let aktivesArray = matrix;
  let kästchenXY = canvasXY / aktivesArray.length;
  for (let zeile = 0; zeile < XY; zeile++) {
    for (let spalte = 0; spalte < XY; spalte++) {
      element = matrix[zeile][spalte];
      if (process > 95) {
        
        if (element === 0) {
          fill(getColorBetweenTwoColorsByProcess(colors[wetter][0], colors[nextWetter][0], (process - 95 * (5 / 100))));
        } else if (element === 1) {
          fill(getColorBetweenTwoColorsByProcess(colors[wetter][1], colors[nextWetter][1], (process - 95 * (5 / 100))));
        } else if (element === 2) {
          fill(getColorBetweenTwoColorsByProcess(colors[wetter][2], colors[nextWetter][2], (process - 95 * (5 / 100))));
        } else if (element === 3) {
          fill(getColorBetweenTwoColorsByProcess(colors[wetter][3], colors[nextWetter][3], (process - 95 * (5 / 100))));
        } else if (element === 4) {
          fill(getColorBetweenTwoColorsByProcess(colors[wetter][4], colors[nextWetter][4], (process - 95 * (5 / 100))));
        }
      } else {
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
  const wetterElement = document.getElementById("wetter");

  setInterval(() => {
    wetterElement.innerHTML = wetter + ` (${process}%)`;
  }, 100);

  socket.on("data", (data) => {
    gras.children[1].innerText = data.gras.created;
    gras.children[2].innerText = data.gras.living;
    gras.children[3].innerText = data.gras.dead;

    city.children[1].innerText = data.city.created;
    city.children[2].innerText = data.city.living;
    city.children[3].innerText = data.city.dead;

    cityDestroyer.children[1].innerText = data.city_destroyer.created;
    cityDestroyer.children[2].innerText = data.city_destroyer.living;
    cityDestroyer.children[4].innerText = data.city_destroyer.destroied_citys;

    // console.log(cityDestroyer.children[2].innerText);

    rasenFresser.children[1].innerText = data.rasen_fresser.created;
    rasenFresser.children[2].innerText = data.rasen_fresser.living;
    rasenFresser.children[3].innerText = data.rasen_fresser.dead;
  });
});
