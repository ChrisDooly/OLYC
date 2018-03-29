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
  
function directionBetweenPoints(point1, point2)
{
    return Math.atan2(point1.y - point2.y, point1.x - point2.x);
}

function DistanceBetweenPoints(point1, point2)
{
    return Math.Sqrt(Math.Pow(point1.x - point2.x, 2) + Math.Pow(point1.y - point2.y, 2));
}

// random
function nextRandomInt(seed)
{
    return Math.floor(Math.random() * (seed + 1));
}

// Queue
  
// This Stack is written using the pseudoclassical pattern

// Creates the queue
class Queue{
    constructor()
    {
        this.storage = {};
        this.count = 0;
        this.lowestCount = 0;    
    }

    // Adds a value to the end of the chain
    enqueue(value)
    {
        // Check to see if value is defined
        if (value) {
            this.storage[this.count] = value;
            this.count++;
        }
    }

    // Removes a value from the beginning of the chain
    dequeue(){
        // Check to see if queue is empty
        if (this.count - this.lowestCount === 0) {
            return undefined;
        }

        var result = this.storage[this.lowestCount];
        delete this.storage[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    clear()
    {
        this.storage.clear();
    }

    // Returns the length of the queue
    size () {
        return this.count - this.lowestCount;
    }

    toArray()
    {
        var moves = [];
        for(var i = 0; i < this.count; i++)
        {
            moves.push(this.storage[i]);
        }

        return moves;
    }
}
