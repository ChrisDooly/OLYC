class Mooring
{
    constructor(x, y)
    {
        Mooring.anchor;
        Mooring.mooring_ball;
        Mooring.moored_to_boat_number;

        Mooring.anchor = new Point(x, y);
        Mooring.mooring_ball = new Point(x, y);
    }

    static MoorBoat(BoatNumber)
    {
        if (BoatNumber)
        {
            Mooring.moored_to_boat_number = BoatNumber.Value;
            YachtClub.Fleet[BoatNumber.Value].IsMoored = true;
            YachtClub.Fleet[BoatNumber.Value].Autopilot = false;
            //YachtClub.Fleet[BoatNumber.Value].skipper.Status = SkipperStatus.Moored;
            YachtClub.Fleet[BoatNumber.Value].skipper.thirtyMinuteStatus = Skipper.ThirtyMinuteStatus.Moored;
            YachtClub.Fleet[BoatNumber.Value].X = mooring_ball.X;
            YachtClub.Fleet[BoatNumber.Value].Y = mooring_ball.Y;
            YachtClub.Fleet[BoatNumber.Value].heading = Weather.WindDirection(YachtClub.Fleet[BoatNumber.Value].location);// +Math.PI;
            YachtClub.Fleet[BoatNumber.Value].offwind = 0;
            YachtClub.Fleet[BoatNumber.Value].SheetingAngle = Weather.WindDirection(YachtClub.Fleet[BoatNumber.Value].location) + Math.PI;
            YachtClub.Fleet[BoatNumber.Value].location = new PointF(mooring_ball.X, mooring_ball.Y);
            YachtClub.Fleet[BoatNumber.Value].velocity = 0;
            YachtClub.Fleet[BoatNumber.Value].mainSailStatus = MainSailStatus.Down;
            YachtClub.Fleet[BoatNumber.Value].jibStatus = JibStatus.Down;
        }
        else
            moored_to_boat_number = null;

    }

    static Update()
    {
        if (moored_to_boat_number == null)
        {
            mooring_ball.X = anchor.X + 5 * Math.Cos(Weather.WindDirection(new PointF(anchor.X, anchor.Y)));
            mooring_ball.Y = anchor.Y + 5 * Math.Sin(Weather.WindDirection(new PointF(anchor.X, anchor.Y)));
        }
        else
        {
            // there's a boat on the mooring
            target = new Point(anchor.X + 100 * Math.Cos(Weather.WindDirection(new PointF(anchor.X, anchor.Y))), anchor.Y + 100 * Math.Sin(Weather.WindDirection(new PointF(anchor.X, anchor.Y))));
            diff = new Point(target.X - mooring_ball.X, target.Y - mooring_ball.Y);

            mooring_ball.X = mooring_ball.X + diff.X * .0001;
            mooring_ball.Y = mooring_ball.Y + diff.Y * .0001;
        }
    }
}
