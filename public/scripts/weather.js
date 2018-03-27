//var initialized = false;

class Weather{
    constructor()
    {
        if (!Weather.initialized)
        {
            Weather.windSpeed = 0;
            Weather.windDirection = 0;
            Weather.initialized = true;
        }
        Weather.update();
    }

    static update()
    {
        console.log("Weather.Update()");

        $.getJSON('/wind', function(data)
	    {
            var closestIndex = -1;
            var closest = 9999999;
            var d = new Date();
            var min = 1.0 * d.getMinutes();

            for(var i = 0; i < data.length; i++)
            {
                var diff = 1.0 * data[i].Minute - min;

                if (Math.abs(diff) < closest)   
                {
                    closestIndex = i;
                    closest = Math.abs(diff);
                }
            }
            console.log("Closest: " + closestIndex + " - " + data[closestIndex]);

            Weather.windSpeed = MetersPerSecondToMPH(data[closestIndex]["WindSpeed"]);
            Weather.windDirection = thresholdWithin2PI(degreesToRadians(data[closestIndex].WindDir));
            // console.log("wind dir: " + Weather.windDirection + ",  wind speed: " + Weather.windSpeed);
            

            if (!Weather.windSpeed) throw "NO SPEED"
        });
    }

    static paint()
    {
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        // draw circle
        ctx.beginPath();
        ctx.arc(100,75,50,0,2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 75);
        ctx.lineTo(100 - 45.0 * Math.cos(Weather.windDirection), 75 - 45.0 * Math.sin(Weather.windDirection));
        ctx.stroke();

        ctx.font = "15px Arial";
        ctx.fillText("Wind Speed " + this.windSpeed.toFixed(1), 45, 150);
        ctx.fillText("Wind Direction " + radiansToDegrees(this.windDirection).toFixed(0), 45, 170);
    }
}