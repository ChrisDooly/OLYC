const debugPainting = false;

var boatSpeedNetwork;

$.getJSON('/boatspeedNetwork', function(data)
{
    boatSpeedNetwork = synaptic.Network.fromJSON(data);

    console.log("Boatspeed Network: " + data);
});

var inout = 0;
var m = [];
var b = [];

$(function(){
    //\networks\minmax.txt
    $.get("/boatspeedMinMax", function( data ) {
        var parts = data.split("\n");
        console.log("Parts[0]: " + parts[0]);
        m = parts[1].split(',');
        console.log(m);
        b = parts[2].split(',');

        for(var i = 0; i < m.length; i++)
            m[i] = 1.0 * m[i];
        for(var i = 0; i < b.length; i++)
            b[i] = 1.0 * b[i];

    });
});

class Sailboat{
    constructor(number){
        this.number = number;
        this.direction = thresholdWithin2PI(Math.random() * 2.0 * Math.PI);
        this.location = new Point(Math.random() * 500.0, Math.random() * 500.0);
        console.log("Constructor: " + this.location.x + "," + this.location.y);

        this.velocity = 0;
        // for drawing splines
        this.bow = new Point(0, 0);
        this.stern = new Point(0, 0);
        this.transomLeft = new Point(0, 0);
        this.transomRight = new Point(0, 0);
        this.leftControlPoint1 = new Point(0, 0);
        this.leftControlPoint2 = new Point(0, 0);
        this.rightControlPoint1 = new Point(0, 0);
        this.rightControlPoint2 = new Point(0, 0);

        this.lastMoves = new Queue();
        this.steeringIncrement = 0.005;

        this.ticksSinceSteering = 0;

        this.crewStrength = 100;
    }

    update(elapsed, windSpeed, windDir)
    {
        Log("WINDSPEED" + windSpeed + "   WINDDIR: " + windDir);
        Log("Sailboat.update(" + this.number + ")");
        Log("Elapsed: " + elapsed + ", " + (1.0 / elapsed));
        Log("windSpeed: " + windSpeed);
        Log("windDir: " + windDir);

        if (!windSpeed === null){
            //throw "No WindSpeed";
            return;
        } 

        // call boatspeed network
        var offwind = Math.abs(thresholdWithin2PI(windDir - this.direction));
        var maxSpeed = (boatSpeedNetwork.activate([(m[0] * offwind) + b[0], (m[1] * windSpeed) + b[1]]) - b[2]) / m[2];

        this.velocity = ((999.0 * this.velocity) + maxSpeed) / 1000.0;
        Log("Speed is: " + maxSpeed + "*");

        //console.log("Offwind is: " + offwind);

        this.location.x += (elapsed/1000.0) * (this.velocity * Math.cos(this.direction));
        this.location.y += (elapsed/1000.0) * (this.velocity * Math.sin(this.direction));
        //console.log("Update: " + this.location.x + "," + this.location.y);
    }

    getDynamicSteeringIncrement(bhevent)
    {
        var  mySteeringIncrement = this.steeringIncrement;

        var tmp = this.lastMoves.toArray();

        var  m = tmp.Length - 1;
        var consec = 0;
        while (m >= 0)
        {
            if (tmp[m--] == bhevent)
                mySteeringIncrement += 0.0005 * (consec++);
        }

        return mySteeringIncrement;
    }

    portSteerEvent()
    {
        this.lastMoves.enqueue("ToPort");

        var  mySteeringIncrement = this.steeringIncrement;
        
        mySteeringIncrement = this.getDynamicSteeringIncrement("ToPort");

        // heading -= (TicksSinceSteering > 1 ? SteeringIncrement : SteeringIncrement * 1.5) * (Math.Max(0.2, velocity) / Math.Max(velocity, 1.0));
        this.direction -= (this.ticksSinceSteering > 1 ? mySteeringIncrement : mySteeringIncrement * 1.5) * (Math.max(0.2, this.velocity) / Math.max(this.velocity, 1.0));

        this.velocity -= 0.005 * this.velocity;

        this.ticksSinceSteering = 0;
        this.crewStrength -= .1;
    }

    starboardSteerEvent()
    {
        this.lastMoves.enqueue("ToStarboard");
        var mySteeringIncrement = this.steeringIncrement;

        mySteeringIncrement = this.getDynamicSteeringIncrement("ToStarboard");
    
        //heading += (TicksSinceSteering > 1 ? SteeringIncrement : SteeringIncrement * 1.5) * (Math.Max(0.2, velocity) / Math.Max(velocity, 1.0));
        this.direction += (this.ticksSinceSteering > 1 ? mySteeringIncrement : mySteeringIncrement * 1.5) * (Math.max(0.2, this.velocity) / Math.max(this.velocity, 1.0));

        this.velocity -= 0.005 * this.velocity;

        this.ticksSinceSteering = 0;
        this.crewStrength -= .1;
    }

    noSteerEvent(){
        this.lastMoves.enqueue("");
        this.ticksSinceSteering++;
    }

