const express = require("express");

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

app.get("/user/:name", function(req, res){
    const name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
});

app.get("/google/:search", function(req, res){
    const search = req.params.search;
    res.redirect(`https://www.google.com/search?q=${search}`);
});

app.get('*', function(req, res){
    res.status(404).send("what??? There's something wrong...");
});
