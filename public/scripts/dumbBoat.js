class DumbBoat
{
    constructor( _boatNumber,  _x,  _y,  _lastx,  _lasty,  _IsTacking,  _IsJibing,  _velocity,  _heading,  _offwind,  _DesiredHeadingAfterTackOrJibe)
    {
        this.deltaX = 0;
        this.deltaY = 0;
        this.DesiredHeadingAfterTackOrJibe = 0;
        this.changeTack = null;

        this.BoatNumber = _boatNumber;

        this.x = _x;
        this.y = _y;
        this.lastx = _lastx;
        this.lasty = _lasty;

        this.IsTacking = _IsTacking;
        this.IsJibing = _IsJibing;

        this.velocity = _velocity;
        this.heading = _heading;

        this.offwind = _offwind;

        // if we are tacking or jibing we need to know when to stop.
        this.DesiredHeadingAfterTackOrJibe = this._DesiredHeadingAfterTackOrJibe;
    }

    PortEvent()
    {
        this.heading -= .02 * (Math.max(0.2, this.velocity) / Math.max(this.velocity, 1.0));
    }

    StarboardEvent()
    {
        this.heading += .02 * (Math.max(0.2, this.velocity) / Math.max(this.velocity, 1.0));
    }

    Update()
    {
        Update(Convert.ToInt32(BoatHandlingEvent.None));
    }

    /// <summary>
    /// Simulate the next N seconds of action for the fleet using DumbBoat's
    /// </summary>
    Update(BHevent)
    {
        if (this.BoatNumber == 0)
            console.log("The Hook");

        var boatHandlingEvent = BHevent;

        if(this.IsTacking)
        {
            this.velocity = (this.velocity * .98);
            this.changeTack = offwind - DesiredHeadingAfterTackOrJibe;
            if (this.changeTack > Sailboat.TackIncrement)
            {
                //UPGRADE_WARNING: Data types in Visual C# might be different.  Verify the accuracy of narrowing conversions. "ms-help://MS.VSCC.v80/dv_commoner/local/redirect.htm?index='!DefaultContextWindowIndex'&keyword='jlca1042'"
                this.changeTack = Sailboat.TackIncrement * Math.max(0.5, Math.Abs(Math.min(this.velocity, 3.0) / 3.0));
            }
            else
            {
                if (this.changeTack < -Sailboat.TackIncrement)
                {
                    //UPGRADE_WARNING: Data types in Visual C# might be different.  Verify the accuracy of narrowing conversions. "ms-help://MS.VSCC.v80/dv_commoner/local/redirect.htm?index='!DefaultContextWindowIndex'&keyword='jlca1042'"
                    this.changeTack = (-Sailboat.TackIncrement) * Math.max(0.5, Math.Abs(Math.min(this.velocity, 3.0) / 3.0));
                }
            }
            this.offwind -= this.changeTack;

            this.offwind = thresholdWithin2PI(this.offwind);

            if (this.offwind == this.DesiredHeadingAfterTackOrJibe)
            {
                this.IsTacking = false;
            }

            this.heading = thresholdWithin2PI(Weather.WindDirection(new Point(x, y)) + this.offwind);

            this.deltaX = this.velocity * Math.Cos(this.heading);
            this.deltaY = this.velocity * Math.Sin(this.heading);
        }
        else if (this.IsJibing)
        {
            this.velocity = (this.velocity * .99);

            this.changeTack = this.offwind - this.DesiredHeadingAfterTackOrJibe;
            if (this.changeTack > Sailboat.JibeIncrement)
            {
                //UPGRADE_WARNING: Data types in Visual C# might be different.  Verify the accuracy of narrowing conversions. "ms-help://MS.VSCC.v80/dv_commoner/local/redirect.htm?index='!DefaultContextWindowIndex'&keyword='jlca1042'"
                this.changeTack = Sailboat.JibeIncrement * Math.max(0.5, Math.Abs(Math.min(this.velocity, 3.0) / 3.0));
            }
            else
            {
                if (this.changeTack < -Sailboat.JibeIncrement)
                {
                    //UPGRADE_WARNING: Data types in Visual C# might be different.  Verify the accuracy of narrowing conversions. "ms-help://MS.VSCC.v80/dv_commoner/local/redirect.htm?index='!DefaultContextWindowIndex'&keyword='jlca1042'"
                    this.changeTack = (-Sailboat.JibeIncrement) * Math.max(0.5, Math.Abs(Math.min(this.velocity, 3.0) / 3.0));
                }
            }

            if (this.offwind * this.DesiredHeadingAfterTackOrJibe < 0)
            {
                this.offwind += this.changeTack;
            }
            else
            {
                this.offwind -= this.changeTack;
            }
            if (this.offwind == this.DesiredHeadingAfterTackOrJibe)
            {
                this.IsJibing = false;
            }
            this.offwind = thresholdWithin2PI(this.offwind);

            this.heading = thresholdWithin2PI(Weather.WindDirection(new Point(this.x, this.y)) + this.offwind);

            this.deltaX = this.velocity * Math.cos(this.heading);
            this.deltaY = this.velocity * Math.sin(this.heading);
        }
        else 
        {
            // use previouse delta
            //
            switch (this.boatHandlingEvent)
            {
                case BoatHandlingEvent.Tack:
                    this.IsTacking = true;
                    this.DesiredHeadingAfterTackOrJibe = -this.heading;
                    this.deltaX = this.x - this.lastx;
                    this.deltaY = this.y - this.lasty;
                    break;
                case BoatHandlingEvent.Jibe:
                    this.IsJibing = true;
                    this.DesiredHeadingAfterTackOrJibe = -this.heading;
                    this.deltaX = x - this.lastx;
                    this.deltaY = y - this.lasty;
                    break;
                case BoatHandlingEvent.ToPort:
                    PortEvent();

                    this.deltaX = this.velocity * Math.Cos(this.heading);
                    this.deltaY = this.velocity * Math.Sin(this.heading);

                    break;
                case BoatHandlingEvent.ToStarboard:
                    StarboardEvent();

                    this.deltaX = this.velocity * Math.Cos(this.heading);
                    this.deltaY = this.velocity * Math.Sin(this.heading);

                    break;
                case BoatHandlingEvent.None:
                    this.deltaX = this.x - this.lastx;
                    this.deltaY = this.y - this.lasty;
                    break;
            }
        }
        this.lastx = this.x;
        this.lasty = this.y;
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    DistanceToPoint(x1, y1)
    {
        return Math.sqrt(Math.pow(this.x - x1, 2.0) + Math.pow(this.y - y1, 2.0));
    }

    VMG(time, j)
    {
        return Radar.FleetDistanceMatrix[time, this.BoatNumber, j] - Radar.LastFleetDistanceMatrix[time, this.BoatNumber, j];
    }
}