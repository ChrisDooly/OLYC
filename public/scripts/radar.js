class RadarEcho{
    constructor()
    {
        RadarEcho.EchoPoints = 20;
        RadarEcho.WaterEchoPoints = 10;
        RadarEcho.MaxSeconds = 10;
        RadarEcho.EchoDistances = 5;

        RadarEcho.angle = [];
        RadarEcho.value = [];
        RadarEcho.distance = [];
        RadarEcho.echoPoints = [];
        RadarEcho.waterEchoPoints = [];
        RadarEcho.echoDistances = [];
        RadarEcho.echo = [];

        RadarEcho.Echo_sensor;
        RadarEcho.Echo_dish = new Point();
        RadarEcho.Echo_dist = null;
        RadarEcho.Echo_dishX = null;
        RadarEcho.Echo_dishY = null;
        RadarEcho.Echo_dist0 = null;
        RadarEcho.Echo_dist1 = null;
        RadarEcho.Echo_x1 = null; 
        RadarEcho.Echo_y1 = null; 
        RadarEcho.Echo_x2 = null; 
        RadarEcho.Echo_y2 = null;
        RadarEcho.Echo_vmg = null;
        RadarEcho.Echo_vmgFactor = null;;
        
        RadarEcho.echoPoints[0] = degreesToRadians(180);
        RadarEcho.echoPoints[1] = degreesToRadians(175);
        RadarEcho.echoPoints[2] = degreesToRadians(150);
        RadarEcho.echoPoints[3] = degreesToRadians(120);
        RadarEcho.echoPoints[4] = degreesToRadians(90);
        RadarEcho.echoPoints[5] = degreesToRadians(60);
        RadarEcho.echoPoints[6] = degreesToRadians(45);
        RadarEcho.echoPoints[7] = degreesToRadians(30);
        RadarEcho.echoPoints[8] = degreesToRadians(15);
        RadarEcho.echoPoints[9] = degreesToRadians(5);
        RadarEcho.echoPoints[10] = degreesToRadians(0);
        RadarEcho.echoPoints[11] = degreesToRadians(-5);
        RadarEcho.echoPoints[12] = degreesToRadians(-15);
        RadarEcho.echoPoints[13] = degreesToRadians(-30);
        RadarEcho.echoPoints[14] = degreesToRadians(-45);
        RadarEcho.echoPoints[15] = degreesToRadians(-60);
        RadarEcho.echoPoints[16] = degreesToRadians(-90);
        RadarEcho.echoPoints[17] = degreesToRadians(-120);
        RadarEcho.echoPoints[18] = degreesToRadians(-150);
        RadarEcho.echoPoints[19] = degreesToRadians(-175);

        RadarEcho.waterEchoPoints[0] = degreesToRadians(160);
        RadarEcho.waterEchoPoints[1] = degreesToRadians(120);
        RadarEcho.waterEchoPoints[2] = degreesToRadians(90);
        RadarEcho.waterEchoPoints[3] = degreesToRadians(45);
        RadarEcho.waterEchoPoints[4] = degreesToRadians(15);
        RadarEcho.waterEchoPoints[5] = degreesToRadians(-15);
        RadarEcho.waterEchoPoints[6] = degreesToRadians(-45);
        RadarEcho.waterEchoPoints[7] = degreesToRadians(-90);
        RadarEcho.waterEchoPoints[8] = degreesToRadians(-120);
        RadarEcho.waterEchoPoints[9] = degreesToRadians(-160);
    }

    static GetEcho(time, BoatNumber, x, y, direction, BoatLengths)
    {
        RadarEcho.Echo_dishX = x;
        RadarEcho.Echo_dishY = y;
        RadarEcho.Echo_dish = [];//Radar.PositionAtTime[time, BoatNumber];

        ///Task.Factory.StartNew(() =>
        //    {
                Parallel.For(0, RadarEcho.echoPoints.Length, i =>
                //for (var i = 0; i < RadarEcho.echoPoints.Length; i++)
                {
                    Echo_sensor = new Point((Echo_dish.X + BoatLengths * Sailboat.BOAT_LENGTH * Math.cos(Radar.DirectionAtTime[time, BoatNumber] - echoPoints[i])),
                                (Echo_dish.Y + BoatLengths * Sailboat.BOAT_LENGTH * Math.sin(Radar.DirectionAtTime[time, BoatNumber] - echoPoints[i])));

                    for (var b = 0; b < YachtClub.NUMBER_OF_MOORINGS; b++)
                    {
                        // don't measure distance to yourself.
                        if (!b == BoatNumber)
                        {
                            RadarEcho.Echo_dist = Geometry2D.Points.DistanceBetweenPoints(Radar.PositionAtTime[time, b], Echo_sensor);
                            RadarEcho.Echo_dist0 = Geometry2D.Points.DistanceBetweenPoints(Radar.PositionAtTime[time, BoatNumber], Radar.PositionAtTime[time, b]);
                            RadarEcho.Echo_x1 = Radar.PositionAtTime[time, BoatNumber].X + Radar.VelocityAtTime[time, BoatNumber] * Math.cos(Radar.DirectionAtTime[time, BoatNumber]);
                            RadarEcho.Echo_y1 = Radar.PositionAtTime[time, BoatNumber].Y + Radar.VelocityAtTime[time, BoatNumber] * Math.sin(Radar.DirectionAtTime[time, BoatNumber]);
                            RadarEcho.Echo_x2 = Radar.PositionAtTime[time, b].X + Radar.VelocityAtTime[time, b] * Math.cos(Radar.DirectionAtTime[time, b]);
                            RadarEcho.Echo_y2 = Radar.PositionAtTime[time, b].Y + Radar.VelocityAtTime[time, b] * Math.sin(Radar.DirectionAtTime[time, b]);
                            RadarEcho.Echo_dist1 = Geometry2D.Points.DistanceBetweenPoints(new Point(Echo_x1, Echo_y1), new Point(Echo_x2, Echo_y2));
                            RadarEcho.Echo_vmg = RadarEcho.Echo_dist0 - RadarEcho.Echo_dist1;

                            // build Gaussian for each echo point.

                            // ignore if vmg is large and boat is far away
                            var relativeDirection = Sailboat.relativeDirection(Radar.DirectionAtTime[time, BoatNumber], Radar.DirectionAtTime[time, b]);

                            //if > 3 boat lengths away,
                            // and abeam or ahead (90 degreees or Less)
                            // and vmg is strongly moving away (-3)
                            // then continue;
                            if (!(RadarEcho.Echo_dist1 > Sailboat.BOAT_LENGTH * 3 && Math.abs(relativeDirection) < degreesToRadians(90) && RadarEcho.Echo_vmg < -3))
                            {
                                // if vmg is greater than -5
                                if (RadarEcho.Echo_vmg >= -5)
                                {
                                    // weight the echo based on vmg toward target.
                                    var Echo_vmgFactor = Math.max(1, RadarEcho.Echo_vmg);

                                    // figure out what tack the next boat is on
                                    if (Conversion.ConvertWithinPI(Weather.WindDirection(new Point(x, y)) - Radar.DirectionAtTime[time, b]) < 0)
                                        // then we're on starboard
                                        Echo_vmgFactor *= -1;
                                    else
                                        // on port
                                        Echo_vmgFactor *= 1;

                                    if (Echo_dist < 50 * Sailboat.BOAT_LENGTH)
                                        echo[i] += Echo_vmgFactor * Math.Pow(Sailboat.BOAT_LENGTH / Math.max(Sailboat.BOAT_LENGTH, Echo_dist), 2);
                                }
                            }
                        }
                    }
                });
            //  });
        return echo;
    }
}

