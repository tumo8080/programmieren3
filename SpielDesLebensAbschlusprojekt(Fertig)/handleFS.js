const { data, matrix, XY } = require("./handleMatrix");
const fs = require("fs");

function commitData(user) {
  if (!user) return console.error("no user found");

  fs.readFile("./data.json", "utf8", function (err, d) {
    if (err) {
      return console.error(err);
    }

    let current;
    try {
      current = JSON.parse(d);
    } catch (err) {
      return console.error(err);
    }

    current[user] = data;

    // console.log(current);

    fs.writeFile("./data.json", JSON.stringify(current), function (err) {
      if (err) {
        return console.error(err);
      }
      // console.log("Data saved!");
    });
  });
}

function countLivings() {
  let aktivesArray = matrix;
  let gras = 0,
    rasen_fresser = 0,
    city = 0,
    city_destroyer = 0;
  for (let zeile = 0; zeile < XY; zeile++) {
    for (let spalte = 0; spalte < XY; spalte++) {
      element = aktivesArray[zeile][spalte];
      if (element === 1) {
        gras++;
        // data.gras.living++;
      } else if (element === 2) {
        rasen_fresser++;
        // data.rasen_fresser.living++;
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
  data.rasen_fresser.living = rasen_fresser;
}

module.exports = { commitData, countLivings };
