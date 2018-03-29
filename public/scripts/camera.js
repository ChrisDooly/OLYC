CameraCenter = {Boat1 : 0,
    RaceCommittee : 1, 
    StartingMark : 2}


class Camera{
    constructor(left, top, width, height)
    {
        Camera.cameraCenter = CameraCenter.Boat1;
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
}