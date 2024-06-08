const Template = require("./classTemplate");
let { XY, matrix, ObjekteArray, wetter, data } = require("../handleMatrix");

class GrasTemplate extends Template {
  constructor(z, s, energie) {
    super(z, s, energie);
    this.zeile = z;
    this.spalte = s;
    this.energie = 0;
    this.platziereSelbstInMatrix(1);
    data.gras.created++;
  }
  spielzug() {
    this.energie++;
    if (this.energie > 5) {
      this.pflanzNeueGrasZelle();
      this.energie = 0;
    }
  }
  pflanzNeueGrasZelle() {
    let erdeFelder = this.findeErdeFelder();

    if (erdeFelder.length > 0) {
      let erdeFeld = erdeFelder[0];
      let neueGrasZelle = new GrasTemplate(erdeFeld[0], erdeFeld[1], 0);
      ObjekteArray.push(neueGrasZelle);
    }
  }

  findeErdeFelder() {
    let benachbarteFelder = [
      [this.zeile + 1, this.spalte],
      [this.zeile - 1, this.spalte],
      [this.zeile, this.spalte + 1],
      [this.zeile, this.spalte - 1],
    ];

    let erdeFelder = benachbarteFelder.filter(this.istErde);
    return erdeFelder;
  }
  istErde(koordinatenPaar) {
    let zeile = koordinatenPaar[0];
    let spalte = koordinatenPaar[1];
    if (
      zeile >= 0 &&
      spalte >= 0 &&
      zeile < XY &&
      spalte < XY &&
      matrix[zeile][spalte] === 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = GrasTemplate;
