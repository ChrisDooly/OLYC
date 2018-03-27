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
        //this.location =  new Point(100, 100);
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

        this.velocity = ((99.0 * this.velocity) + maxSpeed) / 100.0;
        Log("Speed is: " + maxSpeed + "*");

        //console.log("Offwind is: " + offwind);

        this.location.x += (elapsed/1000.0) * (this.velocity * Math.cos(this.direction));
        this.location.y += (elapsed/1000.0) * (this.velocity * Math.sin(this.direction));
    }

    paint(){
        var canvas = document.getElementById('canvas'),
        cw = canvas.width,
        ch = canvas.height;
        //console.log("x: " + cw + ", y: " + ch);

        var cameraLocation = new Point((0.5 * cw) + this.location.x - Camera.location.x, (0.5 * ch) + this.location.y - Camera.location.y);
        
        // if (this.number == 0)
        //     console.log("x: " + cameraLocation.x + ", y: " + cameraLocation.y);
        //var cameraLocation = new Point(Camera.location.x - this.location.x, Camera.location.y - this.location.y);

        this.bow = new Point(cameraLocation.x + 30 * Math.cos(this.direction), cameraLocation.y + 30 * Math.sin(this.direction));
        this.stern = new Point(cameraLocation.x - 30 * Math.cos(this.direction), cameraLocation.y - 30 * Math.sin(this.direction));
        this.transomLeft = new Point(cameraLocation.x - 31 * Math.cos(this.direction + degreesToRadians(-15)), 
                                     cameraLocation.y - 31 * Math.sin(this.direction + degreesToRadians(-15)));
        this.transomRight = new Point(cameraLocation.x - 31 * Math.cos(this.direction + degreesToRadians(15)), 
                                     cameraLocation.y - 31 * Math.sin(this.direction + degreesToRadians(15)));

        this.leftControlPoint1 = new Point(cameraLocation.x + 25.0 * Math.cos(this.direction + degreesToRadians(45)),
                                      cameraLocation.y + 25.0 * Math.sin(this.direction + degreesToRadians(45)));
        this.leftControlPoint2 = new Point(cameraLocation.x + 15.0 * Math.cos(this.direction + degreesToRadians(125)),
                                      cameraLocation.y + 15.0 * Math.sin(this.direction + degreesToRadians(125)));

        this.rightControlPoint1 = new Point(cameraLocation.x + 25.0 * Math.cos(this.direction + degreesToRadians(-45)),
                                      cameraLocation.y + 25.0 * Math.sin(this.direction + degreesToRadians(-45)));
        this.rightControlPoint2 = new Point(cameraLocation.x + 15.0 * Math.cos(this.direction + degreesToRadians(-125)),
                                      cameraLocation.y + 15.0 * Math.sin(this.direction + degreesToRadians(-125)));

        //var c=document.getElementById("canvas");
        var ctx=canvas.getContext("2d");
        
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
        ctx.moveTo(this.bow.x, this.bow.y);
        ctx.bezierCurveTo(this.leftControlPoint1.x, this.leftControlPoint1.y, this.leftControlPoint2.x, this.leftControlPoint2.y, this.transomLeft.x, this.transomLeft.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.bow.x, this.bow.y);
        ctx.bezierCurveTo(this.rightControlPoint1.x, this.rightControlPoint1.y, this.rightControlPoint2.x, this.rightControlPoint2.y, this.transomRight.x, this.transomRight.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.transomLeft.x, this.transomLeft.y);
        ctx.lineTo(this.transomRight.x, this.transomRight.y);
        ctx.stroke();
    }

    OLD_paint(){
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

        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        
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
        ctx.moveTo(this.bow.x, this.bow.y);
        ctx.bezierCurveTo(this.leftControlPoint1.x, this.leftControlPoint1.y, this.leftControlPoint2.x, this.leftControlPoint2.y, this.transomLeft.x, this.transomLeft.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.bow.x, this.bow.y);
        ctx.bezierCurveTo(this.rightControlPoint1.x, this.rightControlPoint1.y, this.rightControlPoint2.x, this.rightControlPoint2.y, this.transomRight.x, this.transomRight.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.transomLeft.x, this.transomLeft.y);
        ctx.lineTo(this.transomRight.x, this.transomRight.y);
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
        Camera.update(Fleet.fleet[0].location);
    }

    static paint(){
        Weather.paint();
        for(var i = 0; i < fleetSize; i++)
        {
            Fleet.fleet[i].paint();
        }
    }
}

// class Fleet{
//     constructor(){
//         Log("Creating a Fleet");
//         this.time = null;
//         this.lastTime = Date.now();
//         this.elapsed = 0;

//         this.fleet = [];
//         for(var i = 0; i < fleetSize; i++)
//         {
//             this.fleet[i] = new Sailboat(i);
//         }        
//     }

//     update(){
//         this.time = Date.now();
//         this.elapsed = this.time - this.lastTime;
//         this.lastTime = this.time;

//         Log("Time elapsed: " + this.elapsed);

//         for(var i = 0; i < fleetSize; i++)
//         {
//             this.fleet[i].update(this.elapsed, Weather.windSpeed, Weather.windDirection);
//         }
//         Camera.update(this.fleet[0].location);
//     }

//     paint(){
//         Weather.paint();
//         for(var i = 0; i < fleetSize; i++)
//         {
//             this.fleet[i].paint();
//         }
//     }
// }