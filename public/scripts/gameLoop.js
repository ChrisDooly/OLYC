var canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    cx = null,
    fps = 30,
    bX = 30,
    bY = 30,
    mX = 10,
    mY = 20;

var weather = new Weather();
if (!weather)
    throw "NO WEATHER";
else
{
    console.log("Weather: " + weather.windSpeed + ", " + weather.windDirection)
}
setTimeout(2000)

var fleet = new Fleet();
console.log("Fleet: " + fleet);
console.log("Weather.ws: " + weather.windSpeed + "  Weather.wd: " + weather.windDirection);
//fleet.update(weather);

var ticksSinceBigBang = 0;

function gameLoop() {
    if (Weather.windSpeed > 0)
    {
        fleet.update();
    }

    if (ticksSinceBigBang++ % 1000 == 0)
        Weather.update();

    cx.clearRect(0,0,cw,cw);
    fleet.paint();
    
    cx.beginPath();
    cx.fillStyle = 'red';
    cx.arc(bX, bY, 20, 0, Math.PI * 360);
    cx.fill();
    if(bX >= cw || bX <= 0) { mX*=-1; }
    if(bY >= ch || bY <= 0) { mY*=-1; }
    
    bX+=mX;
    bY+=mY;
}

if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');

    setInterval(gameLoop, 1000 / fps);
}