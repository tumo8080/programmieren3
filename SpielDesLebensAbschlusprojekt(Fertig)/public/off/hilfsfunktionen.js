function erstelleMatrix() {
    let matrixTemp = [];
    for (let zeile = 0; zeile < XY; zeile++) {
        for (let spalte = 0; spalte < XY; spalte++) {
            matrixTemp.push(0)

        }
        matrix.push(matrixTemp)
        matrixTemp = [];
    }
}
function zeichneMatrix() {
    let aktivesArray = matrix
    let kästchenXY = canvasXY / aktivesArray.length;
    for (let zeile = 0; zeile < XY; zeile++) {
        for (let spalte = 0; spalte < XY; spalte++) {
            element = matrix[zeile][spalte]
            if (element === 0) {
                fill("yellow")
            } else if (element === 1) {
                fill("#03ab03")
            } else if (element === 2) {
                fill("#E12213")
            } else if (element === 3) {
                fill("#818285")
            } else if (element === 4) {
                fill("#000")
            } 
            rect(spalte * kästchenXY, zeile * kästchenXY, kästchenXY, kästchenXY)
        }
    }
}