    paint(){
        var canvas = document.getElementById('canvas'),
        cw = canvas.width,
        ch = canvas.height;
        //console.log("x: " + cw + ", y: " + ch);

        //var this.location. = new Point((0.5 * cw) + this.location.x - Camera.location.x, (0.5 * ch) + this.location.y - Camera.location.y);
        
        // if (this.number == 0)
        //     console.log("x: " + cameraLocation.x + ", y: " + cameraLocation.y);
        //var cameraLocation = new Point(Camera.location.x - this.location.x, Camera.location.y - this.location.y);

        this.bow = new Point(this.location.x + 30 * Math.cos(this.direction), this.location.y + 30 * Math.sin(this.direction));
        this.stern = new Point(this.location.x - 30 * Math.cos(this.direction), this.location.y - 30 * Math.sin(this.direction));
        this.transomLeft = new Point(this.location.x - 31 * Math.cos(this.direction + degreesToRadians(-15)), 
                                     this.location.y - 31 * Math.sin(this.direction + degreesToRadians(-15)));
        this.transomRight = new Point(this.location.x - 31 * Math.cos(this.direction + degreesToRadians(15)), 
                                     this.location.y - 31 * Math.sin(this.direction + degreesToRadians(15)));

        this.leftControlPoint1 = new Point(this.location.x + 25.0 * Math.cos(this.direction + degreesToRadians(45)),
                                      this.location.y + 25.0 * Math.sin(this.direction + degreesToRadians(45)));
        this.leftControlPoint2 = new Point(this.location.x + 15.0 * Math.cos(this.direction + degreesToRadians(125)),
                                      this.location.y + 15.0 * Math.sin(this.direction + degreesToRadians(125)));

        this.rightControlPoint1 = new Point(this.location.x + 25.0 * Math.cos(this.direction + degreesToRadians(-45)),
                                      this.location.y + 25.0 * Math.sin(this.direction + degreesToRadians(-45)));
        this.rightControlPoint2 = new Point(this.location.x + 15.0 * Math.cos(this.direction + degreesToRadians(-125)),
                                      this.location.y + 15.0 * Math.sin(this.direction + degreesToRadians(-125)));

        //var c=document.getElementById("canvas");
        var ctx=canvas.getContext("2d");
        
        //var loc = Camera.convertLocationToScreen(this.bow);
        var cpL1 = Camera.convertLocationToScreen(this.leftControlPoint1);
        var cpL2 = Camera.convertLocationToScreen(this.leftControlPoint2);
        var cpR1 = Camera.convertLocationToScreen(this.rightControlPoint1);
        var cpR2 = Camera.convertLocationToScreen(this.rightControlPoint2);
        var tranL = Camera.convertLocationToScreen(this.transomLeft);
        var tranR = Camera.convertLocationToScreen(this.transomRight);
        var bow = Camera.convertLocationToScreen(this.bow);

        if (this.number == 0)
        {
            //console.log("Fleet 0");
            //console.log("(" + this.location.x +"," + this.location.y + ")");

             var tmp = Camera.convertLocationToScreen(this.location);

             console.log("(" + tmp.x +"," + tmp.y + ")  should be (" + canvas.width / 2.0 + "," + canvas.height / 2.0 + ")")
        //     console.log("Fleet 0: " + this.location.x + ", " + this.location.y);
        //     console.log("Fleet 0 converted: " + tmp.x + ", " + tmp.y);
        }
        if (debugPainting)
        {
            ctx.beginPath();
            ctx.strokeStyle = 'orange';
            ctx.arc(this.bow.x, this.bow.y, 5, 0, 360, false)
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.arc(this.stern.x, this.stern.y, 5, 0, 360, false)
            ctx.stroke();
            
            ctx.beginPath();
            ctx.strokeStyle = 'green';
            ctx.arc(this.leftControlPoint1.x, this.leftControlPoint1.y, 5, 0, 360, false)
            ctx.stroke();
    
            ctx.beginPath();
            ctx.strokeStyle = 'yellow';
            ctx.arc(this.leftControlPoint2.x, this.leftControlPoint2.y, 5, 0, 360, false)
            ctx.stroke();
    
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.moveTo(this.bow.x, this.bow.y);
            ctx.lineTo(this.stern.x, this.stern.y)
            ctx.stroke();
        }

        if (this.number == 0)
             ctx.strokeStyle = 'blue';
        else
            ctx.strokeStyle = 'black';
        
        ctx.beginPath();
        ctx.moveTo(bow.x, bow.y);
        ctx.bezierCurveTo(cpL1.x, cpL1.y, cpL2.x, cpL2.y, tranL.x, tranL.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bow.x, bow.y);
        ctx.bezierCurveTo(cpR1.x, cpR1.y, cpR2.x, cpR2.y, tranR.x, tranR.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(tranL.x, tranL.y);
        ctx.lineTo(tranR.x, tranR.y);
        ctx.stroke();
    }
}

const fleetSize = 40;
var camera = new Camera();

class Fleet{
    constructor(){
        Log("Creating a Fleet");
        Fleet.time = null;
        Fleet.lastTime = Date.now();
        Fleet.elapsed = 0;

        Fleet.fleet = [];
        for(var i = 0; i < fleetSize; i++)
        {
            Fleet.fleet[i] = new Sailboat(i);
        }
    }

    static update(){
        Fleet.time = Date.now();
        Fleet.elapsed = Fleet.time - Fleet.lastTime;
        Fleet.lastTime = Fleet.time;

        Log("Time elapsed: " + Fleet.elapsed);

        for(var i = 0; i < fleetSize; i++)
        {
            Fleet.fleet[i].update(Fleet.elapsed, Weather.windSpeed, Weather.windDirection);
        }
        //Camera.update(Fleet.fleet[0].location);
    }

    static paint(){
        Weather.paint();
        for(var i = 0; i < fleetSize; i++)
        {
            Fleet.fleet[i].paint();
        }
    }
}