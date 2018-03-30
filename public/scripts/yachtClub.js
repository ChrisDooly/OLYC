

class YachtClub
{
    constructor()
    {
        YachtClub._connectionString = "";
        
        YachtClub.CLOSEST_TO_CLUB_ALPHA = new Point(0, 0);

        YachtClub.CLUB_ALPHA_MOORING_AREA = new Point(-2550, 82000);
        YachtClub.NUMBER_OF_MOORINGS = 110;
        YachtClub.NUMBER_OF_BOATS_RACING = 85;
        YachtClub.MILLISECONDS_PER_FRAME = 50;
        YachtClub.RileyBay;
        YachtClub.TicksSinceBigBang = 0;
        YachtClub.Fleet = [];
        YachtClub.ServerRoot = "";
        YachtClub.MooringField = []; //new Mooring[YachtClub.NUMBER_OF_MOORINGS];
        YachtClub.SailLocker;
        YachtClub.CLOSEST_TO_CLUB_ALPHA = new Point(0, 0);        
        //BackgroundWorker myWorker = new BackgroundWorker();

        //_connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        // background worker for tide
        // myWorker.DoWork += new DoWorkEventHandler(myWorker_DoWork);
        // myWorker.RunWorkerCompleted += new RunWorkerCompletedEventHandler(myWorker_RunWorkerCompleted);
        // myWorker.ProgressChanged += new ProgressChangedEventHandler(myWorker_ProgressChanged);
        // myWorker.WorkerReportsProgress = true;
        // myWorker.WorkerSupportsCancellation = true;

        YachtClub.numericValue = 0;//Capture the user input
        YachtClub.arrObjects = {}; //{ YachtClub.numericValue };//Declare the array of objects
        // if (!myWorker.IsBusy)//Check if the worker is already in progress
        // {

        //     myWorker.RunWorkerAsync(arrObjects);//Call the background worker
        // }

        //YachtClub.SailLocker = new SailLocker(ApplicationType);
        //YachtClub.RileyBay = _Rileys;

        YachtClub.Fleet = [];  //new Sailboat[YachtClub.NUMBER_OF_MOORINGS];
        YachtClub.MooringField = [] // new Mooring[YachtClub.NUMBER_OF_MOORINGS];

       // ManualResetEvent[] FleetUpdate_resetEvents = new ManualResetEvent[Math.Min(NUMBER_OF_MOORINGS, 64)];
        // we'll init the whole field then take back the non-races and put them on moorings
        YachtClub.InitFleet();
        YachtClub.InitMooringField();

        RaceCommittee.ConfigureRaceCommittee(YachtClub.CLOSEST_TO_CLUB_ALPHA, YachtClub.NumberOfBoatsRacing);
        
        // Before we update the event horizon, lets position the RC, Marks and Boats
        // taking into consideration the land.
        // if RC is near shallow water, reposition
        YachtClub.retry1 = 0;
        
        // now that fleet[0] is in its final beginning position, updateeventhorizon
        RaceCommittee.pt = [];//new Point[YachtClub.Fleet.Length];
        for(var i =0; i< YachtClub.Fleet.Length; i++)
            RaceCommittee.pt[i] = new Point(YachtClub.Fleet[i].x, YachtClub.Fleet[i].y);

        //RileyBay.UpdateEventHorizon(pt);
    }

    // myWorker_DoWork(object sender, DoWorkEventArgs e)
    // {
    //     BackgroundWorker sendingWorker = (BackgroundWorker)sender;//Capture the BackgroundWorker that fired the event
    //     object[] arrObjects = (object[])e.Argument;//Collect the array of objects the we received from the main thread

    //     SurfaceWater.LoadSurfaceWater();

    //     StringBuilder sb = new StringBuilder();//Declare a new string builder to store the result.

    //     //for (var i = 1; i <= maxValue; i++)//Start a for loop
    //     //{
    //     //    if (!sendingWorker.CancellationPending)//At each iteration of the loop, 
    //     //    //check if there is a cancellation request pending 
    //     //    {
    //     //        sb.Append(string.Format("Counting number: {0}{1}",
    //     //        PerformHeavyOperation(i), Environment.NewLine));//Append the result to the string builder
    //     //        sendingWorker.ReportProgress(i);//Report our progress to the main thread
    //     //    }
    //     //    else
    //     //    {
    //     //        e.Cancel = true;//If a cancellation request is pending, assign this flag a value of true
    //     //        break;// If a cancellation request is pending, break to exit the loop
    //     //    }
    //     //}

    //     e.Result = sb.ToString();// Send our result to the main thread!
    // }

   
    // RaceCommittee.myWorker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
    // {

    // }

    // protected void myWorker_ProgressChanged(object sender, ProgressChangedEventArgs e)
    // {

    // }

    // public bool RelocateFleetToWater()
    // {

    //     // NEED TO FIX THIS
    //     return true;


