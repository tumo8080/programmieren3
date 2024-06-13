const Template = require("./classTemplate");
let { XY, RandomNumber1, matrix, ObjekteArray, wetter, löschObjektAusObjektArray, data } = require("../handleMatrix");

class CityTemplate extends Template {
    constructor(z, s, energie) {
        super(z, s, energie);
        this.zeile = z;
        this.spalte = s;
        this.energie = 0;
        this.lebensEnergie = 0;
        this.platziereSelbstInMatrix(3);
        data.city.created++;
    };
    spielzug() {
        this.energie++
        if (this.energie > (wetter.current === "winter" ? 200 : 100)) {
            
            this.pflanzneueCity()
            this.energie = 0;
        } 
        if (this.lebensEnergie >= (wetter.current === "winter" ? 400 : 600)) {
            this.lebensEnergie = 0;
            matrix[this.zeile][this.spalte] = 1;
            löschObjektAusObjektArray(this.zeile, this.spalte);
        }
        this.lebensEnergie++;
    };
    pflanzneueCity () {
        let grasFelder = this.findeGrasFelder();
        if (grasFelder.length > 0) {
            RandomNumber1 = Math.floor(Math.random() * grasFelder.length)
            let grasFeld = grasFelder[RandomNumber1]
            let neueCity = new CityTemplate(grasFeld[0], grasFeld[1]);

            löschObjektAusObjektArray(grasFeld[0], grasFeld[1]);
            
            ObjekteArray.push(neueCity);
        }
    }

    findeGrasFelder() {
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1]
        ]

        let grasFelder = benachbarteFelder.filter(this.istGras)
        return grasFelder
    };
    istGras(koordinatenPaar) {
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0 &&
            spalte >= 0 &&
            zeile < XY &&
            spalte < XY &&
            ( matrix[zeile][spalte] === 1 || matrix[zeile][spalte] === 2)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = CityTemplate;