3/20/2018 - Wind data loaded for 2017 from Buzzards Bay buoy.
    a) link: http://www.ndbc.noaa.gov/download_data.php?filename=buzm3c2017.txt.gz&dir=data/historical/cwind/
    b) download wind data buzm3h2017.txt 
    c) use Excel to create csv file. Drop one of the header lines and change the other to:
        YY   MM DD hh mm DIR SPD  GDR GST  TIME
    d) import into mongodb.
        1) create data\db folder in the project folder.
        2) launch mongo via: mongod --storageEngine=mmapv1 --dbpath .
        3) import: mongoimport --host=127.0.0.1 -d weather -c wind2017 --type csv --file c:\users\murphy\documents\javascript\SkippersMeeting\weather\wind2017BuzzardsBay.csv --headerline

3/20/2018 - Meteorological data loaded for 2018 Buzzards Bay buoy
    a) link: http://www.ndbc.noaa.gov/view_text_file.php?filename=buzm3h2017.txt.gz&dir=data/historical/stdmet/
    b) header (for reference)
        #YY  MM DD hh mm WDIR WSPD GST  WVHT   DPD   APD MWD   PRES  ATMP  WTMP  DEWP  VIS  TIDE
        #yr  mo dy hr mn degT m/s  m/s     m   sec   sec degT   hPa  degC  degC  degC   mi    ft
    c) modify header and import into Excel to create csv. 
        use header: YY   MM DD hh mm DIR SPD  GST  WVHT  DPD   APD   MWD PRES     TMP WTMP  DEWP  VIS  TIDE
    d) import: mongoimport --host=127.0.0.1 -d weather -c weather2017 --type csv --file c:\users\murphy\documents\javascript\SkippersMeeting\weather\weather2017BuzzardsBay.csv --headerline

3/22/2018 - Loaded polars from https://distantshores.ca/boatblog_files/sailing-polar-performance.php

