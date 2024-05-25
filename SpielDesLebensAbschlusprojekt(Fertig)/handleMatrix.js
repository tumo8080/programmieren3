// process.stdout.write()
// process.stdout.write(`\x1b[${number}A`)

let canvasXY = 900;
let XY = 100; // 100
let matrix = [];
let RandomNumber1;
let RandomNumber2;

let anzahlGras = 2;
let ObjekteArray = [];

function löschObjektAusObjektArray(zeile, spalte) {
    // console.log(zeile, spalte);
    let index = ObjekteArray.findIndex(function (grasObjekt) {
        if (grasObjekt.zeile === zeile && grasObjekt.spalte === spalte) {
            return true;
        } else return false;
    });
    ObjekteArray.splice(index, 1);
}

module.exports = {
    canvasXY,
    XY,
    matrix,
    RandomNumber1,
    RandomNumber2,
    anzahlGras,
    ObjekteArray,
    löschObjektAusObjektArray
};