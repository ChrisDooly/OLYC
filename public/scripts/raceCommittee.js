let StartingClass = {class1 : 0, 
    class2 : 0, 
    class3 : 0, 
    class4 : 0, 
    class5 : 0, 
    class6 : 0, 
    class7 : 0};

Object.keys(StartingClass).forEach((page) => console.log(page));

const RaceCommitteeStatus = {
    NotRacing : 0, 
    ThirtyMinute : 1,
    FiveMinute : 2,
    FourMinute : 3,
    OneMinute : 4,
    StartButNotAllClear : 5,
    StartAllClear : 6,
    Finish : 7 
  };

const StartingSequenceType = { 
    FiveMinute : 0, 
    ThreeMinute : 1
}

const FavoredEndType = { 
    RaceCommittee : 0,
    StartingMark : 1,
    Even : 2
}
const CourseLeg = { 
    Start2Windward : 0, 
    Windward2Offset : 1, 
    Offset2LeewardGate : 2, 
    Windward2Jibe : 3, 
    Jibe2Leeward : 4,
    Leeward2Windward : 5, 
    LeewardGate2Finish : 6, 
    LeewardGate2Windward : 7, 
    Offset2Leeward : 8, 
    Leeward2Finish : 9, 
    Start2Finish : 10 
}

const Courses = { 
    I : 0,
    I2 : 1,
    Olympic : 2, 
    UpwindSprint : 3 
}

const RaceCommitteStatus = {NotRacing : 0, 
    ThirtyMinute : 1, 
    FiveMinute : 2, 
    FourMinute : 3, 
    OneMinute : 4, 
    StartButNotAllClear : 5, 
    StartAllClear : 6, 
    Finish : 7};

    

//const StartingSequenceType = { FiveMinute, ThreeMinute };
//const FavoredEndType = { RaceCommittee, StartingMark, Even };
const StartSequence = { Oscar : 0, Traditional : 1};

const Flag = { Abandonment : 0, 
    AP : 1, 
    BlackFlag : 2, 
    Blue : 3, 
    CourseChange : 4, 
    GeneralRecall : 5, 
    IoverZ : 6, 
    IndividualRecall : 7, 
    L : 8, 
    M : 9, 
    NoverA : 10, 
    NoverH : 11, 
    OneMinuteFlag : 12, 
    P : 13, 
    Preparatory : 14, 
    ShortenedCourse : 15, 
    Warning : 16, 
    Warning1 : 17, 
    Warning2 : 18, 
    Warning3 : 19, 
    Warning4 : 20,
    Warning5 : 21, 
    Warning6 : 22, 
    Y : 23, 
    Zulu : 24 };

class fleetStatistics
{
    constructor(){
        fleetStatistics.starters = {};
        fleetStatistics.finishers = {};
    };

    
    // public Dictionary<string, int> Starters;// = new Dictionary<string,int>();
    // public Dictionary<string, int> Finishers;// = new Dictionary<string,int>();
}

class Course
{
    constructor(course)
    {
        
        this.legs = [];

        switch (course)
        {
            case Courses.I:
                legs.Add(CourseLeg.Start2Windward);
                legs.Add(CourseLeg.Windward2Offset);
                legs.Add(CourseLeg.Offset2LeewardGate);
                legs.Add(CourseLeg.LeewardGate2Finish);
                break;
            case Courses.I2:
                legs.Add(CourseLeg.Start2Windward);
                legs.Add(CourseLeg.Windward2Offset);
                legs.Add(CourseLeg.Offset2LeewardGate);
                legs.Add(CourseLeg.LeewardGate2Windward);
                legs.Add(CourseLeg.Windward2Offset);
                legs.Add(CourseLeg.Offset2LeewardGate);
                legs.Add(CourseLeg.LeewardGate2Finish);
                break;
            case Courses.Olympic:
                legs.Add(CourseLeg.Start2Windward);
                legs.Add(CourseLeg.Windward2Jibe);
                legs.Add(CourseLeg.Jibe2Leeward);
                legs.Add(CourseLeg.Leeward2Windward);
                legs.Add(CourseLeg.Windward2Offset);
                legs.Add(CourseLeg.Offset2Leeward);
                legs.Add(CourseLeg.Leeward2Finish);
                break;
            case Courses.UpwindSprint:
                legs.Add(CourseLeg.Start2Finish);
                break;
            default:
                alert("UNKNOWN COURSE FLAG:" + course);
        }
    }
}


class RaceCommittee
{
    constructor()
    {
        console.log("Construct RaceCommittee");
        RaceCommittee.Flags = {};

        RaceCommittee._StartAudio = "";
        RaceCommittee._StartSequence = StartSequence.Traditional;

        RaceCommittee.OLYCSession;
        RaceCommittee.RaceNumber = RaceStatus.GetMaxRaceID() + 1;

        RaceCommittee.Races = {};

        RaceCommittee.CurrentRaceForFleet = {};
        RaceCommittee.CurrentRaceForFleet["class1"] = 0;
        RaceCommittee.CurrentRaceForFleet["class2"] = 0;
        RaceCommittee.CurrentRaceForFleet["class3"] = 0;
        RaceCommittee.CurrentRaceForFleet["class4"] = 0;
        RaceCommittee.CurrentRaceForFleet["class5"] = 0;
        RaceCommittee.CurrentRaceForFleet["class6"] = 0;
        RaceCommittee.CurrentRaceForFleet["class7"] = 0;
console.log('RaceCommittee.CurrentRaceForFleet: ' + RaceCommittee.CurrentRaceForFleet)
        RaceCommittee.fleetStatistics = null;
        RaceCommittee.FinishBoat = null;
        RaceCommittee.ClassIsStarting = false;
        RaceCommittee.BoatIsNearWindwardMark = false;
        RaceCommittee.BoatIsNearJibeMark1 = false;
        RaceCommittee.BoatIsNearJibeMark2 = false;
        RaceCommittee.BoatIsNearLeewardMark = false;
        RaceCommittee.BoatIsNearFinishMark = false;
        RaceCommittee.BoatIsNearFinishBoat = false;

        RaceCommittee.startOrder = []; // {};
        RaceCommittee.fleetCurrentlyStarting;
        RaceCommittee.fleetsCurrentlyRacing = {};
        RaceCommittee.FleetCourse = {};
        RaceCommittee.ticks_since_adjusting_favored_end = 0;
        RaceCommittee.START_AT_TOLERANCE = .02;
        
        RaceCommittee.FavoredEnd = new Point();
        RaceCommittee.UnfavoredEnd = new Point();
        
        RaceCommittee.MiddleOfLine = new Point();    
        
        RaceCommittee.FavoredEndDescription = FavoredEndType.Even;

        RaceCommittee.VerticalForTMBeat = 5000;
        RaceCommittee.VerticalForTMRun = 5000;
        // public static System.Media.SoundPlayer soundPlayer = new System.Media.SoundPlayer();

        RaceCommittee.startingSequenceType = StartingSequenceType.FiveMinute;
        RaceCommittee.StartingMark = null;
        RaceCommittee.WindwardMark = null;
        RaceCommittee.LeewardMark = null;
        RaceCommittee.JibeMark1 = null;
        RaceCommittee.JibeMark2 = null;
        RaceCommittee.FinishMark = null;

        RaceCommittee.BOAT_LENGTH = 350;
        RaceCommittee.FrontLeft, RaceCommittee.FrontRight, RaceCommittee.RearLeft, RaceCommittee.RearRight;

        RaceCommittee.StartingLineDirection = 0; 
        RaceCommittee._mode;
        RaceCommittee.ThirtyMinuteBeat = [];
        RaceCommittee.ThirtyMinuteRun = [];
        RaceCommittee.JustBelowStartingLine = [];
        RaceCommittee.JustAboveStartingLine = [];
        RaceCommittee.RoundWeatherMarkJudge1 = [];
        RaceCommittee.RoundWeatherMarkJudge2 = [];

        RaceCommittee.RoundJibeMark1Judge1 = [];
        RaceCommittee.RoundJibeMark1Judge2 = [];

        RaceCommittee.RoundJibeMark2Judge1 = [];
        RaceCommittee.RoundJibeMark2Judge2 = [];
        
        RaceCommittee.RoundLeewardMarkJudge1 = [];
        RaceCommittee.RoundLeewardMarkJudge2 = [];

        RaceCommittee.FinishLineJudge1 = [];
        RaceCommittee.FinishLineJudge2 = [];
        
        RaceCommittee.Anchor;

        //public static double anchorx, anchory;
        RaceCommittee.location = new Point();
        //public static double x, y;

        RaceCommittee.STARTING_LINE_LENGTH = 0;

        RaceCommittee.Status = RaceCommitteStatus.ThirtyMinute;

        RaceCommittee.xc = [], RaceCommittee.yc = [];
        RaceCommittee.shape = [];
        RaceCommittee.Bow = [];
        RaceCommittee.SternPort = [];
        RaceCommittee.SternStarboard = [];

        var d = new Date();
        RaceCommittee.OLYCSession = d.getTime();

        // lock (startOrder)
        // {
            RaceCommittee.startOrder.push(StartingClass.class1);
            RaceCommittee.startOrder.push(StartingClass.class2);
            RaceCommittee.startOrder.push(StartingClass.class3);
            RaceCommittee.startOrder.push(StartingClass.class4);
            RaceCommittee.startOrder.push(StartingClass.class5);
            RaceCommittee.startOrder.push(StartingClass.class6);
            RaceCommittee.startOrder.push(StartingClass.class7);
        //}

        //foreach (Flag f in Enum.GetValues(typeof(Flag)))
        for(var i = 0; i < Flag.length; i++)
        {
            RaceCommittee.Flags[RaceCommittee.Flag[i]] = false;
        }

        RaceCommittee.adjustmt = 1.4 + Math.random() * .3;
    }

