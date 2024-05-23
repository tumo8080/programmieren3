const express = require("express");
const app = express();

app.get("/", (req, res) => {
   res.send("Hello world");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

app.get("/user/:name", function(req, res){
    const name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
});

app.get("/google/:search", function(req, res){
    const search = req.params.search;
    res.redirect(`https://www.google.com/search?q=${search}`);
});