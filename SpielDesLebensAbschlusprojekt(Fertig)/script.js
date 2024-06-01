let { canvasXY, XY, matrix, ObjekteArray } = require("./handleMatrix");

const CityTemplate = require("./Classes/city");
const CityDestroyerTemplate = require('./Classes/cityDestroyer');
const GrasTemplate = require('./Classes/gras');
const RasenFresserTemplate = require('./Classes/RasenFresser');

function setup() {

    // createCanvas(canvasXY, canvasXY);
    // frameRate(60);
    erstelleMatrix();
    // noStroke();
    // ObjekteArray = [];
    // console.log('ObjekteArray => ' + ObjekteArray);

    ObjekteArray.push(new CityTemplate(50, 50));

    ObjekteArray.push(new CityDestroyerTemplate(20, 50));
    ObjekteArray.push(new CityDestroyerTemplate(80, 50));

    ObjekteArray.push(new RasenFresserTemplate(25, 75));

    ObjekteArray.push(new GrasTemplate(50, 51));
    ObjekteArray.push(new GrasTemplate(51, 50));
    ObjekteArray.push(new GrasTemplate(50, 49));
    ObjekteArray.push(new GrasTemplate(49, 50));

    ObjekteArray.push(new GrasTemplate(23, 73));
    ObjekteArray.push(new GrasTemplate(23, 74));
    ObjekteArray.push(new GrasTemplate(23, 75));
    ObjekteArray.push(new GrasTemplate(23, 76));
    ObjekteArray.push(new GrasTemplate(23, 77));

    ObjekteArray.push(new GrasTemplate(24, 73));
    ObjekteArray.push(new GrasTemplate(24, 74));
    ObjekteArray.push(new GrasTemplate(24, 75));
    ObjekteArray.push(new GrasTemplate(24, 76));
    ObjekteArray.push(new GrasTemplate(24, 77));

    ObjekteArray.push(new GrasTemplate(25, 73));
    ObjekteArray.push(new GrasTemplate(25, 74));
    ObjekteArray.push(new GrasTemplate(25, 75));
    ObjekteArray.push(new GrasTemplate(25, 76));
    ObjekteArray.push(new GrasTemplate(25, 77));

    ObjekteArray.push(new GrasTemplate(26, 73));
    ObjekteArray.push(new GrasTemplate(26, 74));
    ObjekteArray.push(new GrasTemplate(26, 75));
    ObjekteArray.push(new GrasTemplate(26, 76));
    ObjekteArray.push(new GrasTemplate(26, 77));

    ObjekteArray.push(new GrasTemplate(27, 73));
    ObjekteArray.push(new GrasTemplate(27, 74));
    ObjekteArray.push(new GrasTemplate(27, 75));
    ObjekteArray.push(new GrasTemplate(27, 76));
    ObjekteArray.push(new GrasTemplate(27, 77));
}

function draw() {

    for (let i = 0; i < ObjekteArray.length; i++) {
        ObjekteArray[i].spielzug();
    }  

    // process.stdout.write("d");

    // zeichneMatrix();
    // console.log('matrix => ' + matrix);
    //console.log(ObjekteArray.length)
}

function erstelleMatrix() {
    let matrixTemp = [];
    for (let zeile = 0; zeile < XY; zeile++) {
        for (let spalte = 0; spalte < XY; spalte++) {
            matrixTemp.push(0)
        }
        matrix.push(matrixTemp)
        matrixTemp = [];
    }
    // console.log("matrix" + matrix);
}

function zeichneMatrix() {
    let aktivesArray = matrix; // mb use matrix.length
    let kästchenXY = canvasXY / aktivesArray.length;
    for (let zeile = 0; zeile < XY; zeile++) {
        for (let spalte = 0; spalte < XY; spalte++) {
            element = matrix[zeile][spalte]
            process.stdout.write(element);
            if (element === 0) {
                // process.stdout.write('\x1B[33m.'); // yellow
            } else if (element === 1) {
                // process.stdout.write('\x1B[32mM'); // #03ab03
            } else if (element === 2) {
                // process.stdout.write('\x1B[31mr'); // #E12213
            } else if (element === 3) {
                // process.stdout.write('\x1B[37mx'); // #818285
            } else if (element === 4) {
                // process.stdout.write('\x1B[30mb'); // #000
            } else {
                process.stdout.write('no element');
            }
            // rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
        }
        // process.stdout.write('\n');
    }
    // process.stdout.write(`\x1B[${XY}A`);
}

function consoleLogMatrix() {
    let aktivesArray = matrix;
    let kästchenXY = canvasXY / aktivesArray.length;
    for (let zeile = 0; zeile < XY; zeile++) {
        for (let spalte = 0; spalte < XY; spalte++) {
            element = matrix[zeile][spalte]
            if (element === 0) {
                process.stdout.write('\x1B[33m.'); // yellow
            } else if (element === 1) {
                process.stdout.write('\x1B[32mM'); // #03ab03
            } else if (element === 2) {
                process.stdout.write('\x1B[31mr'); // #E12213
            } else if (element === 3) {
                process.stdout.write('\x1B[37mx'); // #818285
            } else if (element === 4) {
                process.stdout.write('\x1B[30mb'); // #000
            }
            // rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
        }
        process.stdout.write('\n');
    }
    process.stdout.write(`\x1B[${XY}A`);
}

module.exports = {
    setup,
    draw,
}