    // static string StartAudio
    // {
    //     get { return _StartAudio; }
    //     set { _StartAudio = value; }
    // }

    // static StartSequence StartSequence
    // {
    //     get { return _StartSequence; }
    //     set { _StartSequence = value; }
    // }

    static ConfigureRaceCommittee(_AnchorLocation, NumberOfBoatsRacing)
    {
        RaceCommittee.CurrentRaceForFleet.class1 = 0;
        RaceCommittee.CurrentRaceForFleet.class2 = 0;
        RaceCommittee.CurrentRaceForFleet.class3 = 0;
        RaceCommittee.CurrentRaceForFleet.class4 = 0;
        RaceCommittee.CurrentRaceForFleet.class5 = 0;
        RaceCommittee.CurrentRaceForFleet.class6 = 0;
        RaceCommittee.CurrentRaceForFleet.class7 = 0;

        RaceCommittee.Anchor = _AnchorLocation;

        RaceCommittee.location.x = RaceCommittee.Anchor.X - 1000 * Math.cos(Weather.windDirection);
        RaceCommittee.location.y = RaceCommittee.Anchor.Y - 1000 * Math.sin(Weather.windDirection);


        RaceCommittee.STARTING_LINE_LENGTH = (RaceCommittee.NumberOfBoatsRacing / RaceCommittee.startOrder.Count) * Sailboat.BOAT_LENGTH * 1.5 * RaceCommittee.adjustmt;

        RaceCommittee.COURSE_LENGTH_MULTIPLIER = 1.0;
        
        if (true)
            RaceCommittee.COURSE_LENGTH_MULTIPLIER = .3 + (0.2 * Math.random() - 0.1);

        RaceCommittee.StartingMark = new Mark(Math.round(RaceCommittee.location.x + RaceCommittee.STARTING_LINE_LENGTH * Math.cos((0.5 * Math.PI) - Weather.WindDirection)), 
        Math.round(location.y - RaceCommittee.STARTING_LINE_LENGTH * Math.sin((0.5 * Math.PI) - Weather.WindDirection)));
        RaceCommittee.JibeMark1 = new Mark(Math.round(RaceCommittee.location.x + RaceCommittee.COURSE_LENGTH_MULTIPLIER * 18.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.cos((0.33 * Math.PI) - Weather.WindDirection)), Math.round(RaceCommittee.location.y - RaceCommittee.COURSE_LENGTH_MULTIPLIER * 22.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.sin((0.33 * Math.PI) - Weather.WindDirection)));
        RaceCommittee.JibeMark2 = new Mark(Math.round(RaceCommittee.location.x + RaceCommittee.COURSE_LENGTH_MULTIPLIER * 18.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.cos((0.67 * Math.PI) - Weather.WindDirection)), Math.round(RaceCommittee.location.y - RaceCommittee.COURSE_LENGTH_MULTIPLIER * 22.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.sin((0.67 * Math.PI) - Weather.WindDirection)));

        //Windward mark
        RaceCommittee.WindwardMark = new Mark(Math.round(RaceCommittee.StartingMark.location.x + RaceCommittee.COURSE_LENGTH_MULTIPLIER * 16.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.cos(Weather.WindDirection)), Math.round(RaceCommittee.StartingMark.location.y + RaceCommittee.COURSE_LENGTH_MULTIPLIER * 18.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.sin(Weather.WindDirection)));
        //Leeward mark
        RaceCommittee.LeewardMark = new Mark(Math.round(RaceCommittee.StartingMark.location.x - RaceCommittee.COURSE_LENGTH_MULTIPLIER * 14.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.cos(Weather.WindDirection)), Math.round(RaceCommittee.StartingMark.location.y - RaceCommittee.COURSE_LENGTH_MULTIPLIER * 18.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.sin(Weather.WindDirection)));

        RaceCommittee.FinishMark = new Mark(Math.round(RaceCommittee.StartingMark.location.x - RaceCommittee.COURSE_LENGTH_MULTIPLIER * 8.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.cos(Weather.WindDirection)), Math.round(RaceCommittee.StartingMark.location.y - RaceCommittee.COURSE_LENGTH_MULTIPLIER * 8.0 * RaceCommittee.STARTING_LINE_LENGTH * Math.sin(Weather.WindDirection)));
        
        RaceCommittee.FinishBoat = new CrashBoat(new Point(
            RaceCommittee.FinishMark.location.x - (RaceCommittee.STARTING_LINE_LENGTH / 2.0) * Math.cos(Weather.WindDirection - (Math.PI / 2.0)),
            RaceCommittee.FinishMark.location.y - (RaceCommittee.STARTING_LINE_LENGTH / 2.0) * Math.sin(Weather.WindDirection - (Math.PI / 2.0))), 0, Weather.WindDirection - (Math.PI / 2.0));

        var xc = [];//new float[13];
        var yc = [];//new float[13];

        RaceCommittee.StartingLineDirection = thresholdWithin2PI(directionBetweenPoints(RaceCommittee.location, RaceCommittee.StartingMark.location));
    }