class Radar
{
    constructor()
    {
        console.log("------------------- Instantiating Radar -------------------")
        //List<Point> EquadistantTowers = new List<Point>();

        // the dummies that will be sailing in to the future
        Radar.dumbBoat = [];// new DumbBoat[YachtClub.NUMBER_OF_MOORINGS];

        Radar.GeneticDumbBoat = [];//new DumbBoat[YachtClub.NUMBER_OF_MOORINGS];

        Radar.FleetDistanceMatrix = [];
        Radar.LastFleetDistanceMatrix = [];
        Radar.FleetVMGMatrix = [];
        Radar.FleetDistanceMatrixGeneticCollisionPrestart = [];
        Radar.PositionAtTime = [];
        Radar.DirectionAtTime = [];
        Radar.VelocityAtTime = [];

        Radar.Echo = [];// new RadarEcho[18];
        
        try
        {
            Radar.PositionAtTime = [];// new Point[10, YachtClub.NUMBER_OF_MOORINGS];
            Radar.DirectionAtTime = [];//new double[10, YachtClub.NUMBER_OF_MOORINGS];
            Radar.VelocityAtTime = [];//new double[10, YachtClub.NUMBER_OF_MOORINGS];

            for (var t = 0; t < 10; t++)
                for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
                    Radar.PositionAtTime[t, i] = new Point();

            Radar.FleetDistanceMatrix = [];
            for(var i = 0; i < 10; i++)
            {
                Radar.FleetDistanceMatrix[i] = [];
                for (var j = 0; j < YachtClub.NUMBER_OF_MOORINGS; j++)
                {
                    Radar.FleetDistanceMatrix[i][j] = [];
                }
            }

            // new double[10, YachtClub.NUMBER_OF_MOORINGS, YachtClub.NUMBER_OF_MOORINGS];
            Radar.FleetDistanceMatrixGeneticCollisionPrestart = []; //new double[YachtClub.NUMBER_OF_MOORINGS, YachtClub.NUMBER_OF_MOORINGS];
            
            Radar.LastFleetDistanceMatrix = [];//new double[10, YachtClub.NUMBER_OF_MOORINGS, YachtClub.NUMBER_OF_MOORINGS];
            Radar.FleetVMGMatrix = []; //new double[10, YachtClub.NUMBER_OF_MOORINGS, YachtClub.NUMBER_OF_MOORINGS];
            
            console.log("InitDumbBoats()")
            Radar.InitDumbBoats();

            Radar.InitFleetDistanceMatrix();
            console.log("Here xxx")

            
            Radar.InitVMGMatrix();
            
            // console.log("InitDumbBoats()")
            // Radar.InitDumbBoats();
        }
        catch (ex)
        {
            throw "Nowhere to go: " + ex;
        }
    }

