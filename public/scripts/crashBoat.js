class CrashBoat
{

    constructor (loc, _velocity, _heading)
    {
        CrashBoat.BOAT_LENGTH = 250;
        CrashBoat.Bow = new Point();
        CrashBoat.SternPort = new Point();
        CrashBoat.SternStarboard = new Point();
    
        CrashBoat.BoatMatrix(loc.x, loc.y, Weather.WindDirection);
        CrashBoat.points = [];
    }

    static BoatMatrix(tmpx, tmpy, windDirection)
    {
        var scale = (1.0 / Camera.Z);

        CrashBoat.points = [];
        for(var i = 0; i < 13; i++)
            CrashBoat.points[i] = new Point();

        CrashBoat.points[0].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .4 * Math.cos(windDirection));
        CrashBoat.points[0].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .4 * Math.sin(windDirection));
        CrashBoat.Bow.x = CrashBoat.points[0].x;
        CrashBoat.Bow.y = CrashBoat.points[0].y;
        CrashBoat.points[1].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.cos(windDirection + 0.5));
        CrashBoat.points[1].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.sin(windDirection + 0.5));
        CrashBoat.points[2].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.cos(windDirection + 1));
        CrashBoat.points[2].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.sin(windDirection + 1));
        CrashBoat.points[3].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.cos(windDirection + 1.57));
        CrashBoat.points[3].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.sin(windDirection + 1.57));
        CrashBoat.points[4].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.cos(windDirection + 2.1));
        CrashBoat.points[4].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.sin(windDirection + 2.1));
        CrashBoat.points[5].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .45 * Math.cos(windDirection + 2.7));
        CrashBoat.points[5].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .45 * Math.sin(windDirection + 2.7));
        CrashBoat.SternPort.x = CrashBoat.points[5].x;
        CrashBoat.SternPort.y = CrashBoat.points[5].y;
        CrashBoat.points[6].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .4 * Math.cos(windDirection + 3.141));
        CrashBoat.points[6].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .4 * Math.sin(windDirection + 3.141));
        CrashBoat.points[7].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .45 * Math.cos(windDirection + 3.6));
        CrashBoat.points[7].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .45 * Math.sin(windDirection + 3.6));
        CrashBoat.SternStarboard.x = CrashBoat.points[7].x;
        CrashBoat.SternStarboard.y = CrashBoat.points[7].y;
        CrashBoat.points[8].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.cos(windDirection + 4.2));
        CrashBoat.points[8].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.sin(windDirection + 4.2));
        CrashBoat.points[9].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.cos(windDirection + 4.7));
        CrashBoat.points[9].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.sin(windDirection + 4.7));
        CrashBoat.points[10].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.cos(windDirection + 5.3));
        CrashBoat.points[10].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .25 * Math.sin(windDirection + 5.3));
        CrashBoat.points[11].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.cos(windDirection + 5.7));
        CrashBoat.points[11].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .3 * Math.sin(windDirection + 5.7));
        CrashBoat.points[12].x = (tmpx + scale * CrashBoat.BOAT_LENGTH * .9 * .4 * Math.cos(windDirection));
        CrashBoat.points[12].y = (tmpy + scale * CrashBoat.BOAT_LENGTH * .9 * .4 * Math.sin(windDirection));

        return CrashBoat.points;
    }

}
