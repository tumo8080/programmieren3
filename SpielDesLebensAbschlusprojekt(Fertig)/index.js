const express = require("express");
const {
  matrix,
  XY,
  canvasXY,
  data,
  wetter,
  colors,
  changewetter,
} = require("./handleMatrix");
let { wetterProcess } = require("./handleMatrix");
const { commitData, countLivings, deleteUserData } = require("./handleFS");
const { setup, draw } = require("./script");

const app = express();
const port = 3000;

const server = require("http").Server(app);
const io = require("socket.io")(server);

let interval;

app.use(express.static("public"));
app.use(express.json());

server.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

app.get("/user/:name", function (req, res) {
  const name = req.params.name;
  res.send("<h1>Hello " + name + "</h1>");
});

app.get("/google/:search", function (req, res) {
  const search = req.params.search;
  res.redirect(`https://www.google.com/search?q=${search}`);
});

app.get("*", function (req, res) {
  res.status(404).send("what??? There's something wrong...");
});

let counter = 0;

io.on("connection", (socket) => {
  console.log("\x1B[32ma user connected\x1B[37m");
  socket.on("disconnect", () => {
    console.log("\x1B[31muser disconnected\x1B[37m");

    deleteUserData(socket.id, 2000);
    clearInterval(interval);
  });

  socket.emit("vars", { xy: XY, canvas: canvasXY, wetter: wetter.current });

  setup();
  interval = setInterval(() => {
    draw();
    countLivings();
    socket.emit("matrix", { matrix, colors });
    commitData(socket.id);
    socket.emit("data", data);

    var nextW;
    var index123 = 0;
    wetter.options.forEach((e, i) => {
      if (e === wetter.current) {
        index123 = i + 1;
      }
    });

    if (wetter.options[index123]) nextW = wetter.options[index123];
    else nextW = wetter.options[0];

    socket.emit("wetter", {
      w: wetter.current,
      wetterProcess: wetterProcess,
      nextW: nextW,
    });

    if (counter === changewetter) {
      var newWetter;
      var index = 0;
      wetter.options.forEach((e, i) => {
        if (e === wetter.current) {
          index = i + 1;
        }
      });

      if (wetter.options[index]) newWetter = wetter.options[index];
      else newWetter = wetter.options[0];

      wetter.current = newWetter;

      counter = 0;
    } else {
      counter++;
      wetterProcess = counter / (changewetter / 100);
    }
  }, 30);
});

// Event Blitz etc bei btn klick
// geschlecht für ein Classes
// 6 Classes
// Wetter mit einfluss auf alle figuren
// statistiken (auf client anzeigen und im .json speichern) möglich diagramme draw.io