    //public void AssignTowerToFaces()
    //{
    //    foreach (face f in YachtClub.RileyBay.Faces)
    //    {
    //    }
    //}
    static InitGeneticDumbBoats(boats)
    {
        for (var i = 0; i < boats.Length; i++)
        {
            GeneticDumbBoat[i] = [];//new DumbBoat(boats[i], YachtClub.Fleet[boats[i]].X, YachtClub.Fleet[boats[i]].Y, YachtClub.Fleet[boats[i]].lastLocation.x, YachtClub.Fleet[boats[i]].lastLocation.y, YachtClub.Fleet[boats[i]].IsTacking(), YachtClub.Fleet[boats[i]].IsJibing(), YachtClub.Fleet[boats[i]].velocity, YachtClub.Fleet[boats[i]].direction, YachtClub.Fleet[boats[i]].offwind, YachtClub.Fleet[boats[i]].DesiredHeadingAfterTackOrJibe);
        }
    }

    static InitDumbBoats()
    {
        console.log("InitDumbBoats with " +  YachtClub.NUMBER_OF_MOORINGS)
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
            console.log("DumbBoat[" + i + "]");
            Radar.dumbBoat[i] = new DumbBoat(i, YachtClub.Fleet[i].location.x, YachtClub.Fleet[i].location.y, YachtClub.Fleet[i].lastLocation.x, YachtClub.Fleet[i].lastLocation.y, YachtClub.Fleet[i].IsTacking(), YachtClub.Fleet[i].IsJibing(), YachtClub.Fleet[i].velocity, YachtClub.Fleet[i].direction, YachtClub.Fleet[i].offwind, YachtClub.Fleet[i].DesiredHeadingAfterTackOrJibe);
            Radar.GeneticDumbBoat[i] = new DumbBoat(i, YachtClub.Fleet[i].location.x, YachtClub.Fleet[i].location.y, YachtClub.Fleet[i].lastLocation.x, YachtClub.Fleet[i].lastLocation.y, YachtClub.Fleet[i].IsTacking(), YachtClub.Fleet[i].IsJibing(), YachtClub.Fleet[i].velocity, YachtClub.Fleet[i].direction, YachtClub.Fleet[i].offwind, YachtClub.Fleet[i].DesiredHeadingAfterTackOrJibe);
        }
    }

    static Update()
    {
        //if (YachtClub.TicksSinceBigBang % 5 > 0)
        //    return;

        Radar.UpdateDumbBoats();

        Radar.UpdateFleetDistanceMatrix();
        Radar.UpdateVMGMatrix();

        Radar.IdentifyTop3Risks();

        Radar.UpdateLastFleetDistanceMatrix();
    }

    static TenSecondPreview()
    {

        // run the dummies through 10 seconds of life and calc distance and vmg matrices
        
        for (var t = 0; t < 10000; t += YachtClub.MILLISECONDS_PER_FRAME)
        {
            for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
            {
                Radar.dumbBoat[i].Update();

                if (t % 1000 == 0)
                {
                    Radar.PositionAtTime[t / 1000, i] = new Point(dumbBoat[i].x, dumbBoat[i].y);
                    Radar.DirectionAtTime[t / 1000, i] = Radar.dumbBoat[i].direction;
                    Radar.VelocityAtTime[t / 1000, i] = Radar.dumbBoat[i].velocity;
                }
            }
                //  });
            if (t % 1000 == 0)
            {
                for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
                {
                    for (var j = 0; j < i; j++)
                    {
                        Radar.LastFleetDistanceMatrix[t / 1000, i, j] = Radar.FleetDistanceMatrix[t / 1000, i, j];
                        Radar.LastFleetDistanceMatrix[t / 1000, j, i] = Radar.FleetDistanceMatrix[t / 1000, i, j];

                        Radar.FleetDistanceMatrix[t / 1000, i, j] = Radar.dumbBoat[i].DistanceToPoint(dumbBoat[j].x, dumbBoat[j].y);
                        Radar.FleetDistanceMatrix[t / 1000, j, i] = Radar.FleetDistanceMatrix[t / 1000, i, j];
                    }
                }

                for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
                {
                    for (var j = 0; j < i; j++)
                    {
                        Radar.FleetVMGMatrix[t / 1000, i, j] = Radar.dumbBoat[i].VMG(t / 1000, j);
                        Radar.FleetVMGMatrix[t / 1000, j, i] = Radar.FleetVMGMatrix[t / 1000, i, j];
                    }
                }
            }
        }
    }

    static UpdateLastFleetDistanceMatrix()
    {
        //10, YachtClub.NUMBER_OF_MOORINGS, YachtClub.NUMBER_OF_MOORINGS
        for (var i = 0; i < 10; i++)
            for (var j = 0; j < YachtClub.NUMBER_OF_MOORINGS; j++)
                for (var k = 0; k < YachtClub.NUMBER_OF_MOORINGS; k++)
                    Radar.LastFleetDistanceMatrix[i, j, k] = Radar.FleetDistanceMatrix[i, j, k];
    }

    static UpdateDumbBoats()
    {
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
            Radar.dumbBoat[i].x = YachtClub.Fleet[i].location.x;
            Radar.dumbBoat[i].y = YachtClub.Fleet[i].location.y;
            Radar.dumbBoat[i].lastx = YachtClub.Fleet[i].lastLocation.x;
            Radar.dumbBoat[i].lasty = YachtClub.Fleet[i].lastLocation.y;
            Radar.dumbBoat[i].IsTacking = YachtClub.Fleet[i].IsTacking();
            Radar.dumbBoat[i].IsJibing = YachtClub.Fleet[i].IsJibing();
            Radar.dumbBoat[i].velocity = YachtClub.Fleet[i].velocity;
            Radar.dumbBoat[i].direction = YachtClub.Fleet[i].direction;
            Radar.dumbBoat[i].offwind = YachtClub.Fleet[i].offwind;
            Radar.dumbBoat[i].DesiredHeadingAfterTackOrJibe = YachtClub.Fleet[i].DesiredHeadingAfterTackOrJibe;
        }
    }
    
    static InitVMGMatrix()
    {
        // update, but only for boats within ??
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
            for (var j = 0; j < i; j++)
            {
                Radar.FleetVMGMatrix[0, i, j] = Sailboat.VMG(i, j);
                Radar.FleetVMGMatrix[0, j, i] = Radar.FleetVMGMatrix[0, i, j];
            }
        }
    }
    
    static UpdateVMGMatrix()
    {
        // update, but only for boats within ??
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
                // 11/28/10
            if (YachtClub.Fleet[i].TicksUntilRadarCheck > 0)
                continue;
                    
            for (var j = 0; j < i; j++)
            {
                Radar.FleetVMGMatrix[0, i, j] = Sailboat.VMG(i, j);
                Radar.FleetVMGMatrix[0, j, i] = Radar.FleetVMGMatrix[0, i, j];
            }
        }
    }

    /// <summary>
    /// Identify the 3 boats that will be closest within next 10 seconds
    /// </summary>
    /// <param name="Fleet"></param>
    static IdentifyTop3Risks()
    {
        try
        {
            // top 3 are 3 with closest approach during course of next 10 seconds
            var dist = [];// new double[3];
            dist[0] =Number.MAX_VALUE;
            dist[1] =Number.MAX_VALUE;
            dist[2] =Number.MAX_VALUE;
            var vmg = [];// new double[3];
            vmg[0] =Number.MAX_VALUE;
            vmg[1] =Number.MAX_VALUE;
            vmg[2] =Number.MAX_VALUE;
            var Boat3 = [];// new int[3];
            Boat3[0] = -1;
            Boat3[1] = -1;
            Boat3[2] = -1;
            var time = [];//new int[3];
            time[0] = Number.MAX_VALUE;
            time[1] = Number.MAX_VALUE;
            time[2] = Number.MAX_VALUE;

            var distance =Number.MAX_VALUE;
            var closestTime = Number.MAX_VALUE;
            var VMG1 = 0;

            console.log("In IdentifyTop3Risks")
            //for (var boat = 0; boat < YachtClub.NumberOfBoatsRacing; boat++)
            for (var boat = 0; boat < YachtClub.NUMBER_OF_MOORINGS; boat++)
            {
                console.log("IdentifyTop3Risks loop: " + boat)
                if (!(YachtClub.Fleet[boat].TicksUntilRadarCheck > 0))
                {
                    dist[0] =Number.MAX_VALUE;
                    dist[1] =Number.MAX_VALUE;
                    dist[2] =Number.MAX_VALUE;

                    vmg[0] =Number.MAX_VALUE;
                    vmg[1] =Number.MAX_VALUE;
                    vmg[2] =Number.MAX_VALUE;

                    Boat3[0] = -1;
                    Boat3[1] = -1;
                    Boat3[2] = -1;

                    time[0] = Number.MAX_VALUE;
                    time[1] = Number.MAX_VALUE;
                    time[2] = Number.MAX_VALUE;

                    distance =Number.MAX_VALUE;
                    closestTime = Number.MAX_VALUE;
                    VMG1 =Number.MAX_VALUE; ;

                    for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
                    {
                        if (boat != i)
                        {
                            distance =Number.MAX_VALUE;
                            VMG1 =Number.MAX_VALUE;

                            for (var t = 0; t < 10; t++)
                            {
                                if (!(Radar.FleetDistanceMatrix[t, boat, i] == 0))
                                {
                                    if (t > 0 && Radar.FleetDistanceMatrix[t, boat, i] != 0)
                                    {
                                        console.log("WHat: " + Radar.FleetDistanceMatrix[t, boat, i])
                                        throw "WHAT?";
                                    }

                                    if (Radar.FleetDistanceMatrix[t, boat, i] < distance)
                                    {
                                        distance = Radar.FleetDistanceMatrix[t, boat, i];
                                        VMG1 = Radar.FleetVMGMatrix[t, boat, i];
                                        closestTime = t;
                                    }
                                    else
                                        break;
                                }
                            }

                            // now, distance is the closest that this boat will get and it will occur at time closestTime
                            if (distance < dist[0])
                            {
                                dist[2] = dist[1];
                                dist[1] = dist[0];
                                dist[0] = distance;

                                vmg[2] = vmg[1];
                                vmg[1] = vmg[0];
                                vmg[0] = VMG1;

                                time[2] = time[1];
                                time[1] = time[0];
                                time[0] = closestTime;

                                Boat3[2] = Boat3[1];
                                Boat3[1] = Boat3[0];
                                Boat3[0] = i;
                            }
                            else if (distance < dist[1])
                            {
                                dist[2] = dist[1];
                                dist[1] = distance;

                                time[2] = time[1];
                                time[1] = closestTime;

                                vmg[2] = vmg[1];
                                vmg[1] = VMG1;

                                Boat3[2] = Boat3[1];
                                Boat3[1] = i;
                            }
                            else if (distance < dist[2])
                            {
                                dist[2] = distance;
                                time[2] = closestTime;
                                vmg[2] = VMG1;
                                Boat3[2] = i;
                            }
                        }
                    }
                    try
                    {
                        YachtClub.Fleet[boat].top3 = new Top3(boat, dist[0], dist[1], dist[2], vmg[0], vmg[1], vmg[2], Boat3[0], Boat3[1], Boat3[2], time[0], time[1], time[2]);
                    }
                    catch (ex)
                    {
                        console.log("EXX:" + ex);
                    }
                }
            }
        }
        catch (ex)
        {
            console.log("Ex:" + ex);
        }
    }
    
    static InitFleetDistanceMatrix()
    {
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
            for (var j = 0; j < i; j++)
            {
                if (dumbBoat[i] == null)
                {
                    Radar.FleetDistanceMatrix[0, i, j] = 100;
                    Radar.FleetDistanceMatrix[0, j, i] = 100;
                }
                else
                {

                    Radar.FleetDistanceMatrix[0, i, j] = Radar.dumbBoat[i].DistanceToPoint(Radar.dumbBoat[j].x, Radar.dumbBoat[j].y);
                    Radar.FleetDistanceMatrix[0, j, i] = Radar.FleetDistanceMatrix[0, i, j];
                }

                // set last distance matrix for calculating VMG
                Radar.LastFleetDistanceMatrix[0, i, j] = Radar.FleetDistanceMatrix[0, i, j];
                Radar.LastFleetDistanceMatrix[0, j, i] = Radar.FleetDistanceMatrix[0, i, j];
            }
        }
    }

    static UpdateFleetDistanceMatrix()
    {
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
            // 11/28/10
            if (YachtClub.Fleet[i].TicksUntilRadarCheck == 0 && YachtClub.Fleet[i].top3.dist != null)
            {
                //if (YachtClub.Fleet[i].top3.dist[0] > 20 * Sailboat.BOAT_LENGTH || YachtClub.Fleet[i].IsMoored)
                //{
                    YachtClub.Fleet[i].TicksUntilRadarCheck = 5 + (YachtClub.Fleet[i].IsMoored ? 5000 + i : 0);

                    for (var j = 0; j < i; j++)
                    {
                        Radar.FleetDistanceMatrix[0, i, j] = Radar.LastFleetDistanceMatrix[0, i, j];
                        Radar.FleetDistanceMatrix[0, j, i] = Radar.LastFleetDistanceMatrix[0, i, j];
                    }
//                    continue;
                //}
                //else
                //    YachtClub.Fleet[i].TicksUntilRadarCheck = 0;
            }

            for (var j = 0; j < i; j++)
            {
                // set last distance matrix for calculating VMG
                //if (FleetDistanceMatrix[0, j, i] < Sailboat.BOAT_LENGTH * 50 
                //    || Convert.ToInt64(YachtClub.TicksSinceBigBang) % YachtClub.NumberOfBoats == i)
                //{
                //
                //{

                //}
                    Radar.LastFleetDistanceMatrix[0, i, j] = Radar.FleetDistanceMatrix[0, i, j];
                    Radar.LastFleetDistanceMatrix[0, j, i] = Radar.FleetDistanceMatrix[0, i, j];

                    Radar.FleetDistanceMatrix[0, i, j] = Radar.dumbBoat[i].DistanceToPoint(Radar.dumbBoat[j].x, Radar.dumbBoat[j].y);
                    Radar.FleetDistanceMatrix[0, j, i] = Radar.FleetDistanceMatrix[0, i, j];
                //}
            }
        }
    }

    static ShallowWater(boatLocation, boatHeading)
    {
        for (var i = 0; i < RadarEcho.echoPoints.Length; i++)
        {
            for (var dist = 10; dist <= 50; dist += 20) // * Sailboat.BOAT_LENGTH; dist += 20 * Sailboat.BOAT_LENGTH)
            {
                var f = new face();
                var d = YachtClub.RileyBay.GetWaterDepth(new Point(boatLocation.X + dist * Sailboat.BOAT_LENGTH * Math.cos(boatHeading + RadarEcho.echoPoints[i]), boatLocation.Y + dist * Sailboat.BOAT_LENGTH * Math.sin(boatHeading + RadarEcho.echoPoints[i])), f);

                if (d.Equals(0))
                    continue;

                if (d < 4)
                    return true;
            }
        }
        return false;
    }
}
