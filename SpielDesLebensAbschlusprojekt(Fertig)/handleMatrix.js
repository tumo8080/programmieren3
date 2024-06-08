// process.stdout.write()
// process.stdout.write(`\x1b[${number}A`)

let canvasXY = 900;
let XY = 100; // 100
let matrix = [];
let RandomNumber1;
let RandomNumber2;

let anzahlGras = 2;
let ObjekteArray = [];

let wetter = {
  current: "winter",
  options: ["winter", "sommer"]
}

const colors = {
  winter: {
    0: "yellow", 1: "#03ab03", 2: "#E12213", 3: "#818285", 4: "#ff0"
  },
  sommer: {
    0: "yellow", 1: "#03ab03", 2: "#E12213", 3: "#818285", 4: "#000"
  }
};

// data
let data = {
  gras: { created: 0, living: 0 },
  rasen_fresser: { created: 0, living: 0 },
  city: { created: 0, living: 0 },
  city_destroyer: { created: 0, living: 0, destroied_citys: 0 },
};

function löschObjektAusObjektArray(zeile, spalte) {
  // console.log(zeile, spalte);
  let index = ObjekteArray.findIndex(function (grasObjekt) {
    if (grasObjekt.zeile === zeile && grasObjekt.spalte === spalte) {
      return true;
    } else return false;
  });
  ObjekteArray.splice(index, 1);
}

module.exports = {
  data,
  canvasXY,
  XY,
  matrix,
  RandomNumber1,
  RandomNumber2,
  anzahlGras,
  ObjekteArray,
  wetter,
  colors,
  löschObjektAusObjektArray,
};
