const verbose = false;
function Log(message){
    if (verbose)
    {
        console.log(message);
    }
}

// conversion
function degreesToRadians(angle){
    return 1.0 * angle * Math.PI / 180.0;
}

function radiansToDegrees(angle){
    return 1.0 * angle * 180.0 / Math.PI;
}

function MetersPerSecondToMPH(speed)
{
    return speed * 2.23694;
}

// trigonometry
function thresholdWithin2PI(radians){
    if (radians > Math.PI)
        return radians - 2.0 * Math.PI;
    else if (radians < -1.0 * Math.PI)
        return radians + 2.0 * Math.PI;
    else
        return radians;
}

class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
  
      return Math.hypot(dx, dy);
    }
  }
  