const Template = require("./classTemplate");
let { XY, matrix, ObjekteArray } = require("../handleMatrix");

class GrasTemplate extends Template {
    constructor(z, s, energie) {
        super(z, s, energie);
        this.zeile = z;
        this.spalte = s;
        this.energie = 0;
        this.platziereSelbstInMatrix(1);
    };
    spielzug() {
        this.energie++
        if (this.energie > 5) {
            this.pflanzNeueGrasZelle()
            this.energie = 0;
        }
    };
    pflanzNeueGrasZelle () {
        // 1. Scan die Felder um dich herum und
        // finde heraus, welche erdeFelder sind.
        let erdeFelder = this.findeErdeFelder();

        if (erdeFelder.length > 0) {
            let erdeFeld = erdeFelder[0];
            let neueGrasZelle = new GrasTemplate(erdeFeld[0], erdeFeld[1]);
            ObjekteArray.push(neueGrasZelle);
            /* RandomNumber1 = Math.floor(Math.random() * erdeFelder.length)
            let erdeFeld = erdeFelder[RandomNumber1]
            matrix[this.zeile][this.spalte] = 1;
            this.zeile = erdeFeld[0];
            this.spalte = erdeFeld[1];
            this.platziereSelbstInMatrix() */
        }
    }

    findeErdeFelder() {
        // 1. Findet heraus, welche die Felder
        // links, rechts, oben und unten vom Rasendestroyer sind
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1]
        ]

        let erdeFelder = benachbarteFelder.filter(this.istErde);
        return erdeFelder;
        // 2. Filtert diese Koordinatenliste, so dass nur die
        // Koordinaten übrig bleiben, die erdeFelder darstellen

        // 3. returned diese Liste an erdeFeldern.
    };
    istErde(koordinatenPaar) {
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0 &&
            spalte >= 0 &&
            zeile < XY &&
            spalte < XY &&
            matrix[zeile][spalte] === 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = GrasTemplate;