    //     console.log("Enter RelocateFleetToWater()");
    //     double mag = Sailboat.BOAT_LENGTH * 200;

    //     Point[] pt = new Point[YachtClub.Fleet.Length];
    //     for (var i = 0; i < YachtClub.Fleet.Length; i++)
    //         pt[i] = new Point(YachtClub.Fleet[i].X, YachtClub.Fleet[i].Y);
    //     YachtClub.RileyBay.UpdateEventHorizonNow(pt);


    //     // if any boats are on land or shallow water, relocate nearby.
    //     for (var i = 0; i < Fleet.Length; i++)
    //     {
    //         if (YachtClub.Fleet[i].IsMoored)
    //             continue;

    //         int loopcnt = 0;
    //         while (Fleet[i].WaterDepth < 10)
    //         {
    //             Point bPos = new Point((float)(RaceCommittee.location.X + (Math.random() * mag) - (mag / 2)), (float)(RaceCommittee.location.Y + Math.random() * mag - (mag / 2)));

    //             // Adjust location toward current club
    //             //bPos.X += rand.NextDouble() * .3 * (bPos.X - _DockPosition.X);
    //             //bPos.Y += rand.NextDouble() * .3 * (bPos.Y - _DockPosition.Y);
    //             Fleet[i].location = bPos;
    //             Fleet[i].UpdateWaterDepth(true);
    //             if (loopcnt++ > 100)
    //                 return false;
    //         }
    //     }
    //     console.log("Exit RelocateFleetToWater()");
    //     return true;
    // }

    static InitMooringField()
    {
        console.log("Enter InitMooringField()");
        var x = YachtClub.CLUB_ALPHA_MOORING_AREA.X;
        var y = YachtClub.CLUB_ALPHA_MOORING_AREA.Y;
        var randx, randy;

        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        {
            randx = Math.random() * 2 * Sailboat.BOAT_LENGTH - (Sailboat.BOAT_LENGTH * 1);
            randy = Math.random() * 2 * Sailboat.BOAT_LENGTH - (Sailboat.BOAT_LENGTH * 1);

            YachtClub.MooringField[i] = new Mooring(x + randx, y + randy);

            if (i % 8 == 0)
            {
                x += 7 * Sailboat.BOAT_LENGTH;
                //x = BAY_MOORING_AREA.X;
                y = YachtClub.CLUB_ALPHA_MOORING_AREA.Y;
            }
            else
            {
                y += 7 * Sailboat.BOAT_LENGTH;
            }
        }
        
        for (var i = 0; i < (YachtClub.NUMBER_OF_MOORINGS - YachtClub.NumberOfBoatsRacing); i++) // NumberOfBoatsRacing; i++)
        {
            // ensure fleet[0] is always off the mooring (for now..)
            var rndBoat = Math.Max(nextRandomInt(YachtClub.NUMBER_OF_MOORINGS), 1);

            while (YachtClub.Fleet[rndBoat].IsMoored)
            {
                rndBoat = Math.Max(nextRandomInt(YachtClub.NUMBER_OF_MOORINGS), 1);
            }

            MooringField[rndBoat].MoorBoat(rndBoat);
        }
        console.log("Enter InitMooringField()");
    }

