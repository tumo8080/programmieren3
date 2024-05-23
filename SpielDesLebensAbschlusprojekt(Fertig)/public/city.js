class CityTemplate extends Template {
    constructor(z, s, energie) {
        super(z, s, energie);
        this.zeile = z;
        this.spalte = s;
        this.energie = 0;
        this.lebensEnergie = 0;
        this.platziereSelbstInMatrix(3);
    };
    spielzug() {
        this.energie++
        if (this.energie > 100 * (window.globSpeed === window.globCity? window.globSpeed : window.globCity)) {
            
            this.pflanzneueCity()
            this.energie = 0;
        } 
        // if (this.lebensEnergie >= 400) {
        //     this.lebensEnergie = 0;
        //     löschObjektAusObjekteArray(this.zeile,this.spalte);
        //     matrix[this.zeile][this.spalte] = 0;
        // }
        // console.log(this.energie, this.lebensEnergie);
        // this.lebensEnergie++
    };
    pflanzneueCity () {
        // 1. Scan die Felder um dich herum und
        // finde heraus, welche grasFelder sind.
        let grasFelder = this.findeGrasFelder();

        // if (grasFelder.length > 0) {
        //     let grasFeld = grasFelder[0];
        //     let neueCity = new CityTemplate(grasFeld[0], grasFeld[3]);
        //     ObjekteArray.push(neueCity);
        // }
        if (grasFelder.length > 0) {
            // let grasFeld = grasFelder[0]

            // matrix[this.zeile][this.spalte] = 0;

            // löschObjektAusObjekteArray(grasFeld[0], grasFeld[1]);

            RandomNumber1 = Math.floor(Math.random() * grasFelder.length)
            let grasFeld = grasFelder[RandomNumber1]
            // matrix[this.zeile][this.spalte] = 3;
            // this.zeile = grasFeld[0];
            // this.spalte = grasFeld[1];
            // console.log(RandomNumber1, grasFelder.length);
            // let grasFeld = grasFelder[0];
            let neueCity = new CityTemplate(grasFeld[0], grasFeld[1]);

            löschObjektAusObjekteArray(grasFeld[0], grasFeld[1]);
            
            ObjekteArray.push(neueCity);

            // this.zeile = grasFeld[0];
            // this.spalte = grasFeld[1];

            //matrix[this.zeile][this.spalte] = 2;

            // this.platziereSelbstInMatrix()
        }
    }

    findeGrasFelder() {

        // 1. Findet heraus, welche die Felder
        // links, rechts, oben und unten vom Rasendestroyer sind
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1]
        ]

        let grasFelder = benachbarteFelder.filter(this.istGras)
        return grasFelder
        // 2. Filtert diese Koordinatenliste, so dass nur die
        // Koordinaten übrig bleiben, die grasFelder darstellen

        // 3. returned diese Liste an grasFeldern.
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