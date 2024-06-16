const Template = require("./classTemplate");
const GrasTemplate = require("./gras");
let {
  XY,
  RandomNumber2,
  ObjekteArray,
  matrix,
  wetter,
  löschObjektAusObjektArray,
  data,
} = require("../handleMatrix");

class CityDestroyerTemplate extends Template {
  constructor(z, s, energie) {
    super(z, s, energie);
    this.zeile = z;
    this.spalte = s;
    this.energie = 0;
    this.lebensEnergie = 0;
    this.platziereSelbstInMatrix(4);
    data.city_destroyer.created++;
  }
  machSchrittNachVorne() {
    let CityFelder = this.findeCityFelder();

    if (CityFelder.length > 0) {
      RandomNumber2 = Math.floor(Math.random() * CityFelder.length);
      let CityFeld = CityFelder[RandomNumber2];

      matrix[this.zeile][this.spalte] = 0;

      löschObjektAusObjektArray(CityFeld[0], CityFeld[1]);
      this.zeile = CityFeld[0];
      this.spalte = CityFeld[1];

      this.platziereSelbstInMatrix(4);
      data.city_destroyer.destroied_citys++;
    }
  }
  spielzug() {
    if (this.energie >= (wetter.current === "winter" ? 350 : 300)) {
      this.energie = 0;
      matrix[this.zeile][this.spalte] = 0;

      this.machEinSchrit();
    } else {
      this.machSchrittNachVorne();

      if (this.findeCityFelder().length) {
        this.energie--;
      }
    }
    this.energie++;
  }

  machEinSchrit() {
    while (true) {
      let spalte2 = Math.floor(Math.random() * 100);
      let zeile2 = Math.floor(Math.random() * 100);

      if (matrix[zeile2][spalte2] != 2) {
        this.zeile = zeile2;
        this.spalte = spalte2;
        matrix[this.zeile][this.spalte] = 4;
        break;
      } else {
      }
    }
  }
  findeCityFelder() {
    let benachbarteFelder = [
      [this.zeile + 1, this.spalte],
      [this.zeile - 1, this.spalte],
      [this.zeile, this.spalte + 1],
      [this.zeile, this.spalte - 1],
    ];

    let CityFelder = benachbarteFelder.filter(this.istCity);
    return CityFelder;
  }
  istCity(koordinatenPaar) {
    let zeile = koordinatenPaar[0];
    let spalte = koordinatenPaar[1];
    if (
      zeile >= 0 &&
      spalte >= 0 &&
      zeile < XY &&
      spalte < XY &&
      matrix[zeile][spalte] === 3
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = CityDestroyerTemplate;
