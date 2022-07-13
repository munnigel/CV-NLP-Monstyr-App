var express = require("express");
var app = express()

app.use(express.static("./dist/monstyr-app"));
app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html')
        .sendFile(__dirname + '/dist/monstyr-app/index.html');})

app.listen(4200)