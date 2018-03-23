var synaptic = require('synaptic');

var input = [];
var output = [];

$.getJSON('/boatspeed', function(data)
{
    for(var i = 0; i < data.length; i++)
    {
        console.log(data[i].OffwindRadians)
        input[i] = [];
        output[i] = [];
        input[i][0] = data[i].OffwindRadians;
        input[i][1] = data[i]["Wind Speed"];
        output[i][0] = data[i].MaxV;
    }
    console.log("boatspeed data loaded");

});

function train()
{
    var e = document.getElementById("epochs");
    console.log("Training for " + e.value + " epochs");
    var epochs = e.value;

    const { Layer, Network } = window.synaptic;
    var inputLayer = new Layer(2);
    var hiddenLayer = new Layer(5);
    var outputLayer = new Layer(1);

    // train the network - learn boatspeed
    var learningRate = .3;
    
    for (var iteration = 0; iteration < epochs; iteration++)
    {
        for (var i = 0; i < input.length; i++) {
            // 0,0 => 0
            myNetwork.activate([input[i][0], input[i][1]]);
            myNetwork.propagate(learningRate, [output[i][0]]);
        }
    }
}



$(document).ready()
{
	$("Doit").click(function(){
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");
		console.log("******************************* BUTTON CLICKED ******************************");

        var e = Document.getElementById("epochs");
        console.log("Training for " + e.value + " epochs");
        var epochs = e.value;
        train(epochs);
    })
}