var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var webSocketServer = require("ws").Server;
var url = "mongodb://localhost:27017";
var port = process.env.PORT || 9030;
var ws = new webSocketServer({port: port});
var fs = require("fs");

var txtNetworkFile = "./AI/networks/boatspeed.txt";
var txtMinMaxFile = "./AI/networks/minmax.txt";

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended:false}));

// web socket
ws.on('connection', function(w){
    w.on('message', function(msg){
        // payload 
        let userData = null;
        var messageType = msg.substring(0, 1);
        console.log("Message Type: " + messageType);
        msg = msg.substring(1);

        // var message = userData;
        console.log('message from client: ' + msg);

        if (messageType == 1)
        {
            // try {
            //     msg = JSON.parse(msg); 
            // } catch (e) {
            //     // You can read e for more info
            //     // Let's assume the error is that we already have parsed the payload
            //     // So just return that
            //     msg = msg;
            // }

            fs.writeFile(txtNetworkFile, msg, function(err){
                if (err) throw err;
                console.log("Saved boatspeed")
            });
        } else if (messageType == "2")
        {
            fs.writeFile(txtMinMaxFile, msg, function(err){
                if (err) throw err;
                console.log("Saved minMax")
            });
        }
    });
    
    w.on('close', function() {
        console.log('closing connection');
    });
});

// routing
app.get("/boatspeed", function(req, res){
    console.log("Get boatspeed data");
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
