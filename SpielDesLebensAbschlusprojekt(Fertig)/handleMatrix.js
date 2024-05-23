const { XY, RandomNumber1, RandomNumber2, matrix, löschObjektAusObjekteArray, draw, setup, anzahlGras } = require("./script.js")
const City = require("./city.js");
const CityDestroyer = require("./cityDestroyer.js");
const Grass = require("./gras.js");
const RasenFresser = require("./RasenFresser.js");

console.log(new City(1, 1, 1));
console.log(new CityDestroyer(1, 1, 1));
console.log(new Grass(1, 1, 1));
console.log(new RasenFresser(1, 1));

setInterval(console.log(matrix), 1000);