    static update()
    {

        RaceCommittee.UpdateDisplayedFlags();

        if (YachtClub.TicksSinceBigBang % 500 == 0) 
        {
            RaceCommittee.UpdateRacingStatistics();

            //Array classes = Enum.GetValues( typeof(StartingClass) );Array classes = Enum.GetValues( typeof(StartingClass) );
            var classes = StartingClass;

            Object.keys(classes).forEach((page) => {
                console.log("PAGE: " + page);
                var sc = classes[page];
                console.log("Classes[i]: " + sc);

                if (fleetStatistics.Starters[sc] == 0 && RaceCommittee.fleetsCurrentlyRacing[sc] != null && RaceCommittee.Races[sc]._TicksMostRecentFinisher + (2 * 60 * 20) < YachtClub.TicksSinceBigBang) // allow boats 2 minutes to get back to starting area
                {
                    fleetsCurrentlyRacing.Remove(sc);
                    
                    lock (startOrder)
                    {
                        startOrder.Add(sc);
                    }

                    if (!WorldTimer.Running)
                    {
                        StartRaceSequence();
                    }

                    LogRaceFinish(CurrentRaceForFleet[sc.ToString()]);
                }
                else if (YachtClub.TicksSinceBigBang > 0 && RaceCommittee.fleetsCurrentlyRacing[sc] != null && RaceCommittee.Races[sc]._TicksFirstFinisher > 0 &&
                    YachtClub.TicksSinceBigBang - RaceCommittee.Races[sc]._TicksFirstFinisher > 5 * 20 * 60)
                {
                    foreach(boat in YachtClub.Fleet)
                    {
                        if (boat.startClass == sc)
                        {
                            boat.skipper.Relax(boat.BoatNumber);
                        }
                    }
                    
                    // If it has been more than 5 minutes since first finisher in the fleet.
                    fleetsCurrentlyRacing.Remove(sc);

                    lock (startOrder)
                    {
                        startOrder.Add(sc);
                    }

                    if (!WorldTimer.Running)
                    {
                        StartRaceSequence();
                    }

                    LogRaceFinish(CurrentRaceForFleet[sc.ToString()]);
            }});
        }

        RaceCommittee.ticks_since_adjusting_favored_end++;
        WorldTimer.Tick();
        
        // adjust boat position for wind
        var targetx = RaceCommittee.Anchor.X - 1000 * Math.cos(Weather.WindDirection);
        var targety = RaceCommittee.Anchor.Y - 1000 * Math.sin(Weather.WindDirection);

        RaceCommittee.location.x = location.x + (targetx - location.x) / 200.0;
        RaceCommittee.location.y = location.y + (targety - location.y) / 200.0;

        RaceCommittee.FrontLeft = new Point((RaceCommittee.location.x + RaceCommittee.BOAT_LENGTH * .5 + Math.cos(Weather.WindDirection(RaceCommittee.location))), (location.y + RaceCommittee.BOAT_LENGTH * .5 + Math.sin(Weather.WindDirection)));
        RaceCommittee.FrontRight = new Point((RaceCommittee.location.x + RaceCommittee.BOAT_LENGTH * .5 + Math.cos(Weather.WindDirection(RaceCommittee.location))), (location.y + RaceCommittee.BOAT_LENGTH * .5 + Math.sin(Weather.WindDirection)));
        RaceCommittee.RearLeft = new Point((RaceCommittee.location.x + RaceCommittee.BOAT_LENGTH * .6 + Math.cos(Weather.WindDirection(RaceCommittee.location) + degreesToRadians(30))), (location.y + RaceCommittee.BOAT_LENGTH * .6 + Math.sin(Weather.WindDirection(RaceCommittee.location) + degreesToRadians(30))));
        RaceCommittee.RearRight = new Point((RaceCommittee.location.x + RaceCommittee.BOAT_LENGTH * .6 + Math.cos(Weather.WindDirection(RaceCommittee.location) + degreesToRadians(-30))), (location.y + RaceCommittee.BOAT_LENGTH * .6 + Math.sin(Weather.WindDirection(RaceCommittee.location) + degreesToRadians(-30))));

        if (RaceCommittee.ClassIsStarting)
        {
            RaceCommittee.JustBelowStartingLine[0] = new Point(RaceCommittee.location.x, RaceCommittee.location.y);
            RaceCommittee.JustBelowStartingLine[1] = new Point(RaceCommittee.StartingMark.location.x, RaceCommittee.StartingMark.location.y);
            RaceCommittee.JustBelowStartingLine[2] = new Point(RaceCommittee.StartingMark.location.x + 50 * Math.cos(Weather.WindDirection(RaceCommittee.location)), RaceCommittee.StartingMark.location.y + 50 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.JustBelowStartingLine[3] = new Point(RaceCommittee.location.x + 50 * Math.cos(Weather.WindDirection(RaceCommittee.location)), RaceCommittee.location.y + 50 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.JustBelowStartingLine[4] = new Point(RaceCommittee.location.x, RaceCommittee.location.y);

            RaceCommittee.JustAboveStartingLine[0] = new Point(RaceCommittee.location.x, RaceCommittee.location.y);
            RaceCommittee.JustAboveStartingLine[1] = new Point(RaceCommittee.StartingMark.location.x, RaceCommittee.StartingMark.location.y);
            RaceCommittee.JustAboveStartingLine[2] = new Point(RaceCommittee.StartingMark.location.x - 50 * Math.cos(Weather.WindDirection(RaceCommittee.location)), RaceCommittee.StartingMark.location.y - 50 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.JustAboveStartingLine[3] = new Point(RaceCommittee.location.x - 50 * Math.cos(Weather.WindDirection(RaceCommittee.location)), RaceCommittee.location.y - 50 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.JustAboveStartingLine[4] = new Point(RaceCommittee.location.x, RaceCommittee.location.y);

            // check for boats that have just crossed the starting line
            for (var i = 0; i < YachtClub.Fleet.Length; i++)
            {
                if (YachtClub.Fleet[i].IsStarting && !YachtClub.Fleet[i].IsRacing)
                {
                    if (Geometry2D.Polygon.PointInPolygon(YachtClub.Fleet[i].lastLocation, JustAboveStartingLine)
                        && Geometry2D.Polygon.PointInPolygon(YachtClub.Fleet[i].location, JustBelowStartingLine))
                    {
                        YachtClub.Fleet[i].IsRacing = true;
                        //YachtClub.Fleet[i].IsStarting = false;

                        // Note: OnTheCourseSide is onlye used for determining what flags to fly.
                        if (YachtClub.Fleet[i].OnTheCourseSide)
                            YachtClub.Fleet[i].OnTheCourseSide = false;

                        YachtClub.Fleet[i].skipper.thirtyMinuteStatus = Skipper.ThirtyMinuteStatus.BeatingToWindwardMark;

                        Races[YachtClub.Fleet[i].startClass].AddStarter();

            //            Lighthouse.PlaySound(@".\audio\BoatStart.wav");
                    }
                }
            }
        }

        if (RaceCommittee.BoatIsNearWindwardMark)
        {
            RaceCommittee.RoundWeatherMarkJudge1[0] = new Point(RaceCommittee.WindwardMark.location.x, RaceCommittee.WindwardMark.location.y);
            RaceCommittee.RoundWeatherMarkJudge1[1] = new Point(RaceCommittee.WindwardMark.location.x + 12000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI)), (RaceCommittee.WindwardMark.location.y + 12000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI));
            RaceCommittee.RoundWeatherMarkJudge1[2] = new Point(RaceCommittee.WindwardMark.location.x + 12000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI / 2.0)), (RaceCommittee.WindwardMark.location.y + 12000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI / 2.0));
            RaceCommittee.RoundWeatherMarkJudge1[3] = RaceCommittee.RoundWeatherMarkJudge1[0];

            RaceCommittee.RoundWeatherMarkJudge2[0] = new Point(RaceCommittee.WindwardMark.location.x, (RaceCommittee.WindwardMark.location.y));
            RaceCommittee.RoundWeatherMarkJudge2[1] = new Point(RaceCommittee.WindwardMark.location.x + 12000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI / 2.0)), (RaceCommittee.WindwardMark.location.y + 12000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI / 2.0));
            RaceCommittee.RoundWeatherMarkJudge2[2] = new Point(RaceCommittee.WindwardMark.location.x + 12000 * Math.cos(Weather.WindDirection(RaceCommittee.location))), (RaceCommittee.WindwardMark.location.y + 12000 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.RoundWeatherMarkJudge2[3] = RaceCommittee.RoundWeatherMarkJudge2[0];
        }
        if (RaceCommittee.BoatIsNearJibeMark1)
        {
            RaceCommittee.RoundJibeMark1Judge1[0] = new Point(RaceCommittee.JibeMark1.location.x, RaceCommittee.JibeMark1.location.y);
            RaceCommittee.RoundJibeMark1Judge1[1] = new Point(RaceCommittee.JibeMark1.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + (Math.PI / 2.0))), (RaceCommittee.JibeMark1.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + (Math.PI / 2.0)));
            RaceCommittee.RoundJibeMark1Judge1[2] = new Point(RaceCommittee.JibeMark1.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location))), (RaceCommittee.JibeMark1.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.RoundJibeMark1Judge1[3] = RaceCommittee.RoundJibeMark1Judge1[0];

            RaceCommittee.RoundJibeMark1Judge2[0] = new Point(RaceCommittee.JibeMark1.location.x, (RaceCommittee.JibeMark1.location.y));
            RaceCommittee.RoundJibeMark1Judge2[1] = new Point(RaceCommittee.JibeMark1.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location))), (RaceCommittee.JibeMark1.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location)));
            RaceCommittee.RoundJibeMark1Judge2[2] = new Point(RaceCommittee.JibeMark1.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - (Math.PI / 2.0))), (RaceCommittee.JibeMark1.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - (Math.PI / 2.0)));
            RaceCommittee.RoundJibeMark1Judge2[3] = RaceCommittee.RoundJibeMark1Judge2[0];
        }

        if (RaceCommittee.BoatIsNearJibeMark2)
        {
            RaceCommittee.RoundJibeMark2Judge1[0] = new Point(RaceCommittee.JibeMark2.location.x, RaceCommittee.JibeMark2.location.y);
            RaceCommittee.RoundJibeMark2Judge1[1] = new Point((RaceCommittee.JibeMark2.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location))), (RaceCommittee.JibeMark2.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location))));
            RaceCommittee.RoundJibeMark2Judge1[2] = new Point((RaceCommittee.JibeMark2.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 2.0)), (RaceCommittee.JibeMark2.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 2.0)));
            RaceCommittee.RoundJibeMark2Judge1[3] = RaceCommittee.RoundJibeMark2Judge1[0];

            RaceCommittee.RoundJibeMark2Judge2[0] = new Point((RaceCommittee.JibeMark2.location.x), (RaceCommittee.JibeMark2.location.y));
            RaceCommittee.RoundJibeMark2Judge2[1] = new Point((RaceCommittee.JibeMark2.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 2.0)), (RaceCommittee.JibeMark2.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 2.0)));
            RaceCommittee.RoundJibeMark2Judge2[2] = new Point((RaceCommittee.JibeMark2.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI)), (RaceCommittee.JibeMark2.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI)));
            RaceCommittee.RoundJibeMark2Judge2[3] = RaceCommittee.RoundJibeMark2Judge2[0];
        }
        if (RaceCommittee.BoatIsNearLeewardMark)
        {
            RaceCommittee.RoundLeewardMarkJudge1[0] = new Point(RaceCommittee.LeewardMark.location.x, RaceCommittee.LeewardMark.location.y);
            RaceCommittee.RoundLeewardMarkJudge1[1] = new Point((RaceCommittee.LeewardMark.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 2.0)), (RaceCommittee.LeewardMark.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 2.0)));
            RaceCommittee.RoundLeewardMarkJudge1[2] = new Point((RaceCommittee.LeewardMark.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI)), (RaceCommittee.LeewardMark.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI)));
            RaceCommittee.RoundLeewardMarkJudge1[3] = RaceCommittee.RoundLeewardMarkJudge1[0];

            RaceCommittee.RoundLeewardMarkJudge2[0] = new Point((RaceCommittee.LeewardMark.location.x), (RaceCommittee.LeewardMark.location.y));
            RaceCommittee.RoundLeewardMarkJudge2[1] = new Point((RaceCommittee.LeewardMark.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI)), (RaceCommittee.LeewardMark.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI)));
            RaceCommittee.RoundLeewardMarkJudge2[2] = new Point((RaceCommittee.LeewardMark.location.x + 9000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI / 2.0)), (RaceCommittee.LeewardMark.location.y + 9000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI / 2.0)));
            RaceCommittee.RoundLeewardMarkJudge2[3] = RaceCommittee.RoundLeewardMarkJudge2[0];
        }

        if (RaceCommittee.BoatIsNearFinishMark || RaceCommittee.BoatIsNearFinishBoat)
        {
            RaceCommittee.FinishLineJudge1[0] = new Point(RaceCommittee.FinishMark.location.x, RaceCommittee.FinishMark.location.y);
            RaceCommittee.FinishLineJudge1[1] = new Point(RaceCommittee.FinishBoat.location.x, RaceCommittee.FinishBoat.location.y);
            RaceCommittee.FinishLineJudge1[2] = new Point((RaceCommittee.FinishBoat.location.x + 2000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI)), (RaceCommittee.FinishBoat.location.y + 2000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI)));
            RaceCommittee.FinishLineJudge1[3] = new Point((RaceCommittee.FinishMark.location.x + 2000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI)), (RaceCommittee.FinishMark.location.y + 2000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI)));
            RaceCommittee.FinishLineJudge1[4] = RaceCommittee.FinishLineJudge2[0];

            RaceCommittee.FinishLineJudge2[0] = new Point(RaceCommittee.FinishMark.location.x, RaceCommittee.FinishMark.location.y);
            RaceCommittee.FinishLineJudge2[1] = new Point(RaceCommittee.FinishBoat.location.x, RaceCommittee.FinishBoat.location.y);
            RaceCommittee.FinishLineJudge2[2] = new Point((RaceCommittee.FinishBoat.location.x - 2000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI)), (RaceCommittee.FinishBoat.location.y - 2000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI)));
            RaceCommittee.FinishLineJudge2[3] = new Point((RaceCommittee.FinishMark.location.x - 2000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI)), (RaceCommittee.FinishMark.location.y - 2000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI)));
            RaceCommittee.FinishLineJudge2[4] = RaceCommittee.FinishLineJudge1[0];
        }

        if (YachtClub.TicksSinceBigBang < 2 || YachtClub.TicksSinceBigBang % 200 == 0)
        {
            // update zones for thirty minutes. This needs to be done as long as status is ThirtyMinutes
            if (RaceCommittee.Status == RaceCommitteStatus.ThirtyMinute
                || Status == RaceCommitteStatus.FiveMinute
                || Status == RaceCommitteStatus.FourMinute
                || Status == RaceCommitteStatus.OneMinute)
            {
                RaceCommittee.ThirtyMinuteBeat[0] = new Point(Math.round(RaceCommittee.location.x - RaceCommittee.VerticalForTMBeat * Math.cos(Weather.WindDirection(RaceCommittee.location))), Math.round(RaceCommittee.location.y - RaceCommittee.VerticalForTMBeat * Math.sin(Weather.WindDirection(RaceCommittee.location))));
                //ThirtyMinuteBeat[1] = new Point(Math.round(ThirtyMinuteBeat[0].X - 1000000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 4.0)), Math.round(ThirtyMinuteBeat[0].Y - 600000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 4.0)));
                //ThirtyMinuteBeat[2] = new Point(Math.round(ThirtyMinuteBeat[0].X - 1000000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI / 4.0)), Math.round(ThirtyMinuteBeat[0].Y - 600000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI / 4.0)));
                RaceCommittee.ThirtyMinuteBeat[1] = new Point(Math.round(RaceCommittee.ThirtyMinuteBeat[0].X - 500000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 4.0)), Math.round(RaceCommittee.ThirtyMinuteBeat[0].Y - 300000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 4.0)));
                RaceCommittee.ThirtyMinuteBeat[2] = new Point(Math.round(RaceCommittee.ThirtyMinuteBeat[0].X - 500000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI / 4.0)), Math.round(RaceCommittee.ThirtyMinuteBeat[0].Y - 300000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI / 4.0)));
                RaceCommittee.ThirtyMinuteBeat[3] = new Point(Math.round(RaceCommittee.StartingMark.location.x - RaceCommittee.VerticalForTMBeat * Math.cos(Weather.WindDirection(RaceCommittee.location))), Math.round(RaceCommittee.StartingMark.location.y - RaceCommittee.VerticalForTMBeat * Math.sin(Weather.WindDirection(RaceCommittee.location))));
                RaceCommittee.ThirtyMinuteBeat[4] = RaceCommittee.ThirtyMinuteBeat[0];


                RaceCommittee.ThirtyMinuteRun[0] = new Point(Math.round(RaceCommittee.location.x + RaceCommittee.VerticalForTMRun * Math.cos(Weather.WindDirection(RaceCommittee.location))), Math.round(location.y + RaceCommittee.VerticalForTMRun * Math.sin(Weather.WindDirection(RaceCommittee.location))));
                //ThirtyMinuteRun[1] = new Point(Math.round(ThirtyMinuteRun[1].X + 500000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 8.0)), Math.round(ThirtyMinuteRun[1].Y + 300000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 8.0)));
                RaceCommittee.ThirtyMinuteRun[1] = new Point(Math.round(RaceCommittee.ThirtyMinuteRun[0].X + 500000 * Math.cos(Weather.WindDirection(RaceCommittee.location) + Math.PI / 8.0)), Math.round(RaceCommittee.ThirtyMinuteRun[0].Y + 300000 * Math.sin(Weather.WindDirection(RaceCommittee.location) + Math.PI / 8.0)));
                RaceCommittee.ThirtyMinuteRun[2] = new Point(Math.round(RaceCommittee.ThirtyMinuteRun[0].X + 500000 * Math.cos(Weather.WindDirection(RaceCommittee.location) - Math.PI / 8.0)), Math.round(RaceCommittee.ThirtyMinuteRun[0].Y + 300000 * Math.sin(Weather.WindDirection(RaceCommittee.location) - Math.PI / 8.0)));
                RaceCommittee.ThirtyMinuteRun[3] = new Point(Math.round(RaceCommittee.StartingMark.location.x + RaceCommittee.VerticalForTMRun * Math.cos(Weather.WindDirection(RaceCommittee.location))), Math.round(RaceCommittee.StartingMark.location.y + RaceCommittee.VerticalForTMRun * Math.sin(Weather.WindDirection(RaceCommittee.location))));
                RaceCommittee.ThirtyMinuteRun[4] = RaceCommittee.ThirtyMinuteRun[0];
            }
        }

        // we only want to do this once, but to be safe, put it in update and only do it upon inception.
        if (YachtClub.TicksSinceBigBang < 2)
        {
            // Update starting line direction so Brains can reference it
            var rc = new Point(RaceCommittee.location.x, RaceCommittee.location.y);
            var sm = new Point(RaceCommittee.StartingMark.location.x, RaceCommittee.StartingMark.location.y);

            RaceCommittee.StartingLineDirection = thresholdWithin2PI(directionBetweenPoints(rc, sm));
        }

        if (RaceCommittee.ticks_since_adjusting_favored_end > 200)
        {
            RaceCommittee.MiddleOfLine.X = (RaceCommittee.location.x + RaceCommittee.StartingMark.location.x) / 2;
            RaceCommittee.MiddleOfLine.Y = (RaceCommittee.location.y + RaceCommittee.StartingMark.location.y) / 2;

            if (Weather.WindDirection(RaceCommittee.location) < Weather.InitialWindDirection - RaceCommittee.START_AT_TOLERANCE)
            {
                RaceCommittee.FavoredEndDescription = FavoredEndType.StartingMark;
                RaceCommittee.UnfavoredEnd = RaceCommittee.location;
                RaceCommittee.FavoredEnd = RaceCommittee.StartingMark.location;
                RaceCommittee.ticks_since_adjusting_favored_end = 0;
            }
            else if (Weather.WindDirection(RaceCommittee.location) > Weather.InitialWindDirection +RaceCommittee.START_AT_TOLERANCE)
            {
                RaceCommittee.FavoredEndDescription = FavoredEndType.RaceCommittee;
                RaceCommittee.FavoredEnd = RaceCommittee.location;
                RaceCommittee.UnfavoredEnd = RaceCommittee.StartingMark.location;
                RaceCommittee.ticks_since_adjusting_favored_end = 0;
            }
            else
            {
                RaceCommittee.FavoredEndDescription = FavoredEndType.Even;
                // just set arbitrarily
                RaceCommittee.FavoredEnd = RaceCommittee.location;
                RaceCommittee.UnfavoredEnd = RaceCommittee.StartingMark.location;
                RaceCommittee.ticks_since_adjusting_favored_end = 0;
            }
        }
    }

    static UpdateDisplayedFlags()
    {
        // if this is 5 minutes for any fleet, put up the class flag
        for (var i = 0; i < 6; i++)
        {
            if (YachtClub.Fleet[i].SecondsUntilStart == 5 * 60 && YachtClub.TicksSinceBigBang % 20 == 0 && WorldTimer.Running)
            {
                switch(i)
                {
                    case 0:
                        RaceCommittee.Flags[Flag.Warning1] = true;
                        break;
                    case 1:
                        RaceCommittee.Flags[Flag.Warning2] = true;
                        break;
                    case 2:
                        RaceCommittee.Flags[Flag.Warning3] = true;
                        break;
                    case 3:
                        RaceCommittee.Flags[Flag.Warning4] = true;
                        break;
                    case 4:
                        RaceCommittee.Flags[Flag.Warning5] = true;
                        break;
                    case 5:
                        RaceCommittee.Flags[Flag.Warning6] = true;
                        break;
                }
                break;
            }
        }

        // Play Sound for Starting Sequence - 4 minutes
        // if this is 4 minutes for any fleet, put up the class flag
        for (var i = 0; i < 6; i++)
        {
            if (YachtClub.Fleet[i].SecondsUntilStart == 4 * 60 && YachtClub.TicksSinceBigBang % 20 == 0 && WorldTimer.Running)
            {
                if (StartSequence == World.StartSequence.Traditional)
                    Lighthouse.PlaySound(StartAudio);
                else
                    Lighthouse.PlayOscar(StartAudio, 4);

                Flags[Flag.Preparatory] = true;
                break;
            }
        }

        // Play Sound for Starting Sequence - 1 minute
        for (var i = 0; i < 6; i++)
        {
            if (YachtClub.Fleet[i].SecondsUntilStart == 1 * 60 && YachtClub.TicksSinceBigBang % 20 == 0 && WorldTimer.Running)
            {
                if (StartSequence == World.StartSequence.Traditional)
                    Lighthouse.PlaySound(StartAudio);
                else
                    Lighthouse.PlayOscar(StartAudio, 1);

                Flags[Flag.Preparatory] = false;
                break;
            }
        }

        
        for (var i = 0; i < 6; i++)
        {
            if (YachtClub.Fleet[i].SecondsUntilStart == 0 && YachtClub.TicksSinceBigBang % 20 == 0 && WorldTimer.Running)
            {
                Set_X_Flag(i);

                switch (i)
                {
                    case 0:
                        Flags[Flag.Warning1] = false;
                        break;
                    case 1:
                        Flags[Flag.Warning2] = false;
                        break;
                    case 2:
                        Flags[Flag.Warning3] = false;
                        break;
                    case 3:
                        Flags[Flag.Warning4] = false;
                        break;
                    case 4:
                        Flags[Flag.Warning5] = false;
                        break;
                    case 5:
                        Flags[Flag.Warning6] = false;
                        break;
                }

                //break;
            }
            
            // If anyone is over early, put up individual flag
            for (var b = 0; b < YachtClub.Fleet.Length; b++)
            {
                if (YachtClub.Fleet[b].OnTheCourseSide)
                {
                    Flags[Flag.IndividualRecall] = true;
                }
            }

            if (!WorldTimer.Running)
            {
                //foreach(Flag f in Flags.Keys)
                //{
                //    if (f.ToString().Contains("Warning"))
                //    {
                //        if (Flags[f])
                //            Flags[f] = false;
                //        //if (Flags[Flag.Warning1])
                //        //    Flags[Flag.Warning1] = false;
                //    }
                //}
                if (RaceCommittee.Flags[Flag.Warning1])
                    RaceCommittee.Flags[Flag.Warning1] = false;
                if (RaceCommittee.Flags[Flag.Warning2])
                    RaceCommittee.Flags[Flag.Warning2] = false;
                if (RaceCommittee.Flags[Flag.Warning3])
                    RaceCommittee.Flags[Flag.Warning3] = false;
                if (RaceCommittee.Flags[Flag.Warning4])
                    RaceCommittee.Flags[Flag.Warning4] = false;
                if (RaceCommittee.Flags[Flag.Warning5])
                    RaceCommittee.Flags[Flag.Warning5] = false;
                if (RaceCommittee.Flags[Flag.Warning6])
                    RaceCommittee.Flags[Flag.Warning6] = false;
            }
        }
    }

    static  Set_X_Flag(startingClassIndex)
    {
        Flags[Flag.IndividualRecall] = false;

        var startClass = StartingClass[startingClassIndex];

        for(var b = 0; b < YachtClub.Fleet.Length; b++)
        {
            if (YachtClub.Fleet[b].startClass == startClass && YachtClub.Fleet[b].OnTheCourseSide)
            {
                Flags[Flag.IndividualRecall] = true;
                return;
            }
        }
    }

    static UpdateRacingStatistics()
    {
        fleetStatistics.Starters = {};
        fleetStatistics.Finishers = {};

        Object.keys(StartingClass).forEach((page) => {
            fleetStatistics.Starters[page] = 0;
            fleetStatistics.Finishers[page] = 0;
        });
        // foreach (sc in Enum.GetValues(typeof(StartingClass)))
        // {
        //     fleetStatistics.Starters[sc.ToString()] = 0;
        //     fleetStatistics.Finishers[sc.ToString()] = 0;
        // }

        for(var i = 0; i < YachtClub.Fleet.length; i++)
        //foreach(boat in YachtClub.Fleet)
        {
            var boat = YachtClub.Fleet[i];

            if (!boat.IsMoored)
            {
                if (boat.IsRacing || boat.IsStarting)
                {
                    if (fleetStatistics.Starters.ContainsKey(boat.startClass.ToString()))
                    {
                        var fleetMembers = Math.round(fleetStatistics.Starters[boat.startClass.ToString()]);
                        fleetStatistics.Starters[boat.startClass.ToString()] = fleetMembers+1;
                    }
                    else
                    {
                        fleetStatistics.Starters[boat.startClass.ToString()] = 1;
                    }
                }
                else if (boat.IsFinished)
                {
                    if (fleetStatistics.Finishers.ContainsKey(boat.startClass.ToString()))
                    {
                        var finished = Math.round(fleetStatistics.Finishers[boat.startClass.ToString()]);
                        fleetStatistics.Finishers[boat.startClass.ToString()] = finished+1;
                    }
                    else
                    {
                        fleetStatistics.Finishers[boat.startClass.ToString()] = 1;
                    }
                }
            }
        }
    }

    static BoatMatrix(tmpx, tmpy, windDirection)
    {
        var scale = (1.0 / Camera.Z);

        points = new Point[13];

        points[0].X = (tmpx + scale * BOAT_LENGTH * .4 * Math.cos(windDirection));
        points[0].Y = (tmpy + scale * BOAT_LENGTH * .4 * Math.sin(windDirection));
        Bow.X = points[0].X; Bow.Y = points[0].Y;
        points[1].X = (tmpx + scale * BOAT_LENGTH * .3 * Math.cos(windDirection + 0.5));
        points[1].Y = (tmpy + scale * BOAT_LENGTH * .3 * Math.sin(windDirection + 0.5));
        points[2].X = (tmpx + scale * BOAT_LENGTH * .25 * Math.cos(windDirection + 1));
        points[2].Y = (tmpy + scale * BOAT_LENGTH * .25 * Math.sin(windDirection + 1));
        points[3].X = (tmpx + scale * BOAT_LENGTH * .25 * Math.cos(windDirection + 1.57));
        points[3].Y = (tmpy + scale * BOAT_LENGTH * .25 * Math.sin(windDirection + 1.57));
        points[4].X = (tmpx + scale * BOAT_LENGTH * .3 * Math.cos(windDirection + 2.1));
        points[4].Y = (tmpy + scale * BOAT_LENGTH * .3 * Math.sin(windDirection + 2.1));
        points[5].X = (tmpx + scale * BOAT_LENGTH * .45 * Math.cos(windDirection + 2.7));
        points[5].Y = (tmpy + scale * BOAT_LENGTH * .45 * Math.sin(windDirection + 2.7));
        SternStarboard.X = points[5].X; SternStarboard.Y = points[5].Y;
        points[6].X = (tmpx + scale * BOAT_LENGTH * .4 * Math.cos(windDirection + 3.141));
        points[6].Y = (tmpy + scale * BOAT_LENGTH * .4 * Math.sin(windDirection + 3.141));
        points[7].X = (tmpx + scale * BOAT_LENGTH * .45 * Math.cos(windDirection + 3.6));
        points[7].Y = (tmpy + scale * BOAT_LENGTH * .45 * Math.sin(windDirection + 3.6));
        SternPort.X = points[7].X; SternPort.Y = points[7].Y;
        points[8].X = (tmpx + scale * BOAT_LENGTH * .3 * Math.cos(windDirection + 4.2));
        points[8].Y = (tmpy + scale * BOAT_LENGTH * .3 * Math.sin(windDirection + 4.2));
        points[9].X = (tmpx + scale * BOAT_LENGTH * .25 * Math.cos(windDirection + 4.7));
        points[9].Y = (tmpy + scale * BOAT_LENGTH * .25 * Math.sin(windDirection + 4.7));
        points[10].X = (tmpx + scale * BOAT_LENGTH * .25* Math.cos(windDirection + 5.3));
        points[10].Y = (tmpy + scale * BOAT_LENGTH * .25 * Math.sin(windDirection + 5.3));
        points[11].X = (tmpx + scale * BOAT_LENGTH * .3 * Math.cos(windDirection + 5.7));
        points[11].Y = (tmpy + scale * BOAT_LENGTH * .3 * Math.sin(windDirection + 5.7));
        points[12].X = (tmpx + scale * BOAT_LENGTH * .4 * Math.cos(windDirection));
        points[12].Y = (tmpy + scale * BOAT_LENGTH * .4 * Math.sin(windDirection));

        return points;
    }

    static BoatCockpit(tmpx, tmpy)
    {
        var scale = (1.0 / Camera.Z);

        var points = new Point[5];

        points[0].X = (tmpx + scale * BOAT_LENGTH * .25 * Math.cos(Weather.WindDirection(RaceCommittee.location) + 1.57));
        points[0].Y = (tmpy + scale * BOAT_LENGTH * .25 * Math.sin(Weather.WindDirection(RaceCommittee.location) + 1.57));
        points[1].X = (tmpx + scale * BOAT_LENGTH * .45 * Math.cos(Weather.WindDirection(RaceCommittee.location) + 2.7));
        points[1].Y = (tmpy + scale * BOAT_LENGTH * .45 * Math.sin(Weather.WindDirection(RaceCommittee.location) + 2.7));
        points[2].X = (tmpx + scale * BOAT_LENGTH * .4 * Math.cos(Weather.WindDirection(RaceCommittee.location) + 3.141));
        points[2].Y = (tmpy + scale * BOAT_LENGTH * .4 * Math.sin(Weather.WindDirection(RaceCommittee.location) + 3.141));
        points[3].X = (tmpx + scale * BOAT_LENGTH * .45 * Math.cos(Weather.WindDirection(RaceCommittee.location) + 3.6));
        points[3].Y = (tmpy + scale * BOAT_LENGTH * .45 * Math.sin(Weather.WindDirection(RaceCommittee.location) + 3.6));
        points[4].X = (tmpx + scale * BOAT_LENGTH * .25 * Math.cos(Weather.WindDirection(RaceCommittee.location) + 4.7));
        points[4].Y = (tmpy + scale * BOAT_LENGTH * .25 * Math.sin(Weather.WindDirection(RaceCommittee.location) + 4.7));

        return points;
    }

    static StartRaceSequence()
    {
        // Start a 5-minute race sequence
        WorldTimer.Start(5);
        startingSequenceType = StartingSequenceType.FiveMinute;

        // identify the fleet that just started if necessary.
        if (fleetCurrentlyStarting != null)
        {
            fleetsCurrentlyRacing.Add(fleetCurrentlyStarting);

            // Add race to RC Log
            Races[fleetCurrentlyStarting.Value].SetStartTime();

            // Monitor until all have started.
            ClassIsStarting = true;
        }

        // identify fleet currently in starting sequence.
        if (startOrder.Count == 0)
        {
            fleetCurrentlyStarting = null;

            var fndStarter = false;
            foreach (b in YachtClub.Fleet)
            {
                if (!b.IsStarting)
                {
                    fndStarter = true;
                    break;
                }
            }
            
            if (!fndStarter)
                ClassIsStarting = false;

            WorldTimer.Stop();
        }
        else
        {
            WorldTimer.Start(5);
            startingSequenceType = StartingSequenceType.FiveMinute;

            // identify the fleet that just started if necessary.
            if (fleetCurrentlyStarting != null)
            {
                // Monitor until all have started.
                ClassIsStarting = true;
            }

            var cntBoatsInStartingFleet = 0;
            foreach (boat in YachtClub.Fleet)
            {
                if (boat.startClass == startOrder[0])
                {
                    boat.BlackFlagged = false;
                    cntBoatsInStartingFleet++;
                    boat.skipper.WaitingForNextStart = false;
                }
            }

            lock (startOrder)
            {
                fleetCurrentlyStarting = StartingClass[startOrder[0]];
                startOrder.RemoveAt(0);
                CurrentRaceForFleet[fleetCurrentlyStarting.ToString()] = ++RaceNumber;
                LogRaceStart(fleetCurrentlyStarting.ToString(), cntBoatsInStartingFleet, OLYCSession, RaceNumber);

                Races[fleetCurrentlyStarting.Value] = new RaceStatus(CurrentRaceForFleet[fleetCurrentlyStarting.ToString()], fleetCurrentlyStarting.Value, DateTime.Now, cntBoatsInStartingFleet);
            }

            FleetCourse[fleetCurrentlyStarting] = new Course(Course.Courses.I);

            //CurrentRaceForFleet[fleetCurrentlyStarting.ToString()] = LogRaceStart(fleetCurrentlyStarting.ToString(), cntBoatsInStartingFleet);

            
            // GUN!
            Status = RaceCommitteStatus.FiveMinute;
            //Lighthouse.PlaySound(@".\audio\gunshot.wav");


            switch (StartSequence)
            {
                case World.StartSequence.Traditional:
                    Lighthouse.PlaySound(_StartAudio);
                    break;
                case World.StartSequence.Oscar:
                    for (var i = 0; i < 5; i++)
                    {
                        Lighthouse.PlaySound(_StartAudio);
                        System.Threading.Thread.Sleep(50);
                    }

                    break;
            }
        }
    }

    static LogRaceStart(Fleet, cntBoatsInStartingFleet, Session, racenum)
    {
/*
        try
        {
            using (SqlConnection conn = new SqlConnection(YachtClub._connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(@"
INSERT INTO races (Session, ID, DateSequenceStarted, Fleet, BoatsPrepared, BoatsFlagged, BoatsStarted, BoatsFinished) VALUES (@session, @ID, @starttime, @fleet, @prepared, 0, 0, 0) 
                ", conn))
                {
                    command.Parameters.AddWithValue("session", Session);
                    command.Parameters.AddWithValue("ID", racenum);
                    command.Parameters.AddWithValue("StartTime", DateTime.Now);
                    command.Parameters.AddWithValue("Fleet", Fleet);
                    command.Parameters.AddWithValue("prepared", cntBoatsInStartingFleet);

                    int res = command.ExecuteNonQuery();

                    if (res != 1)
                    {
                        Console.WriteLine("NO NO NO NO");
                    }
                }

                //return GetLastRaceID(Fleet);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Just ignore since we want to continue to train if MySQL Server isn't available:" + ex.Message);
        }
*/            
    }

    static LogRaceFinish( racenum)
    {
        /*
        try
        {
            using (SqlConnection conn = new SqlConnection(YachtClub._connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(@"
UPDATE races 
SET EndTime = @finishtime
WHERE ID = @raceid
", conn))
                {
                    command.Parameters.AddWithValue("finishtime", DateTime.Now);
                    command.Parameters.AddWithValue("raceid", racenum);

                    int res = command.ExecuteNonQuery();

                    if (res != 1)
                    {
                        Console.WriteLine("NO NO NO NO");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Just ignore since we want to continue to train if MySQL Server isn't available:" + ex.Message);
        }
        */
    }

    static LogMarkRounding(racenum, mark)
    {
        /*
        string CommandText = "";
        try
        {
            if (mark == RaceCommittee.WindwardMark)
                CommandText = @"UPDATE races SET AroundWindward = AroundWindward + 1 WHERE ID = @raceid";
            else if (mark == RaceCommittee.JibeMark1)
                CommandText = @"UPDATE races SET AroundJibe1 = AroundJibe1 + 1 WHERE ID = @raceid";
            else if (mark == RaceCommittee.JibeMark2)
                CommandText = @"UPDATE races SET AroundJibe2 = AroundJibe2 + 1 WHERE ID = @raceid";
            else if (mark == RaceCommittee.LeewardMark)
                CommandText = @"UPDATE races SET AroundLeeward = AroundLeeward + 1 WHERE ID = @raceid";
            
            using (SqlConnection conn = new SqlConnection(YachtClub._connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(CommandText, conn))
                {
                    
                    command.Parameters.AddWithValue("raceid", racenum);

                    int res = command.ExecuteNonQuery();

                    if (res != 1)
                    {
                        Console.WriteLine("NO NO NO NO");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Just ignore since we want to continue to train if MySQL Server isn't available:" + ex.Message);
        }
        */
    }

    static GetLastRaceID(Fleet)
    {
        var res = -1;

        /*
        try
        {
            //using (MySqlConnection connection = new MySqlConnection("server=localhost;User Id=fmgUser;password=slsc1712;database=fmg"))
            using (SqlConnection connection = new SqlConnection("Data Source=onlineyachtclub.com;Initial Catalog=onlineya_htclub;Persist Security Info=True;User ID=onlin_admin;Password=!Slsc1712"))
            {
                connection.Open();
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = @"
SELECT COALESCE(ID, 0) FROM races 
WHERE Fleet = @fleet 
ORDER BY ID DESC
LIMIT 1 
                ";
                    command.Parameters.AddWithValue("Fleet", Fleet);

                    res = command.ExecuteScalar();

                    if (res == null)
                    {
                        return -1;
                    }
                }

                return Convert.ToInt32(res);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Just ignore since we want to continue to train if MySQL Server isn't available:" + ex.Message);
            return -1;
        }
        */
    }

    static AcknowledgeFinish(BoatNumber)
    {
        Races[YachtClub.Fleet[BoatNumber].startClass].AddFinisher(CurrentRaceForFleet[YachtClub.Fleet[BoatNumber].startClass.ToString()], OLYCSession);
        Races[YachtClub.Fleet[BoatNumber].startClass]._TicksMostRecentFinisher = YachtClub.TicksSinceBigBang;

        //Lighthouse.PlaySound(@"audio\Applause.wav");
    }

    static SayHi()
    {
        Console.WriteLine("TEST FROM RC");
    }

    static IsStarting(startingClass)
    {
        if (!WorldTimer.Running && (StartingClass[startOrder[0]] == startingClass))
            return true;
        else
            return fleetCurrentlyStarting == startingClass;
    }

    static IsRacing(startingClass)
    {
        return fleetsCurrentlyRacing.Contains(startingClass);
    }

    static IsWaitingToStart(startingClass)
    {
        if (startOrder.Count == 0)
            return false;
        if (!WorldTimer.Running && (StartingClass[startOrder[0]]) == startingClass)
            return false;
        else 
            return startOrder.Contains(startingClass);
    }

    static SecondsUntilStartForClass(startingClass, isfinished, isstarting, iswaiting)
    {
        var seqlen = 0;
        if (RaceCommittee.startingSequenceType == StartingSequenceType.FiveMinute)
            seqlen = 5;
        else if (RaceCommittee.startingSequenceType == StartingSequenceType.ThreeMinute)
            seqlen = 3;
        else
            throw new Exception("BAD STARTING SEQUENCE LENGTH");

        if (iswaiting)
        {
            var seco = 0;
            if (WorldTimer.Running)
                seco = WorldTimer.SecondsRemaining + WorldTimer.MinutesRemaining * 60;

            if (startOrder.Contains(startingClass))
                return seqlen * 60 * (startOrder.IndexOf(startingClass) + 1) + seco;
            else
                return seqlen * 60 * Math.Max(1, startOrder.Count) + seco;
        }

        if (RaceCommittee.startOrder.Count == 0 && RaceCommittee.fleetCurrentlyStarting == null)
        {
            if (isfinished && !isstarting )
                return seqlen * 60;
            else
                return 0;
        }

        if (!WorldTimer.Running && StartingClass[RaceCommittee.startOrder[0]] == startingClass)
            return seqlen * 60;
        else if (fleetsCurrentlyRacing.Contains(startingClass))
            return 0;
        else if (fleetCurrentlyStarting == startingClass)
            return WorldTimer.MinutesRemaining * 60 + WorldTimer.SecondsRemaining;
        else if (fleetCurrentlyStarting == null && StartingClass[RaceCommittee.startOrder[0]] == startingClass)
            return (seqlen * 60);
        else if (WorldTimer.Running)
        {
            if (StartingClass[RaceCommittee.startOrder[0]] == startingClass)
                return (WorldTimer.MinutesRemaining * 60 + WorldTimer.SecondsRemaining) + (seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[1]] == startingClass)
                return (WorldTimer.MinutesRemaining * 2 * 60 + WorldTimer.SecondsRemaining) + (seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[2]] == startingClass)
                return (WorldTimer.MinutesRemaining * 3 * 60 + WorldTimer.SecondsRemaining) + (seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[3]] == startingClass)
                return (WorldTimer.MinutesRemaining * 4 * 60 + WorldTimer.SecondsRemaining) + (seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[4]] == startingClass)
                return (WorldTimer.MinutesRemaining * 5 * 60 + WorldTimer.SecondsRemaining) + (seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[5]] == startingClass)
                return (WorldTimer.MinutesRemaining * 6 * 60 + WorldTimer.SecondsRemaining) + (seqlen * 60);
            else
                throw new Exception("NEED MORE STARTING SEQUENCES (i)");
        }
        else // only here when timer is't running
        {
            if (StartingClass[RaceCommittee.startOrder[0]] == startingClass)
                return (seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[1]] == startingClass)
                return (2 * seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[2]] == startingClass)
                return (3 * seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[3]] == startingClass)
                return (4 * seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[4]] == startingClass)
                return (5 * seqlen * 60);
            else if (StartingClass[RaceCommittee.startOrder[5]] == startingClass)
                return (6 * seqlen * 60);
            else
                throw new Exception("NEED MORE STARTING SEQUENCES (ii)");
        }
    }

    static NotificationMarkRounding( BoatNumber, startingClass, mark)
    {
        LogMarkRounding(CurrentRaceForFleet[startingClass.ToString()], mark);

        // if we haven't logged ticks when first boat in fleet rounded mark, then log it now
        if (!Races[startingClass]._AroundMark.ContainsKey(mark))
        {
            Races[startingClass]._AroundMark[mark] = YachtClub.TicksSinceBigBang;
        //}
        //else
        //{
            // flag any boats that are behind a full leg, excluding first leg (use time limit there), and finish leg since it is shorter than the rest.
            foreach (boat in YachtClub.Fleet)
            {
                if (boat.startClass == startingClass)
                {
                    if (mark == StartingMark)
                    {
                        if (boat.IsFinished && boat.IsStarting)
                        {
                            FlagCupcake(boat);
                        }
                    }
                    if (mark == JibeMark1)
                    {
                        if (!boat.HasRoundedWeatherMark)
                        {
                            FlagCupcake(boat);
                            //boat.skipper.Relax(boat.BoatNumber);
                            //Races[boat.startClass].BlackFlag();
                            //boat.BlackFlagged = true;
                        }
                    }
                    else if (mark == JibeMark2)
                    {
                        if (!boat.HasRoundedJibeMark1)
                        {
                            FlagCupcake(boat);
                            //boat.skipper.Relax(boat.BoatNumber);
                            //Races[boat.startClass].BlackFlag();
                            //boat.BlackFlagged = true;
                        }
                    }
                    else if (mark == LeewardMark)
                    {
                        if (!boat.HasRoundedJibeMark2)
                        {
                            FlagCupcake(boat);
                            //boat.skipper.Relax(boat.BoatNumber);
                            //Races[boat.startClass].BlackFlag();
                            //boat.BlackFlagged = true;
                        }
                    }
                }
            }
        }
    }

    static FlagCupcake( boat)
    {
        if (!boat.BlackFlagged)
        {
            boat.skipper.Relax(boat.BoatNumber);
            Races[boat.startClass].BlackFlag();
            boat.BlackFlagged = true;
        }
    }
}