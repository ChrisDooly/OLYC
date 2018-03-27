class Camera{
    constructor()
    {
        Camera.location = new Point(0, 0);
    }

    static update(location)
    {
        Camera.location = location;
    }
}