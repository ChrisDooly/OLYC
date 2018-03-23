var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var webSocketServer = require("ws").Server;
var url = "mongodb://localhost:27017";
var port = process.env.PORT || 9030;
var ws = new webSocketServer({port: port});
var fs = require("fs");

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended:false}));

// web socket
ws.on('connection', function(w){
    w.on('message', function(msg){
       // sockets[message.to].send(message.message);
        msg=JSON.parse(msg);
        console.log('message from client: ' + msg);

        var txtFile = "./AI/networks/boatspeed.txt";
        fs.writeFile(txtFile, msg, function(err){
            if (err) throw err;
            console.log("Saved boatspeed")
        });
    });
    
    w.on('close', function() {
        console.log('closing connection');
    });
});

// routing
app.get("/boatspeed", function(req, res){
    console.log("Get boatspeed datwa");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected to server");

        var dbo = db.db("ai");
        console.log("DBO: " + dbo);
        dbo.listCollections().toArray(function(err, collInfos) {
            // collInfos is an array of collection info objects that look like:
            // { name: 'test', options: {} }
            console.log("Collections: " + JSON.stringify(collInfos))
        });

        var query = {};
        query = {}
        console.log("Query: " + JSON.stringify(query))
        var projection = {};
        projection = {}

        dbo.collection("boatspeed").find(query, projection).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            console.log("Results: " + result.length);
            console.log("Results: " + JSON.stringify(result));
            db.close();
        });
    });
});

app.use(function(req, res, next) {
    console.log(`${req.method} request for ${req.url}`);
    next();
});
app.use(express.static("./AI"));

app.listen(3001);


console.log("\n\nDeep learning server now running on port 3001");

module.exports = app;
