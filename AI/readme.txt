
3/20/2018 - Meteorological data loaded for 2018 Buzzards Bay buoy
    a) link: http://www.ndbc.noaa.gov/view_text_file.php?filename=buzm3h2017.txt.gz&dir=data/historical/stdmet/
    b) header (for reference)
        #YY  MM DD hh mm WDIR WSPD GST  WVHT   DPD   APD MWD   PRES  ATMP  WTMP  DEWP  VIS  TIDE
        #yr  mo dy hr mn degT m/s  m/s     m   sec   sec degT   hPa  degC  degC  degC   mi    ft
    c) modify header and import into Excel to create csv. 
        use header: YY   MM DD hh mm DIR SPD  GST  WVHT  DPD   APD   MWD PRES     TMP WTMP  DEWP  VIS  TIDE
    d) import: mongoimport --host=127.0.0.1 -d weather -c weather2017 --type csv --file c:\users\murphy\documents\javascript\SkippersMeeting\weather\weather2017BuzzardsBay.csv --headerline

3/22/2018 - Loaded polars from https://distantshores.ca/boatblog_files/sailing-polar-performance.php
    a) change degrees to radians then save with degrees, windspeed and maxv.  
    b) save as csv
    d) import: mongoimport --host=127.0.0.1 -d ai -c boatspeed --type csv --file c:\users\murphy\documents\javascript\SkippersMeeting\weather\SailboatPolarChartRadians.csv --headerline

