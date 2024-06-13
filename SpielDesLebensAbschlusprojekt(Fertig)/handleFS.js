const { data, matrix, XY } = require("./handleMatrix");
const fs = require("fs");

function commitData(user) {
  if (!user) return console.error("no user found");

  data.gras.dead = data.gras.created - data.gras.living;
  data.rasen_fresser.dead = data.rasen_fresser.created - data.rasen_fresser.living;
  data.city.dead = data.city.created - data.city.living;
  data.city_destroyer.dead = data.city_destroyer.created - data.city_destroyer.living;

  fs.readFile("./data.json", "utf8", function (err, d) {
    if (err) {
      return console.error(err);
    }

    let current;
    if (!d || d.trim() === "") {
      current = {}; 
    } else {
      try {
        current = JSON.parse(d);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        console.error("Contents of d:", d); 
        return;
      }
    }

    current[user] = data;

    fs.writeFile("./data.json", JSON.stringify(current, null, 2), function (err) { // Formatting JSON for readability
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
      let element = aktivesArray[zeile][spalte]; // Added let to declare element
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