    static InitFleet()
    {
        var ClubAlphaRC = new Point(YachtClub.CLOSEST_TO_CLUB_ALPHA.x, YachtClub.CLOSEST_TO_CLUB_ALPHA.y);

        console.log("Enter InitFleet() with " + YachtClub.NUMBER_OF_MOORINGS);
        for (var i = 0; i < YachtClub.NUMBER_OF_MOORINGS; i++)
        //for (var i = 0; i < Fleet.Length; i++)
        {
            var mag = Sailboat.BOAT_LENGTH * 95;// *4;
            var bPos = new Point((ClubAlphaRC.x + (Math.random() * mag) - (mag / 2)), (ClubAlphaRC.y + Math.random() * mag - (mag / 2)));

            // fuck this?
            // Random
            //var SteerTo = Math.random() * Math.PI * 2.0;

            if (Math.random() > .5)
                YachtClub.Fleet[i] = new Sailboat(i);// , bPos, 2, SteerTo , Sails.MurphyAndNye);
            else
                YachtClub.Fleet[i] = new Sailboat(i); //, bPos, 2, SteerTo, Sails.VanZandt);

            //// adjust initial position by starting class
            if (YachtClub.Fleet[i].startClass == (StartingClass.class2))
            {
                YachtClub.Fleet[i].X -= (YachtClub.Fleet[i].X - YachtClub.CLUB_ALPHA_MOORING_AREA.X) / 32.0;
                YachtClub.Fleet[i].Y -= (YachtClub.Fleet[i].Y - YachtClub.CLUB_ALPHA_MOORING_AREA.Y) / 32.0;
            }
            else if (YachtClub.Fleet[i].startClass == (StartingClass.class3))
            {
                YachtClub.Fleet[i].X -= (YachtClub.Fleet[i].X - YachtClub.CLUB_ALPHA_MOORING_AREA.X) / 28.0;
                YachtClub.Fleet[i].Y -= (YachtClub.Fleet[i].Y - YachtClub.CLUB_ALPHA_MOORING_AREA.Y) / 28.0;
            }
            else if (YachtClub.Fleet[i].startClass == (StartingClass.class4))
            {
                YachtClub.Fleet[i].X -= (YachtClub.Fleet[i].X - YachtClub.CLUB_ALPHA_MOORING_AREA.X) / 24;
                YachtClub.Fleet[i].Y -= (YachtClub.Fleet[i].Y - YachtClub.CLUB_ALPHA_MOORING_AREA.Y) / 24;
            }
            else if (YachtClub.Fleet[i].startClass == (StartingClass.class6))
            {
                YachtClub.Fleet[i].X -= (YachtClub.Fleet[i].X - YachtClub.CLUB_ALPHA_MOORING_AREA.X) / 22.0;
                YachtClub.Fleet[i].Y -= (YachtClub.Fleet[i].Y - YachtClub.CLUB_ALPHA_MOORING_AREA.Y) / 22.0;
            }
            else if (YachtClub.Fleet[i].startClass == (StartingClass.class7))
            {
                YachtClub.Fleet[i].X -= (YachtClub.Fleet[i].X - YachtClub.CLUB_ALPHA_MOORING_AREA.X) / 21.0;
                YachtClub.Fleet[i].Y -= (YachtClub.Fleet[i].Y - YachtClub.CLUB_ALPHA_MOORING_AREA.Y) / 21.0;
            }
        }

        YachtClub.Fleet[0].autoPilot = true;

        Camera.update(YachtClub.Fleet[0].location.x, YachtClub.Fleet[0].location.y);
        console.log("Exit InitFleet()");
    }

    static UpdateMooringField()
    {
        for(var i; i < YachtClub.MooringField.length; i++)
            YachtClub.MooringField[i].Update();
    }

    static UpdateFleet(elapsed)
    {
        var collisions = 0;

        
        for (var i = 0; i < YachtClub.Fleet.length; i++)
            YachtClub.Fleet[i].update(elapsed);
        /*    
        for (var i = 0; i < YachtClub.Fleet.length; i++)
            YachtClub.Fleet[i].skipper.BeingCollidedWith = false;
        

        for (var i = 0; i < YachtClub.Fleet.length; i++)
            YachtClub.Fleet[i].UpdateCounters();
    
        for (var i = 0; i < YachtClub.Fleet.length; i++)
            YachtClub.Fleet[i].UpdateBoatHandlingQueue();

        for (var i = 0; i < YachtClub.Fleet.length; i++)
            YachtClub.Fleet[i].ProcessBoatHandlingEvent();
*/
        RaceCommittee.BoatIsNearWindwardMark = false;
        RaceCommittee.BoatIsNearJibeMark1 = false;
        RaceCommittee.BoatIsNearJibeMark2 = false;
        RaceCommittee.BoatIsNearLeewardMark = false;
        RaceCommittee.BoatIsNearFinishMark = false;
        RaceCommittee.BoatIsNearFinishBoat = false;

        for (var i=0; i< YachtClub.Fleet.Length; i++)
        {
            Fleet[i].UpdateAfterBoatHandlingDecision();
            if (Fleet[i].CURRENTLY_COLLIDING)
                collisions++;
        }
        return collisions;
    }
    
    static Update(elapsed)
    {
        var collisions = 0;

        switch (Camera.cameraCenter)
        {
            case CameraCenter.Boat1:
                Camera.update(YachtClub.Fleet[0].location);
                break;
            case CameraCenter.RaceCommittee:
                Camera.update(YachtClub.RaceCommittee.location);
                break;
            case CameraCenter.StartingMark:
                Camera.update(YachtClub.RaceCommittee.StartingMark.location);
                break;
        }
        
        if (ticksSinceBigBang++ % 30000 == 0)
            Weather.update();

        RaceCommittee.update();
        

        Radar.Update();  // updates the distance and vmg matrices for the YachtClub.Fleet

        collisions = YachtClub.UpdateFleet(elapsed);

        YachtClub.UpdateMooringField();

        // if this boat is within the final minute of its starting sequence
        // then we'll adjust the starting area extents to get the boats to start hopefully
        if (true)
        {
            for (var i = 0; i < YachtClub.Fleet.Length; i++)
            {
                if (YachtClub.Fleet[i].SecondsUntilStart > 0 && YachtClub.Fleet[i].SecondsUntilStart < 90)  
                    YachtClub.Fleet[i].UpdateStartingAreaExtents();
            }
        }

        YachtClub.TicksSinceBigBang++;

        //SurfaceWater.Update();

        return collisions;
    }
}

