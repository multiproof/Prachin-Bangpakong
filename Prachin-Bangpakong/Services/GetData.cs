using Prachin_Bangpakong.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Prachin_Bangpakong.Services
{
    public class GetData
    {
        public static List<DataWater> GetDataWater(string fromdate,string todate)
        {
            System.IFormatProvider format = new System.Globalization.CultureInfo("en-US");
            System.Globalization.CultureInfo cultureinfo = new System.Globalization.CultureInfo("en-US");

            string connection = ConnectionDB.Constring();

            string tabletype = string.Empty;
            string[] typedate = new string[3];
            string orderby = string.Empty;
            string code = string.Empty;
            string query = string.Empty;
            typedate[0] = "DatetimeServer";
            typedate[1] = "Data_Date";
            typedate[2] = "Data_Time";

            DateTime dt1 = new DateTime();
            DateTime dt2 = new DateTime();
            if (fromdate != "-")
            {

                dt1 = DateTime.Parse(fromdate, null);
            }


            if (todate != "-")
            {
                dt2 = DateTime.Parse(todate, null);
            }


            query = "select * from( ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP01 order by DatetimeServer desc) tb1 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP02 order by DatetimeServer DESC) tb2 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP03 order by DatetimeServer desc) tb3 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP04 order by DatetimeServer DESC) tb4 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP05 order by DatetimeServer desc) tb5 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP06 order by DatetimeServer DESC) tb6 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP07 order by DatetimeServer desc) tb7 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP08 order by DatetimeServer DESC) tb8 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,[length],Area,StatusDoChage,StatusConductivityChage,StatuspHChage,StatusTempChage,StatusSalinityChage,StatusFlowChage,StatusVelocityChage,StatusSolutionChage,StatusLevelWaterChage  from (select top(1) *,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time from Tb_SP09 order by DatetimeServer DESC) tb9 ";
            query += " ) as b ";
            query += " left join station on b.SerialSim = station.SerialSim ";
            query += " order by Codestation asc";





            SqlConnection conn = new SqlConnection(connection);
            conn.Open();

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            DataTable dt = new DataTable();


            List<DataWater> Data_water = new List<DataWater>();
            while (datareader.Read())
            {
                DataWater dw = new DataWater();

                //dw.DataCodeStation = datareader["CodeStation"].ToString();
                dw.Entrance = datareader["Entrance"].ToString();
                dw.address1 = datareader["Address1"].ToString();
                dw.address1 = datareader["Address2"].ToString();
                dw.address1 = datareader["Address3"].ToString();
                dw.StatusDoChage = datareader["StatusDoChage"].ToString();
                dw.StatusConductivityChage = datareader["StatusConductivityChage"].ToString();
                dw.StatuspHChage = datareader["StatuspHChage"].ToString();
                dw.StatusTempChage = datareader["StatusTempChage"].ToString();
                dw.StatusSalinityChage = datareader["StatusSalinityChage"].ToString();
                dw.StatusSolutionChage = datareader["StatusSolutionChage"].ToString();
                dw.StatusFlowChage = datareader["StatusFlowChage"].ToString();
                dw.StatusVelocityChage = datareader["StatusVelocityChage"].ToString();
                dw.StatusLevelWaterChage = datareader["StatusLevelWaterChage"].ToString();
                dw.DataDo = String.Format("{0:0.00}", Convert.ToDouble(datareader["Do"].ToString()));
                dw.DataConductivity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Conductivity"].ToString()));
                dw.pH = String.Format("{0:0.00}", Convert.ToDouble(datareader["pH"].ToString()));
                dw.Temp = String.Format("{0:0.0}", Convert.ToDouble(datareader["Temp"].ToString()));
                dw.Salinity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Salinity"].ToString()));
                dw.Level_water = String.Format("{0:0.00}", Convert.ToDouble(datareader["Level_water"].ToString()));
                dw.Flow = String.Format("{0:0.00}", Convert.ToDouble(datareader["Flow"].ToString()));

                dw.TDS = String.Format("{0:0.00}", Convert.ToDouble(datareader["Solution"].ToString()));
                dw.velocity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Velocity"].ToString()));
                dw.On_Date = datareader["On_Date"].ToString();
                dw.On_time = datareader["On_time"].ToString();
                dw.address1 = datareader["address1"].ToString();
                dw.address2 = datareader["address2"].ToString();
                dw.address3 = datareader["address3"].ToString();
                dw.Entrance = datareader["Entrance"].ToString();
                dw.Codestation = datareader["Codestation"].ToString();
                dw.StatusShow = datareader["StatusShow"].ToString();



                DateTime a = DateTime.Parse(datareader["DatetimeServer"].ToString(), null);

                dw.On_Datetime = a.ToString("dd/MM/yyyy", cultureinfo);

                string[] setstationname = new string[2];
                setstationname = datareader["StationName"].ToString().Split('ี');

                try
                {
                    dw.stationName = setstationname[1];
                }
                catch
                {
                }


                Data_water.Add(dw);
            }
            conn.Close();

            return Data_water;
        }

        public static List<DataWater> GetDataStation(string codestation)
        {
            List<DataWater> datawater = new List<DataWater>();
            string connection = ConnectionDB.Constring();
            string query = "select * from station where codestation = '"+ codestation + "'";
            SqlConnection conn = new SqlConnection(connection);
            conn.Open();

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            DataTable dt = new DataTable();
            while (datareader.Read())
            {
                DataWater dw = new DataWater();

                //dw.DataCodeStation = datareader["CodeStation"].ToString();
                dw.stationLat = datareader["Lat"].ToString();
                dw.stationLong = datareader["Long"].ToString();
                dw.address1 = datareader["address1"].ToString();
                dw.address2 = datareader["address2"].ToString();
                dw.address3 = datareader["address3"].ToString();
                dw.Entrance = datareader["Entrance"].ToString();
                dw.Codestation = datareader["Codestation"].ToString();

                dw.stationName = datareader["StationName"].ToString();

                


                datawater.Add(dw);
            }
            return datawater;
        }

        public static List<multiselect> GetParameters()
        {
            List<multiselect> para = new List<multiselect>();
            para.Add(new multiselect { idselect = "Do", textselect = "ออกซิเจนในน้ำ" });
            para.Add(new multiselect { idselect = "pH", textselect = "กรด - ด่าง" });
            para.Add(new multiselect { idselect = "Conductivity", textselect = "ความนำไฟฟ้า" });
            para.Add(new multiselect { idselect = "Temp", textselect = "อุณหภูมิ" });
            para.Add(new multiselect { idselect = "Salinity", textselect = "ความเค็ม" });
            para.Add(new multiselect { idselect = "Solution", textselect = "สารละลาย" });
            para.Add(new multiselect { idselect = "Level_water", textselect = "ระดับน้ำ" });
            para.Add(new multiselect { idselect = "Flow", textselect = "อัตราการไหล" });
            para.Add(new multiselect { idselect = "Velocity", textselect = "อัตราความเร็ว" });
            
            return para;
        }

        public static List<DataWater> Getstation()
        {
            List<DataWater> dataWater = new List<DataWater>();
            dataWater.Add(new DataWater { Codestation = "SP01", stationName = "วัดบางคาง" });
            dataWater.Add(new DataWater { Codestation = "SP02", stationName = "วัดมูลเหล็ก" });
            dataWater.Add(new DataWater { Codestation = "SP03", stationName = "สะพานโยธะกา" });
            dataWater.Add(new DataWater { Codestation = "SP04", stationName = "วัดบางแตน" });
            dataWater.Add(new DataWater { Codestation = "SP05", stationName = "วัดปากคลองบางขนาก" });
            dataWater.Add(new DataWater { Codestation = "SP06", stationName = "บางกระเจ็ด" });
            dataWater.Add(new DataWater { Codestation = "SP07", stationName = "วัดใหม่บางคล้า" });
            dataWater.Add(new DataWater { Codestation = "SP08", stationName = "เทศบาลเมืองฉะเชิงเทรา" });
            dataWater.Add(new DataWater { Codestation = "SP09", stationName = "ชลประทานฉะเชิงเทรา" });

            return dataWater;
        }
    }
}