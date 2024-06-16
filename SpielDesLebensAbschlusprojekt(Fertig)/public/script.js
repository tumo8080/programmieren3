const socket = io();

let XY;
let canvasXY;
let wetter = "sommer";
let process = 0;
let nextWetter = "winter";
let matrixColors;

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

  let r = getColorsBetween(color1.values[0], color2.values[0], t);
  let g = getColorsBetween(color1.values[1], color2.values[1], t);
  let b = getColorsBetween(color1.values[2], color2.values[2], t);

  return [r, g, b];
}

function getColorsBetween(start, end, t) {
  return start + t * (end - start);
}

socket.on("matrix", ({ matrix, colors }) => {
  matrixColors = colors;
  let aktivesArray = matrix;
  let kästchenXY = canvasXY / aktivesArray.length;
  for (let zeile = 0; zeile < XY; zeile++) {
    for (let spalte = 0; spalte < XY; spalte++) {
      let number = matrix[zeile][spalte];
      if (process > 95) {
        if (number >= 0 && number <= 4) {
          let colorArr = getColorBetweenTwoColorsByProcess(
            colors[wetter][number],
            colors[nextWetter][number],
            (process - 95) * (100 / 5)
          );
          fill(colorArr);
        }
      } else {
        if (number >= 0 && number <= 4) {
          fill(colors[wetter][number].values);
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
  const dirt = document.getElementById("dirt");
  const summ = document.getElementById("summ");

  setInterval(() => {
    dirt.children[0].style.background = `rgb(${matrixColors[wetter][0].values[0]}, ${matrixColors[wetter][0].values[1]}, ${matrixColors[wetter][0].values[2]})`;
    gras.children[0].style.background = `rgb(${matrixColors[wetter][1].values[0]}, ${matrixColors[wetter][1].values[1]}, ${matrixColors[wetter][1].values[2]})`;
    city.children[0].style.background = `rgb(${matrixColors[wetter][3].values[0]}, ${matrixColors[wetter][3].values[1]}, ${matrixColors[wetter][3].values[2]})`;
    rasenFresser.children[0].style.background = `rgb(${matrixColors[wetter][2].values[0]}, ${matrixColors[wetter][2].values[1]}, ${matrixColors[wetter][2].values[2]})`;
    cityDestroyer.children[0].style.background = `rgb(${matrixColors[wetter][4].values[0]}, ${matrixColors[wetter][4].values[1]}, ${matrixColors[wetter][4].values[2]})`;
    
    wetterElement.innerHTML = wetter + ` (${process}%)`;
  }, 100);

  socket.on("data", (data) => {
    dirt.children[3].innerText = data.dirt.living;

    gras.children[2].innerText = data.gras.created;
    gras.children[3].innerText = data.gras.living;
    gras.children[4].innerText = data.gras.dead;

    city.children[2].innerText = data.city.created;
    city.children[3].innerText = data.city.living;
    city.children[4].innerText = data.city.dead;

    cityDestroyer.children[2].innerText = data.city_destroyer.created;
    cityDestroyer.children[3].innerText = data.city_destroyer.living;
    cityDestroyer.children[5].innerText = data.city_destroyer.destroied_citys;

    rasenFresser.children[2].innerText = data.rasen_fresser.created;
    rasenFresser.children[3].innerText = data.rasen_fresser.living;
    rasenFresser.children[4].innerText = data.rasen_fresser.dead;

    summ.children[2].innerText = data.city_destroyer.created + data.rasen_fresser.created + data.city.created + data.gras.created;
    summ.children[3].innerText = data.city_destroyer.living + data.rasen_fresser.living + data.city.living + data.gras.living + data.dirt.living;
    summ.children[4].innerText = data.rasen_fresser.dead + data.city.dead + data.gras.dead;
    summ.children[5].innerText = data.city_destroyer.destroied_citys;
  });
});
