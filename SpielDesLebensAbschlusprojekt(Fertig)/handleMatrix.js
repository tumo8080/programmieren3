// process.stdout.write()
// process.stdout.write(`\x1b[${number}A`)

let canvasXY = 900;
let XY = 100; // 100
let matrix = [];
let RandomNumber1;
let RandomNumber2;

let anzahlGras = 2;
let ObjekteArray = [];

let wetterProcess = 0;
let changewetter = 1000;

let wetter = {
  current: "sommer",
  options: ["winter", "sommer"],
};

// R - G - B - A
const colors = {
  winter: {
    0: { values: [111, 78, 55, 255] },
    1: { values: [254, 254, 254, 255] },
    2: { values: [139, 0, 0, 255] },
    3: { values: [119, 119, 119, 255] },
    4: { values: [0, 0, 128, 255] },
  },
  sommer: {
    0: { values: [255, 215, 0, 255] },
    1: { values: [50, 205, 50, 255] },
    2: { values: [255, 69, 0, 255] },
    3: { values: [125, 125, 125, 255] },
    4: { values: [0, 0, 0, 255] },
  },
};

// const colors = {
//   winter: {
//     0: "#A9A9A9",
//     1: "#556B2F",
//     2: "#8B0000",
//     3: "#708090",
//     4: "#000080",
//   },
//   sommer: {
//     0: "#D2B48C",
//     1: "#32CD32",
//     2: "#FF4500",
//     3: "#808080",
//     4: "#FF6347",
//   },
// };

// data
let data = {
  dirt: { living: 0 },
  gras: { created: 0, living: 0, dead: 0 },
  rasen_fresser: { created: 0, living: 0, dead: 0 },
  city: { created: 0, living: 0, dead: 0 },
  city_destroyer: { created: 0, living: 0, destroied_citys: 0, dead: 0 },
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
  changewetter,
  wetterProcess,
  löschObjektAusObjektArray,
};
