using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prachin_Bangpakong.Models
{
    public class DataWater
    {
        public string DataCodeStation { get; set; }
        public string DataDo { get; set; }
        public string DataConductivity { get; set; }
        public string pH { get; set; }
        public string Temp { get; set; }
        public string Salinity { get; set; }
        public string Level_water { get; set; }
        public string Flow { get; set; }
        public string On_Datetime { get; set; }
        public string TDS { get; set; }
        public string velocity { get; set; }
        public string On_Date { get; set; }
        public string On_time { get; set; }
        public string Velocity { get; set; }
        public string Area { get; set; }
        public string StatusDoChage { get; set; }
        public string StatusConductivityChage { get; set; }
        public string StatuspHChage { get; set; }
        public string StatusTempChage { get; set; }
        public string StatusSalinityChage { get; set; }
        public string StatusLevelWaterChage { get; set; }
        public string StatusFlowChage { get; set; }
        public string StatusVelocityChage { get; set; }
        public string StatusSolutionChage { get; set; }

        public string stationName { get; set; }
        public string stationLat { get; set; }
        public string stationLong { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string address3 { get; set; }
        public string Entrance { get; set; }
        public string StatusShow { get; set; }

        public int stationID { get; set; }
        public string Codestation { get; set; }
        public int countnum { get; set; }
        public string content { get; set; }
        public string length { get; set; }

        public string MinDo { get; set; }
        public string MaxDo { get; set; }
        public string MinConductivity { get; set; }
        public string MaxConductivity { get; set; }
        public string MinpH { get; set; }
        public string MaxpH { get; set; }
        public string MinTemp { get; set; }
        public string MaxTemp { get; set; }
        public string MinSalinity { get; set; }
        public string MaxSalinity { get; set; }
        public string MinSolution { get; set; }
        public string MaxSolution { get; set; }
        public string MinLevel_water { get; set; }
        public string MaxLevel_water { get; set; }
        public string MinFlow { get; set; }
        public string MaxFlow { get; set; }
        public string MinVelocity { get; set; }
        public string MaxVelocity { get; set; }


        public string HLD_Installed { get; set; }
        public string HL4_Installed { get; set; }




    }
}