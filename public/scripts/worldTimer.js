class WorldTimer
{
    constructor()
    {
        WorldTimer.Running = false;
        WorldTimer.StartTime;
        WorldTimer.ElapsedTicks;
        WorldTimer.ElapsedMilliseconds, ElapsedMinutes, ElapsedSeconds, MinutesRemaining, SecondsRemaining, MinutesInStartingSequence;
        WorldTimer.FramesRemainingThisSecond;
        WorldTimer.FramesPerSecond = 1000 / YachtClub.MILLISECONDS_PER_FRAME;
    }

    static Start(_MinutesUntilStart)
    {
        WorldTimer.MinutesRemaining = _MinutesUntilStart;
        WorldTimer.MinutesInStartingSequence = _MinutesUntilStart;
        WorldTimer.FramesRemainingThisSecond = WorldTimer.FramesPerSecond;
        WorldTimer.StartTime = YachtClub.TicksSinceBigBang;
        WorldTimer.Running = true;
        WorldTimer.Reset();
    }

    static Reset()
    {
        WorldTimer.ElapsedTicks = 0;
        WorldTimer.ElapsedMilliseconds = 0;
        WorldTimer.ElapsedMinutes = 0;
        WorldTimer.ElapsedSeconds = 0;
        WorldTimer.FramesRemainingThisSecond = WorldTimer.FramesPerSecond;

        WorldTimer.MinutesRemaining = WorldTimer.MinutesInStartingSequence;
        WorldTimer.SecondsRemaining = 0;
    }

    static Tick()
    {
        if (WorldTimer.Running)
        {
            if (WorldTimer.FramesRemainingThisSecond-- < 0)
            WorldTimer.FramesRemainingThisSecond = WorldTimer.FramesPerSecond;

            // If clock is at zero
            if (WorldTimer.ElapsedTicks++ == WorldTimer.MinutesInStartingSequence * 60 * (1000 / YachtClub.MILLISECONDS_PER_FRAME))
            {
                RaceCommittee.StartRaceSequence();
                return;
            }

            // 1 tick is YachtClub.MILLISECONDS_PER_FRAME
            //ElapsedMilliseconds = ElapsedTicks * YachtClub.MILLISECONDS_PER_FRAME;
            WorldTimer.ElapsedMilliseconds += YachtClub.MILLISECONDS_PER_FRAME;
            WorldTimer.ElapsedSeconds = WorldTimer.ElapsedMilliseconds / 1000;
            //PureElapsedSeconds = ElapsedSeconds; // seconds before we mod 60 later

            WorldTimer.ElapsedMinutes = (WorldTimer.ElapsedSeconds / 60);
            WorldTimer.ElapsedSeconds -= WorldTimer.ElapsedMinutes * 60;

            WorldTimer.MinutesRemaining = WorldTimer.MinutesInStartingSequence - (WorldTimer.ElapsedMinutes + 1);
            WorldTimer.SecondsRemaining = (WorldTimer.MinutesInStartingSequence * 60 - WorldTimer.ElapsedSeconds) % 60;

            if (WorldTimer.SecondsRemaining == 0)
            {
                WorldTimer.MinutesRemaining++;
                WorldTimer.SecondsRemaining = 0;
            }
        }
    }

    static Stop()
    {
        WorldTimer.Running = false;
        WorldTimer.Reset();
    }

    static TimeString()
    {
        return WorldTimer.MinutesRemaining.ToString().PadLeft(2, '0') + ":" + SecondsRemaining.ToString().PadLeft(2, '0');
    }
}
