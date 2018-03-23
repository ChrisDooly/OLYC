var inputs = [];
var outputs = [];
const _INPUTS = 2;
const _OUTPUTS = 1;
var thresh_min = 0.0;
var thresh_max = 1.0;

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

    var myNetwork = new Network({
        input: inputLayer, 
        hidden: [hiddenLayer],
        output: outputLayer
    })
    // train the network - learn boatspeed
    var learningRate = .3;
    
    for (var iteration = 0; iteration < epochs; iteration++)
    {
        for (var i = 0; i < inputs.length; i++) {
            // 0,0 => 0
            console.log("Learn: " + inputs[i][0] + ", " + inputs[i][1] + " = " + outputs[i][0]);
            var outx = myNetwork.activate([inputs[i][0], inputs[i][1]]);
            myNetwork.propagate(learningRate, [outputs[i][0]]);
            
            if (!outx)
                console.log("NO X")
            else
                console.log("**" + outx + "((")

            console.log(i + ": " + outputs[i][0] + " = " + outx);
            console.log(outputLayer.list[0])
        }
    }
}

function train2()
{
    var e = document.getElementById("epochs");
    console.log("Training for " + e.value + " epochs");
    var epochs = e.value;

    this.network = new synaptic.Architect.Perceptron(2, 15, 1);

    // train the network - learn boatspeed
    var learningRate = .3;
    
    for (var iteration = 0; iteration < epochs; iteration++)
    {
        for (var i = 0; i < inputs.length; i++) {
            // 0,0 => 0
//            console.log("Learn: " + inputs[i][0] + ", " + inputs[i][1] + " = " + outputs[i][0]);
            var outx = this.network.activate([inputs[i][0], inputs[i][1]]);
            this.network.propagate(learningRate, [outputs[i][0]]);
            
            if (iteration == epochs - 1)
            console.log(i + ": " + outputs[i][0] + " = " + outx);
        }
    }
}


// $(document).ready()
// {
// 	$("Doit").click(function(){
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");
// 		console.log("******************************* BUTTON CLICKED ******************************");

//         var e = Document.getElementById("epochs");
//         console.log("Training for " + e.value + " epochs");
//         var epochs = e.value;
//         train(epochs);
//     })
// }