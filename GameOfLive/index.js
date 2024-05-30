const express = require("express");
// const { matrix } = require('./handleMatrix');
// const { setup, draw } = require('./script');

const app = express();
const port = 3000;

const server = require('http').Server(app);
const io = require('socket.io')(server);

let interval;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

app.get('*', function(req, res){
    res.status(404).send("what??? There's something wrong...");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(interval);
    });

    // setup();
    interval = setInterval(() => {
        // draw();
        socket.emit('matrix', "matrix");
    }, 30);
});

function transformMatrix(matrix) {
    // Wenn ihr Zahlen in der Matrix habt, können sie hier in Farben umgewandelt werden
    // ...
    return newMatrix
}

// Event Blitz etc bei btn klick
// geschlecht für ein Classes
// 6 Classes
// Wetter mit einfluss auf alle figuren
// statistiken (auf client anzeigen und im .json speichern) möglich diagramme draw.io