const debugPainting = false;

class Sailboat{
    constructor(number){
        this.number = number;
        this.direction = thresholdWithin2PI(Math.random() * 2.0 * Math.PI);
        this.location = new Point(Math.random() * 500.0, Math.random() * 500.0);

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
        Log("windSpeed: " + windSpeed)
        Log("windDir: " + windDir)
        if (!windSpeed === null){
            //throw "No WindSpeed";
            return;
        } 
        //console.log("Elapsed: " + elapsed/1000.0);
        console.log("Wind Speed: " + windSpeed)

        this.location.x += (elapsed/1000.0) * (windSpeed * Math.cos(this.direction));
        this.location.y += (elapsed/1000.0) * (windSpeed * Math.sin(this.direction));
    }

    paint(){
        
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

class Fleet{
    constructor(){
        Log("Creating a Fleet");
        this.time = null;
        this.lastTime = Date.now();
        this.elapsed = 0;

        this.fleet = [];
        for(var i = 0; i < fleetSize; i++)
        {
            this.fleet[i] = new Sailboat(i);
        }
    }

    update(){
        this.time = Date.now();
        this.elapsed = this.time - this.lastTime;
        this.lastTime = this.time;

        Log("Time elapsed: " + this.elapsed);

        for(var i = 0; i < fleetSize; i++)
        {
            this.fleet[i].update(this.elapsed, Weather.windSpeed, Weather.windDirection);
        }
    }

    paint(){
        for(var i = 0; i < fleetSize; i++)
        {
            this.fleet[i].paint();
        }
    }
}