var canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    cx = null,
    fps = 30,
    bX = 30,
    bY = 30,
    mX = 10,
    mY = 20;

Camera.height = canvas.height;
Camera.width = canvas.width;
Camera.left = 0;
Camera.top = 0;

var weather = new Weather();
if (!weather)
    throw "NO WEATHER";
else
{
    console.log("Weather: " + weather.windSpeed + ", " + weather.windDirection)
}

setTimeout(2000)

var fleet = new Fleet();
var ticksSinceBigBang = 0;
let zoomFactor = 0;
let steer = 0;

Camera.updateCenter(canvas.width, canvas.height);

function gameLoop() {
    if (Weather.windSpeed > 0)
    {
        Fleet.update();
        Camera.update(Fleet.fleet[0].location);

        // check weather every 30 seconds
        if (ticksSinceBigBang++ % 30000 == 0)
            Weather.update();

        cx.clearRect(0,0,cw,cw);
        
        Fleet.paint();
        
        cx.beginPath();
        cx.fillStyle = 'red';
        cx.arc(bX, bY, 20, 0, Math.PI * 360);
        cx.fill();
        if(bX >= cw || bX <= 0) { mX*=-1; }
        if(bY >= ch || bY <= 0) { mY*=-1; }
        
        bX+=mX;
        bY+=mY;
        Log("Zoom: " + zoomFactor)

        // handle keyboard and mouse requests
        if (zoomFactor > 0)
        {
            console.log("Camera Height: " + Camera.Z);
            Camera.Z*= zoomFactor;
            zoomFactor = 0;
        }

        if (steer != 0)
        {
            if (steer == -1)
            {
                Fleet.fleet[0].portSteerEvent();
                steer = 0;
            }
            else{
                Fleet.fleet[0].starboardSteerEvent();
                steer = 0;
            }
        }
        else{
            Fleet.fleet[0].noSteerEvent();
        }
    }
}

if (typeof (canvas.getContext) !== undefined) {
    cx = canvas.getContext('2d');
    Camera.update(Fleet.fleet[0].location);
    setInterval(gameLoop, 1000 / fps);

    //setInterval(gameLoop, 1000 );
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
       case 37:
          console.log('Left key pressed');
          steer = -1;
          break;
       case 38:
          console.log('Up key pressed');
          zoomFactor = 1.1;
          break;
       case 39:
          console.log('Right key pressed');
          steer = 1;
          break;
       case 40:
          console.log('Down key pressed');
          zoomFactor = 0.9;
          break;
    }
};

document.onmousewheel = function() {
    if (event.deltaY > 0)
        zoomFactor = 0.9;
    else if (event.deltaY < 0)
        zoomFactor = 1.1;
}