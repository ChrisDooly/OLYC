var inputs = [];
var outputs = [];
const _INPUTS = 2;
const _OUTPUTS = 1;
var thresh_min = 0.05;
var thresh_max = 0.95;

// setup web socket

var connection = new WebSocket('ws://localhost:9030');

connection.onopen = function () {
  
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {

};


$.getJSON('/boatspeed', function(data)
{
    var fields = [];

    var columnsIn = data[0];
    for(var key in columnsIn)
    {
        console.log(key);
        if (key != "_id")
            fields.push(key);
    }
    console.log("Keys: " + fields);

    // normalize
    var min = [];
    var max = [];

    console.log("Normalize: " + data.length + ", " + _INPUTS);

    for(var j=0; j < _INPUTS + _OUTPUTS; j++)
    {
        min[j] = data[0][fields[j]];
        max[j] = data[0][fields[j]];
    }

    for(var i=1; i < data.length; i++)
    {
        for(var j=0; j < _INPUTS + _OUTPUTS; j++)
        {
            if (data[i][fields[j]] < min[j])
                min[j] = data[i][fields[j]];
            else if (data[i][fields[j]] > max[j])
                max[j] = data[i][fields[j]];
        }
    }

    var b = [];
    var m = [];


    for(var j=0; j < _INPUTS + _OUTPUTS; j++)
    {
        console.log("Var " + j + " - Min: " + min[j] + "   Max: " + max[j]);
        m[j] = (thresh_max - thresh_min) / (max[j] - min[j]);
        b[j] = thresh_max - max[j] * ((thresh_max - thresh_min)/(max[j] - min[j]));
    }

    for(var i = 0; i < data.length; i++)
    {
        inputs[i] = [];
        outputs[i] = [];
        // inputs[i][0] = data[i].OffwindRadians;
        // inputs[i][1] = data[i]["Wind Speed"];
        // outputs[i][0] = data[i].MaxV;
        inputs[i][0] = m[0] * data[i].OffwindRadians + b[0];
        inputs[i][1] = m[1] * data[i]["Wind Speed"] + b[1];
        outputs[i][0] = m[2] * data[i].MaxV + b[2];
    }
    for(var i = 0; i < data.length; i++)
    {
        console.log(inputs[i])
    }

    console.log("boatspeed data loaded");
    var e = document.getElementById("train");
    e.disabled = false;
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomOrderArray(rows)
{
    var out = [];
    for (var i = 0; i < rows; i++)
    {
        out[i] = i;
    }
    for (var i = 0; i < rows; i++)
    {
        var idx = getRandomInt(rows);
        var tmp = out[i];
        out[i] = out[idx];
        out[idx] = tmp;
    }
    
    return out;
}

this.network = new synaptic.Architect.Perceptron(2, 18, 1);

function train2()
{
    var e = document.getElementById("epochs");
    console.log("Training for " + e.value + " epochs");
    var epochs = e.value;

    // train the network - learn boatspeed
    var learningRate = .3;
    console.log(inputs.length)
    var randomOrder = randomOrderArray(inputs.length);

    for (var iteration = 0; iteration < epochs; iteration++)
    {
        for (var i = 0; i < inputs.length; i++) {
            var outx = this.network.activate([inputs[randomOrder[i]][0], inputs[randomOrder[i]][1]]);
            this.network.propagate(learningRate, [outputs[randomOrder[i]][0]]);
            // this.network.activate([inputs[i][0], inputs[i][1]]);
            // this.network.propagate(learningRate, [outputs[i][0]]);
            
            if (iteration == epochs - 1)
                console.log(i + ": " + outputs[randomOrder[i]][0] + " = " + outx);
        }
    }

    var e = document.getElementById("save");
    e.disabled = false;
}


function storeBoatspeedNetwork()
{
    console.log("Store network")
    //console.log(this.network);

    let exported = JSON.stringify(this.network.toJSON());
//    let imported = synaptic.Network.fromJSON(JSON.parse(exported));
    console.log("Exported: " + exported)

    connection.onmessage = function (e) {
        console.log(e.data);
        console.log('message from server', e.data);
    };
    var data = {
        to: "sec-websocket-identifier",
        message: exported
    };
    connection.send(data);
}