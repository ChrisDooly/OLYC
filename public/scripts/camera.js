class Camera{
    constructor(left, top, width, height)
    {
        Camera.location = new Point(0, 0);
        Camera.Z = 10;
        Camera.width = width;
        Camera.height = height;
        Camera.top = top;
        Camera.left = left;

        Camera.center = new Point();
    }

    static update(location)
    {
        Camera.location = location;
    }

    static updateCenter(width, height)
    {
        Camera.center.x = width / 2.0;
        Camera.center.y = height / 2.0;
    }

    static convertLocationToScreen(location)
    {
        // console.log(Camera.location.x + "," + Camera.location.y);
        // console.log("Height: " + Camera.Z);

        var pt = new Point((1.0/Camera.Z) * (location.x - Camera.location.x), 
                        (1.0/Camera.Z) * (location.y - Camera.location.y));

        // var pt = new Point(1.0 * Camera.location.x + ((1.0 / Camera.Z) * (1.0 * location.x - Camera.location.x)), 
        //                  1.0 * Camera.location.y + ((1.0 / Camera.Z) * (1.0 * location.y - Camera.location.y)));
        pt.x += Camera.center.x;
        pt.y += Camera.center.y;

        return pt;
    }

    // static ConvertScreen2World(location)
    //     {
    //         //console.log("ConvertScreen2World: " + location.x + ", " + location.y);
    //         //console.log("ConvertScreen2World camera height: " + Camera.height);
    //         //console.log("ConvertScreen2World camera location: " + Camera.location.x + ", " + Camera.location.y);
    //         //console.log("ConvertScreen2World: " + Camera.left + ", " + Camera.top + ", " + Camera.width + ", " + Camera.height);
    //        // console.log("Camera is at (" + Camera.location.x + "," + Camera.location.y + ")");
    //         // var xx = (Camera.width - Camera.left) - location.x;
    //         // var yy = (Camera.height - Camera.top) - location.y;
    //         // var scale3 = 0.5 / (1.0 / Camera.height);

    //         var returnPoint = new Point((1.0 / Camera.height) * (location.x - Camera.location.x), (1.0 / Camera.height) * (location.y - Camera.location.y));
    //         returnPoint.X += Camera.center.x;
    //         returnPoint.Y += Camera.center.y;
            
    //         console.log("ConvertScreen2World returns: " + returnPoint.x + ", " + returnPoint.y);

    //         //return (returnPoint);
    //     }
}