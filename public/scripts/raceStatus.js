class RaceStatus
{
    constructor(ID, Fleet, sequenceStarted, BoatsPrepared)
    {
        this._id;
        this._fleet;
        this._SequenceStarted;
        this._RaceStarted;
        this._TicksFirstFinisher;
        this._TicksMostRecentFinisher;
        this._AroundMark = {};
        this._LastFinisher;
        this._BoatsPrepared = 0;
        this._BoatsStarted = 0;
        this._BoatsFinished = 0;
        this._BoatsBlackFlagged = 0;
        this._course;
        this.fleetCurrentlyStarting;
        this.dateTime;
        this.cntBoatsInStartingFleet;
        this.course;
    }
    
    RaceStatus()
    {
        this._id = ID;
        this._fleet = Fleet;
        this._SequenceStarted = sequenceStarted;
        this._BoatsPrepared = BoatsPrepared;
        this._TicksFirstFinisher = 0;
    }

    AddFinisher(racenum, OLYCSession)
    {
        if (this._BoatsFinished == 0)
            this._TicksFirstFinisher = YachtClub.TicksSinceBigBang;

        this._BoatsFinished++;

        /*
        try
        {
            using (SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(@"
UPDATE races 
SET BoatsFinished = @finishers
WHERE ID = @raceid
", conn))
                {
                    command.Parameters.AddWithValue("finishers", _BoatsFinished);
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

    AddStarter()
    {
        this._BoatsStarted++;

        /*
        try
        {
            using (SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(@"
UPDATE races 
SET BoatsStarted = @starters
WHERE ID = @raceid
                ", conn))
                {
                    command.Parameters.AddWithValue("raceid", _id);
                    command.Parameters.AddWithValue("starters", _BoatsStarted);

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

    SetStartTime()
    {
        /*
        try
        {
            using (SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand command = conn.CreateCommand())
                {
                    command.CommandText = @"
UPDATE races 
SET StartTime = GetDate()
WHERE ID = @raceid
                ";
                    command.Parameters.AddWithValue("raceid", _id);

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

    BlackFlag()
    {
        /*
        try
        {
            _BoatsBlackFlagged++;

            //using (MySqlConnection connection = new MySqlConnection("server=localhost;User Id=fmgUser;password=slsc1712;database=fmg"))
            //using (MySqlConnection connection = new MySqlConnection("Data Source=onlineyachtclub.com;Initial Catalog=onlineya_htclub;Persist Security Info=True;User ID=onlin_admin;Password=!Slsc1712"))
            using (SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                conn.Open();
                using (SqlCommand command = conn.CreateCommand())
                {
                    command.CommandText = @"
UPDATE races 
SET BoatsFlagged = @flagged
WHERE ID = @raceid
                ";
                    command.Parameters.AddWithValue("raceid", _id);
                    command.Parameters.AddWithValue("flagged", _BoatsBlackFlagged);

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

    static GetMaxRaceID()
    {
        /*
        try
        {
            using (SqlConnection conn = new SqlConnection(YachtClub._connectionString))
            {
                conn.Open();
                using (SqlCommand command = conn.CreateCommand())
                {
                    command.CommandText = @"
SELECT COALESCE(MAX(ID), -1) 
FROM races 
                ";
                    object res = command.ExecuteScalar();

                    return Convert.ToInt32(res);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Just ignore since we want to continue to train if MySQL Server isn't available:" + ex.Message);
            return -1;
        }
        */
       return -1;
    }
}