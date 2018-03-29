var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var webSocketServer = require("ws");
var url = "mongodb://localhost:27017";
var fs = require("fs");

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended:false}));


// routing
app.get("/wind", function(req, res){
    console.log("Get Wind");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected to server");

        var d = new Date();
        console.log(d);

        var month = d.getMonth();
        var day = d.getDate();
        var hour = d.getHours();

        var dbo = db.db("weather");
        console.log("DBO: " + dbo);
        dbo.listCollections().toArray(function(err, collInfos) {
            // collInfos is an array of collection info objects that look like:
            // { name: 'test', options: {} }
            console.log("Collections: " + JSON.stringify(collInfos))
        });

        var query = {};
        query = {"Year": 2017, "Month":month, "Day":day, "Hour":hour}
        console.log("Query: " + JSON.stringify(query))
        var projection = {"Year" : '1'};
        projection = {}

        dbo.collection("wind2017").find(query, projection).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log("Results: " + result.length);
            console.log("Results: " + JSON.stringify(result));
            db.close();
        });
    });
});

app.get("/boatspeedNetwork", function(req, res){
    var txtFile = "./AI/networks/boatspeed.txt";

    console.log("Get boatspeed network");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected to server");

        fs.readFile(txtFile, function(err, data){
            if (err) throw err;
            console.log("Boatspeed Network: " + data);
            res.json(JSON.parse(data));
        });
    });
});

app.get("/boatspeedMinMax", function(req, res){
    var txtMinMaxFile = "./AI/networks/minmax.txt";

    console.log("Get boatspeed network min/max");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected to server");

        fs.readFile(txtMinMaxFile, function(err, data){
            if (err) throw err;
            console.log("Boatspeed Network Min/Max: " + data);
            res.write(data);
            res.end();
        });
    });
});


app.use(function(req, res, next) {
    console.log(`${req.method} request for ${req.url}`);
    next();
});
app.use(express.static("./public"));

app.listen(3000);


console.log("\n\nSkipper's Meeting server now running on port 3000");

module.exports = app;
