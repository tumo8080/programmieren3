let canvasXY = 900;
let XY = 100;
let matrix = [];
let RandomNumber1;
let RandomNumber2;

let anzahlGras = 2;
let ObjekteArray = [];

function setup() {
    createCanvas(canvasXY, canvasXY);
    frameRate(60);
    erstelleMatrix();
    noStroke();

    ObjekteArray.push(new CityTemplate(50,50));

    ObjekteArray.push(new CityDestroyerTemplate(20,50));
    ObjekteArray.push(new CityDestroyerTemplate(80,50));

    ObjekteArray.push(new MowingMachineTemplate(25,75));

    ObjekteArray.push(new GrasTemplate(50,51));
    ObjekteArray.push(new GrasTemplate(51,50));
    ObjekteArray.push(new GrasTemplate(50,49));
    ObjekteArray.push(new GrasTemplate(49,50));

    ObjekteArray.push(new GrasTemplate(23,73));
    ObjekteArray.push(new GrasTemplate(23,74));
    ObjekteArray.push(new GrasTemplate(23,75));
    ObjekteArray.push(new GrasTemplate(23,76));
    ObjekteArray.push(new GrasTemplate(23,77));

    ObjekteArray.push(new GrasTemplate(24,73));
    ObjekteArray.push(new GrasTemplate(24,74));
    ObjekteArray.push(new GrasTemplate(24,75));
    ObjekteArray.push(new GrasTemplate(24,76));
    ObjekteArray.push(new GrasTemplate(24,77));

    ObjekteArray.push(new GrasTemplate(25,73));
    ObjekteArray.push(new GrasTemplate(25,74));
    ObjekteArray.push(new GrasTemplate(25,75));
    ObjekteArray.push(new GrasTemplate(25,76));
    ObjekteArray.push(new GrasTemplate(25,77));

    ObjekteArray.push(new GrasTemplate(26,73));
    ObjekteArray.push(new GrasTemplate(26,74));
    ObjekteArray.push(new GrasTemplate(26,75));
    ObjekteArray.push(new GrasTemplate(26,76));
    ObjekteArray.push(new GrasTemplate(26,77));

    ObjekteArray.push(new GrasTemplate(27,73));
    ObjekteArray.push(new GrasTemplate(27,74));
    ObjekteArray.push(new GrasTemplate(27,75));
    ObjekteArray.push(new GrasTemplate(27,76));
    ObjekteArray.push(new GrasTemplate(27,77));

}

function draw() {

    for (let i = 0; i < ObjekteArray.length; i++) {
        ObjekteArray[i].spielzug();
    }

    zeichneMatrix();
    //console.log(ObjekteArray.length)
}

function löschObjektAusObjekteArray(zeile, spalte) {
    let index = ObjekteArray.findIndex(function(grasObjekt) {
        if (grasObjekt.zeile === zeile && grasObjekt.spalte === spalte){
            return true;
        } else return false;
    });
    ObjekteArray.splice(index,1);
}

module.exports = {
    löschObjektAusObjekteArray,
    draw,
    setup,
    anzahlGras,
    matrix,
    XY,
    RandomNumber1,
    RandomNumber2,
}