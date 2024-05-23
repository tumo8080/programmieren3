const Template = require("./classTemplate");
const { XY, RandomNumber2, matrix, löschObjektAusObjekteArray } = require("./script");

class CityDestroyerTemplate extends Template {
    constructor(z, s, energie) {
        super(z, s, energie);
        this.zeile = z;
        this.spalte = s;
        this.energie = 0;
        this.lebensEnergie = 0;
        this.platziereSelbstInMatrix(4);
    };
    machSchrittNachVorne() {
        // 1. Scan die Felder um dich herum und
        // finde heraus, welche Cityfelder sind.
        let CityFelder = this.findeCityFelder();

        if (CityFelder.length > 0) {
            RandomNumber2 = Math.floor(Math.random() * CityFelder.length)
            let CityFeld = CityFelder[RandomNumber2]

            matrix[this.zeile][this.spalte] = 1;
            ObjekteArray.push(new GrasTemplate(this.zeile,this.spalte));

            löschObjektAusObjekteArray(CityFeld[0], CityFeld[1]);
            this.zeile = CityFeld[0];
            this.spalte = CityFeld[1];

            this.platziereSelbstInMatrix()
        }
    };
    spielzug() {

        if (this.energie >= 300) {
            this.energie = 0;
            matrix[this.zeile][this.spalte] = 1;
            ObjekteArray.push(new GrasTemplate(this.zeile,this.spalte));

            this.machEinSchrit();
            // löschObjektAusObjekteArray(this.zeile,this.spalte);
        } else {
            this.machSchrittNachVorne();

            if (this.findeCityFelder().length) {
                // console.log(22222);
                this.energie--;
            }
        }
        this.energie++

        // if (this.lebensEnergie >= 320) {
        //     this.lebensEnergie = 0;
            
        // }
        // this.lebensEnergie++

    };

    machEinSchrit() {
        // let RandomNumber3 = Math.floor(Math.random() * (100+1));
        // let RandomNumber4 = Math.floor(Math.random() * (100+1));
        
    
        // this.spalte = Math.floor(Math.random() * (100+1));
        // this.zeile = Math.floor(Math.random() * (100+1));
        while (true) {
            let spalte2 = Math.floor(Math.random() * (100));
            let zeile2 = Math.floor(Math.random() * (100));

            // console.log(zeile2, spalte2);

            if (matrix[zeile2][spalte2] != 2) {
                this.zeile = zeile2;
                this.spalte = spalte2;
                //console.log(this.zeile, this.spalte);
                matrix[this.zeile][this.spalte] = 4;
                break;
            } else {
                // console.log(1);
            }
        }
       
        //ObjekteArray.push(new CityDestroyerTemplate(RandomNumber3,RandomNumber4));
        

    };
    findeCityFelder() {
        // 1. Findet heraus, welche die Felder
        // links, rechts, oben und unten vom Rasendestroyer sind
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte], //oben
            [this.zeile - 1, this.spalte], //unten
            [this.zeile, this.spalte + 1], //rechts
            [this.zeile, this.spalte - 1], //links

            [this.zeile + 1, this.spalte - 1], //oben links
            [this.zeile + 1, this.spalte + 1], //oben rechts
            [this.zeile - 1, this.spalte + 1], //unten rechts
            [this.zeile - 1, this.spalte - 1],  //unten links

            [this.zeile + 2, this.spalte], //oben2
            [this.zeile - 2, this.spalte], //unten2
            [this.zeile, this.spalte + 2], //rechts2
            [this.zeile, this.spalte - 2] // links2
        ]

        let CityFelder = benachbarteFelder.filter(this.istCity);
        return CityFelder;
        // 2. Filtert diese Koordinatenliste, so dass nur die
        // Koordinaten übrig bleiben, die Cityfelder darstellen

        // 3. returned diese Liste an Cityfeldern.
    };
    istCity(koordinatenPaar) {
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0 &&
            spalte >= 0 &&
            zeile < XY &&
            spalte < XY &&
            matrix[zeile][spalte] === 3) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = CityDestroyerTemplate;