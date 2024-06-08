let {
  data,
  XY,
  matrix,
  RandomNumber2,
  ObjekteArray,
  wetter,
  löschObjektAusObjektArray,
} = require("../handleMatrix");

class RasenFresserTemplate {
  zeile;
  spalte;
  energie = 30;
  constructor(z, s) {
    this.zeile = z;
    this.spalte = s;
    this.platziereSelbstInMatrix();
    data.rasen_fresser.created++;
  }
  platziereSelbstInMatrix() {
    matrix[this.zeile][this.spalte] = 2;
  }
  machSchrittNachVorne() {
    let grasFelder = this.findeGrasFelder();

    if (grasFelder.length > 0) {
      RandomNumber2 = Math.floor(Math.random() * grasFelder.length);
      let grasFeld = grasFelder[RandomNumber2];

      matrix[this.zeile][this.spalte] = 0;

      löschObjektAusObjektArray(grasFeld[0], grasFeld[1]);
      this.zeile = grasFeld[0];
      this.spalte = grasFeld[1];

      matrix[this.zeile][this.spalte] = 2;

      this.platziereSelbstInMatrix();
    }
  }
  spielzug() {
    if (this.energie > 60) {
      this.energie = 30;
      this.pflanzeNeuenRasenFresser();
    } else if (this.energie > 0) {
      let grasFelder = this.findeGrasFelder();
      if (grasFelder.length > 0) {
        this.energie++;
        this.machSchrittNachVorne();
      } else {
        this.energie--;
      }
    } else {
      matrix[this.zeile][this.spalte] = 0;
      löschObjektAusObjektArray(this.zeile, this.spalte);
    }
  }
  pflanzeNeuenRasenFresser() {
    let grasFelder = this.findeGrasFelder();

    if (grasFelder.length > 0) {
      let grasFeld = grasFelder[0];

      löschObjektAusObjektArray(grasFeld[0], grasFeld[1]);

      let neueGrasZelle = new RasenFresserTemplate(grasFeld[0], grasFeld[1]);

      ObjekteArray.push(neueGrasZelle);
    }
  }
  findeGrasFelder() {
    let benachbarteFelder = [
      [this.zeile + 1, this.spalte],
      [this.zeile - 1, this.spalte],
      [this.zeile, this.spalte + 1],
      [this.zeile, this.spalte - 1],
    ];

    let grasFelder = benachbarteFelder.filter(this.istGras);
    return grasFelder;
  }
  istGras(koordinatenPaar) {
    let zeile = koordinatenPaar[0];
    let spalte = koordinatenPaar[1];
    if (
      zeile >= 0 &&
      spalte >= 0 &&
      zeile < XY &&
      spalte < XY &&
      matrix[zeile][spalte] === 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = RasenFresserTemplate;
