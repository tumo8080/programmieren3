const { data, matrix, XY } = require("./handleMatrix");
const fs = require("fs");

function commitData() {
  fs.writeFile("./data.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    // console.log("Saved!");
  });
}

function countLivings() {
  let aktivesArray = matrix;
  let gras = 0,
    rassen_fresser = 0,
    city = 0,
    city_destroyer = 0;
  for (let zeile = 0; zeile < XY; zeile++) {
    for (let spalte = 0; spalte < XY; spalte++) {
      element = aktivesArray[zeile][spalte];
      if (element === 1) {
        gras++;
        // data.gras.living++;
      } else if (element === 2) {
        rassen_fresser++;
        // data.rassen_fresser.living++;
      } else if (element === 3) {
        city++;
        // data.city.living++;
      } else if (element === 4) {
        city_destroyer++;
        // data.city_destroyer.living++;
      }
    }
  }
  data.gras.living = gras;
  data.city.living = city;
  data.city_destroyer.living = city_destroyer;
  data.rassen_fresser.living = rassen_fresser;
}

module.exports = { commitData, countLivings };
