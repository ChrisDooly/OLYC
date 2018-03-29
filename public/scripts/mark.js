class Mark
{
    constructor()
    {
        Mark.MARK_RADIUS = 40;

        this.location = new Point();
        this.FrontLeft = null;
        this.FrontRight = null;
        this.RearLeft = null;
        this.RearRight = null;
    }
    Mark(_x, _y)
    {
        this.location.x = _x;
        this.location.y = _y;

        this.FrontLeft = new Point(_x + 10, _y + 10);
        this.FrontRight = new Point(_x + 10, _y - 10);
        this.RearLeft = new Point(_x - 10, _y + 10);
        this.RearRight = new Point(_x - 10, _y - 10);
    }
}