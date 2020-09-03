using Prachin_Bangpakong.Models;
using Prachin_Bangpakong.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prachin_Bangpakong.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {//Fetch the Cookie using its Key.  
            HttpCookie nameCookie = Request.Cookies["Name"];

            //If Cookie exists fetch its value.  
            string name = nameCookie != null ? nameCookie.Value.Split('=')[1] : "undefined";
            //ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('" + name + "');", true);

            if (name != "undefined")
            {
                ViewBag.myBag = name;
            }
            
            return View();
        }

        public ActionResult Graph()
        {
            
            return View();
        }

        public ActionResult Station()
        {
            
            
            return View();
        }
        public ActionResult Map()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
        public JsonResult UserLogin(string username, string password)
        {

            string connection = ConnectionDB.Constring();
            string query = string.Empty;
            string newpassword = string.Empty;

            EnctypeMD5 md5 = new EnctypeMD5();

            newpassword = md5.MD5(password);

            query = "select * from Tb_User where Username = '" + username + "' and Password = '" + newpassword + "'";

            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(connection);

            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            dt.Load(datareader);

            conn.Close();

            string status = string.Empty;
            if (dt.Rows.Count.ToString() == "1")
            {

                status = "1";
                //HttpCookie UserCookie = new HttpCookie(username);

                //UserCookie.Expires.AddHours(3);

                //HttpContext.Response.SetCookie(UserCookie);

                //HttpCookie NewCookie = Request.Cookies[username];

                //Create a Cookie with a suitable Key.  
                HttpCookie nameCookie = new HttpCookie("Name");

                //Set the Cookie value.  
                nameCookie.Values["Name"] = username;

                //Set the Expiry date.  
                nameCookie.Expires = DateTime.Now.AddHours(1);

                //Add the Cookie to Browser.  
                Response.Cookies.Add(nameCookie);

            }
            else
            {
                status = "0";
            }

            return Json(status);

        }

        public string Logout()
        {
            if (Request.Cookies["Name"] != null)
            {
                Response.Cookies["Name"].Value = "";
                Response.Cookies["Name"].Expires = DateTime.Now.AddDays(-1);
            }

            try
            {
                return "1";
            }
            catch
            {
                return "2";
            }



        }


        public JsonResult GetoneStation(string station)
        {
            List<DataWater> listst = new List<DataWater>();
            listst = GetData.GetDataStation(station);

            
            return Json(listst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult StationDatawaterTotal(string fromdate, string todate)
        {
            List<DataWater> Data_Water = GetData.GetDataWater(fromdate, todate);
            


            return Json(Data_Water, JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetStation()
        {

            string connection = ConnectionDB.Constring();
            string query = string.Empty;

            string typedate = "DatetimeServer";

            query = "select * from( ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP01 order by DatetimeServer desc) tb1 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP02 order by DatetimeServer DESC) tb2 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP03 order by DatetimeServer desc) tb3 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP04 order by DatetimeServer DESC) tb4 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP05 order by DatetimeServer desc) tb5 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP06 order by DatetimeServer DESC) tb6 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP07 order by DatetimeServer desc) tb7 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP08 order by DatetimeServer DESC) tb8 union ";
            query += " select SerialSim,Do,Conductivity,pH,Temp,Salinity,Solution,Level_water,Flow,Velocity,DatetimeServer,On_Date,On_time,Data_Date,Data_Time,DateCurrent from (select top(1) *,CONVERT(VARCHAR(10),Data_Date,103) as On_Date , CONVERT(VARCHAR(10),Data_Time,108) as On_time , CONVERT(VARCHAR(10),GETDATE(),103) as DateCurrent from Tb_SP09 order by DatetimeServer DESC) tb9 ";
            query += " ) as b ";
            query += " left join station on b.SerialSim = station.SerialSim left join AltitudeData ON AltitudeData.CodeStation = station.Codestation order by station.CodeStation asc";
            //query += " left join station on b.SerialSim = station.SerialSim ";
            //query += " order by Codestation asc";

            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(connection);

            List<DataWater> listst = new List<DataWater>();
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            dt.Load(datareader);

            conn.Close();
            int rowscount = dt.Rows.Count;
            int runrow = 0;

            string Content = string.Empty;



            foreach (DataRow dr in dt.Rows)
            {

                //แก้ตรงนี้
                Content = "<div style=\"width:280px\"> ";
                Content = "<table class='table table- responsive'>\r\n";
                Content += "<thead style='background-color: #99ccff;'>\r\n";
                Content += "<tr>\r\n";
                Content += "<th colspan='3' ><h5><b>" + dr["StationName"].ToString() + "</b></h5><p style='font-size:10px;'> ต." + dr["address1"].ToString() + " อ." + dr["address2"].ToString() + " จ." + dr["address3"].ToString() + "</p></th>\r\n";
                Content += "</tr>\r\n";
                //Content += "</tr>\r\n";
                Content += "</thead>\r\n";
                Content += "<tbody style='font-size:12px;background-color: #e6f2ff;'>\r\n";
                Content += "<tr style='margin: auto;'>\r\n";
                Content += "<td colspan='3'><img src='/img/Station/" + dr["Codestation"].ToString() + "/" + dr["Codestation"].ToString() + ".jpg'  style='height: 100px;margin: auto;' class='img-responsive' /></td>\r\n";
                Content += "</tr>\r\n";
                //Content += "<tr>\r\n";

                //Salinity
                if (dr["MinSalinity"].ToString() == "" && dr["MaxSalinity"].ToString() == "")
                {

                    Content += "<tr>\r\n";
                    Content += "<td>ความเค็ม</td>\r\n";
                    Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Salinity"].ToString())) + "</td>\r\n";
                    Content += "<td>ก./ล.</td>\r\n";
                    Content += "</tr>\r\n";

                }
                else
                {
                    if (Convert.ToDouble(dr["Salinity"].ToString()) < Convert.ToDouble(dr["MaxSalinity"].ToString()) && Convert.ToDouble(dr["Salinity"].ToString()) >= Convert.ToDouble(dr["MinSalinity"].ToString()))
                    {
                        Content += "<tr style='background-color:yellow'>\r\n";
                        Content += "<td>ความเค็ม</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Salinity"].ToString())) + "</td>\r\n";
                        Content += "<td>ก./ล.</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                    else if (Convert.ToDouble(dr["Salinity"].ToString()) >= Convert.ToDouble(dr["MaxSalinity"].ToString()))
                    {
                        Content += "<tr  style='background-color:red'>\r\n";
                        Content += "<td>ความเค็ม</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Salinity"].ToString())) + "</td>\r\n";
                        Content += "<td>ก./ล.</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                    else
                    {
                        Content += "<tr>\r\n";
                        Content += "<td>ความเค็ม</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Salinity"].ToString())) + "</td>\r\n";
                        Content += "<td>ก./ล.</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                }

                //Conductivity
                if (dr["MinConductivity"].ToString() == "" && dr["MaxConductivity"].ToString() == "")
                {

                    Content += "<tr>\r\n";
                    Content += "<td>ความนำไฟฟ้า</td>\r\n";
                    Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Conductivity"].ToString())) + "</td>\r\n";
                    Content += "<td>ไมโครซีเมน/ซม.</td>\r\n";
                    Content += "</tr>\r\n";

                }
                else
                {
                    if (Convert.ToDouble(dr["Conductivity"].ToString()) < Convert.ToDouble(dr["MaxConductivity"].ToString()) && Convert.ToDouble(dr["Conductivity"].ToString()) >= Convert.ToDouble(dr["MinConductivity"].ToString()))
                    {
                        Content += "<tr style='background-color:yellow'>\r\n";
                        Content += "<td>ความนำไฟฟ้า</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Conductivity"].ToString())) + "</td>\r\n";
                        Content += "<td>ไมโครซีเมน/ซม.</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                    else if (Convert.ToDouble(dr["Conductivity"].ToString()) >= Convert.ToDouble(dr["MaxConductivity"].ToString()))
                    {
                        Content += "<tr  style='background-color:red'>\r\n";
                        Content += "<td>ความนำไฟฟ้า</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Conductivity"].ToString())) + "</td>\r\n";
                        Content += "<td>ไมโครซีเมน/ซม.</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                    else
                    {
                        Content += "<tr>\r\n";
                        Content += "<td>ความนำไฟฟ้า</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Conductivity"].ToString())) + "</td>\r\n";
                        Content += "<td>ไมโครซีเมน/ซม.</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                }

                //Do
                if (float.Parse(dr["Do"].ToString()) < 2)
                {
                    Content += "<tr>\r\n";
                    Content += "<td>ออกซิเจน</td>\r\n";
                    Content += "<td>2.00</td>\r\n";
                    Content += "<td>มก./ล.</td>\r\n";
                    Content += "</tr>\r\n";
                }
                else
                {


                    //Do
                    if (dr["MinDo"].ToString() == "" && dr["MaxDo"].ToString() == "")
                    {

                        Content += "<tr>\r\n";
                        Content += "<td>ออกซิเจน</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Do"].ToString())) + "</td>\r\n";
                        Content += "<td>มก./ล.</td>\r\n";
                        Content += "</tr>\r\n";

                    }
                    else
                    {
                        if (Convert.ToDouble(dr["Do"].ToString()) < Convert.ToDouble(dr["MaxDo"].ToString()) && Convert.ToDouble(dr["Do"].ToString()) >= Convert.ToDouble(dr["MinDo"].ToString()))
                        {
                            Content += "<tr style='background-color:yellow'>\r\n";
                            Content += "<td>ออกซิเจน</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Do"].ToString())) + "</td>\r\n";
                            Content += "<td>มก./ล.</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                        else if (Convert.ToDouble(dr["Do"].ToString()) >= Convert.ToDouble(dr["MaxDo"].ToString()))
                        {
                            Content += "<tr  style='background-color:red'>\r\n";
                            Content += "<td>ออกซิเจน</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Do"].ToString())) + "</td>\r\n";
                            Content += "<td>มก./ล.</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                        else
                        {
                            Content += "<tr>\r\n";
                            Content += "<td>ออกซิเจน</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Do"].ToString())) + "</td>\r\n";
                            Content += "<td>มก./ล.</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                    }
                }


                if (float.Parse(dr["pH"].ToString()) > 8.5)
                {
                    Content += "<tr>\r\n";
                    Content += "<td>กรด-ด่าง</td>\r\n";
                    Content += "<td colspan='2'>8.50</td>\r\n";
                    Content += "</tr>\r\n";
                    Content += "<tr>\r\n";
                }
                else if (float.Parse(dr["pH"].ToString()) < 6.5)
                {
                    Content += "<tr>\r\n";
                    Content += "<td>กรด-ด่าง</td>\r\n";
                    Content += "<td colspan='2'>6.50</td>\r\n";
                    Content += "</tr>\r\n";
                    Content += "<tr>\r\n";
                }
                else
                {
                    //pH
                    if (dr["MinpH"].ToString() == "" && dr["MaxpH"].ToString() == "")
                    {

                        Content += "<tr>\r\n";
                        Content += "<td>กรด-ด่าง</td>\r\n";
                        Content += "<td colspan='2'>" + String.Format("{0:0.00}", Convert.ToDouble(dr["pH"].ToString())) + "</td>\r\n";
                        Content += "</tr>\r\n";
                        Content += "<tr>\r\n";

                    }
                    else
                    {
                        if (Convert.ToDouble(dr["pH"].ToString()) < Convert.ToDouble(dr["MaxpH"].ToString()) && Convert.ToDouble(dr["pH"].ToString()) >= Convert.ToDouble(dr["MinpH"].ToString()))
                        {
                            Content += "<tr style='background-color:yellow'>\r\n";
                            Content += "<td>กรด-ด่าง</td>\r\n";
                            Content += "<td colspan='2'>" + String.Format("{0:0.00}", Convert.ToDouble(dr["pH"].ToString())) + "</td>\r\n";
                            Content += "</tr>\r\n";
                            Content += "<tr>\r\n";
                        }
                        else if (Convert.ToDouble(dr["pH"].ToString()) >= Convert.ToDouble(dr["MaxpH"].ToString()))
                        {
                            Content += "<tr  style='background-color:red'>\r\n";
                            Content += "<td>กรด-ด่าง</td>\r\n";
                            Content += "<td colspan='2'>" + String.Format("{0:0.00}", Convert.ToDouble(dr["pH"].ToString())) + "</td>\r\n";
                            Content += "</tr>\r\n";
                            Content += "<tr>\r\n";
                        }
                        else
                        {
                            Content += "<tr>\r\n";
                            Content += "<td>กรด-ด่าง</td>\r\n";
                            Content += "<td colspan='2'>" + String.Format("{0:0.00}", Convert.ToDouble(dr["pH"].ToString())) + "</td>\r\n";
                            Content += "</tr>\r\n";
                            Content += "<tr>\r\n";
                        }
                    }

                }
                
                        Content += "<tr>\r\n";
                        Content += "<td>ของแข็งละลายน้ํา</td>\r\n";
                        Content += "<td>"+dr["Solution"].ToString()+"</td>\r\n";
                        Content += "<td>มก./ล.</td>\r\n";
                        Content += "</tr>\r\n";
                  
                //Temp
                if (dr["MinTemp"].ToString() == "" && dr["MaxTemp"].ToString() == "")
                {

                    Content += "<tr>\r\n";
                    Content += "<td>อุณหภูมิ</td>\r\n";
                    Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Temp"].ToString())) + "</td>\r\n";
                    Content += "<td>องศาเซลเซียส</td>\r\n";
                    Content += "</tr>\r\n";

                }
                else
                {
                    if (Convert.ToDouble(dr["Temp"].ToString()) < Convert.ToDouble(dr["MaxTemp"].ToString()) && Convert.ToDouble(dr["Temp"].ToString()) >= Convert.ToDouble(dr["MinTemp"].ToString()))
                    {
                        Content += "<tr style='background-color:yellow'>\r\n";
                        Content += "<td>อุณหภูมิ</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Temp"].ToString())) + "</td>\r\n";
                        Content += "<td>องศาเซลเซียส</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                    else if (Convert.ToDouble(dr["Salinity"].ToString()) >= Convert.ToDouble(dr["MaxSalinity"].ToString()))
                    {
                        Content += "<tr  style='background-color:red'>\r\n";
                        Content += "<td>อุณหภูมิ</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Temp"].ToString())) + "</td>\r\n";
                        Content += "<td>องศาเซลเซียส</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                    else
                    {
                        Content += "<tr>\r\n";
                        Content += "<td>อุณหภูมิ</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Temp"].ToString())) + "</td>\r\n";
                        Content += "<td>องศาเซลเซียส</td>\r\n";
                        Content += "</tr>\r\n";
                    }
                }


                
                if (dr["Flow"].ToString() == "0" && dr["Velocity"].ToString() == "0")
                {
                    
                }
                else if(Convert.ToDouble(dr["Flow"].ToString()) == 0 && Convert.ToDouble(dr["Velocity"].ToString()) == 0)
                {

                }
                else if (dr["Flow"].ToString() == "-0" && dr["Velocity"].ToString() == "0")
                {
                    Content += "<tr>\r\n";
                    Content += "<td>อัตราการไหล</td>\r\n";
                    Content += "<td>N/A</td>\r\n";
                    Content += "<td>ลบ.ม./วินาที</td>\r\n";
                    Content += "</tr>\r\n";
                    Content += "<tr>\r\n";
                    Content += "<td>ระดับน้ำ</td>\r\n";
                    Content += "<td>N/A</td>\r\n";
                    Content += "<td>ม.รทก.</td>\r\n";
                    Content += "</tr>\r\n";
                }
                else
                {
                    //Flow
                    if (dr["MinFlow"].ToString() == "" && dr["MaxFlow"].ToString() == "")
                    {

                        Content += "<tr>\r\n";
                        Content += "<td>อัตราการไหล</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Flow"].ToString())) + "</td>\r\n";
                        Content += "<td>ลบ.ม./วินาที</td>\r\n";
                        Content += "</tr>\r\n";

                    }
                    else
                    {
                        if (Convert.ToDouble(dr["Flow"].ToString()) < Convert.ToDouble(dr["MaxFlow"].ToString()) && Convert.ToDouble(dr["Flow"].ToString()) >= Convert.ToDouble(dr["MinFlow"].ToString()))
                        {
                            Content += "<tr style='background-color:yellow'>\r\n";
                            Content += "<td>อัตราการไหล</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Flow"].ToString())) + "</td>\r\n";
                            Content += "<td>ลบ.ม./วินาที</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                        else if (Convert.ToDouble(dr["Flow"].ToString()) >= Convert.ToDouble(dr["MaxFlow"].ToString()))
                        {
                            Content += "<tr  style='background-color:red'>\r\n";
                            Content += "<td>อัตราการไหล</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Flow"].ToString())) + "</td>\r\n";
                            Content += "<td>ลบ.ม./วินาที</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                        else
                        {
                            Content += "<tr>\r\n";
                            Content += "<td>อัตราการไหล</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Flow"].ToString())) + "</td>\r\n";
                            Content += "<td>ลบ.ม./วินาที</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                    }

                    //Level_water
                    if (dr["MinLevel_water"].ToString() == "" && dr["MaxLevel_water"].ToString() == "")
                    {

                        Content += "<tr>\r\n";
                        Content += "<td>ระดับน้ำ</td>\r\n";
                        Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Level_water"].ToString())) + "</td>\r\n";
                        Content += "<td>ม.รทก.</td>\r\n";
                        Content += "</tr>\r\n";

                    }
                    else
                    {
                        if (Convert.ToDouble(dr["Level_water"].ToString()) < Convert.ToDouble(dr["MaxLevel_water"].ToString()) && Convert.ToDouble(dr["Level_water"].ToString()) >= Convert.ToDouble(dr["MinLevel_water"].ToString()))
                        {
                            Content += "<tr style='background-color:yellow'>\r\n";
                            Content += "<td>ระดับน้ำ</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Level_water"].ToString())) + "</td>\r\n";
                            Content += "<td>ม.รทก.</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                        else if (Convert.ToDouble(dr["Level_water"].ToString()) >= Convert.ToDouble(dr["MaxLevel_water"].ToString()))
                        {
                            Content += "<tr  style='background-color:red'>\r\n";
                            Content += "<td>ระดับน้ำ</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Level_water"].ToString())) + "</td>\r\n";
                            Content += "<td>ม.รทก.</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                        else
                        {
                            Content += "<tr>\r\n";
                            Content += "<td>ระดับน้ำ</td>\r\n";
                            Content += "<td>" + String.Format("{0:0.00}", Convert.ToDouble(dr["Level_water"].ToString())) + "</td>\r\n";
                            Content += "<td>ม.รทก.</td>\r\n";
                            Content += "</tr>\r\n";
                        }
                    }

                }



                Content += "<tr>\r\n";
                Content += "<td>ข้อมูลล่าสุด</td>\r\n";
                Content += "<td colspan='2'>" + dr["Data_Date"].ToString().Substring(0, 10) + " " + dr["Data_Time"].ToString().Substring(0, 5) + "</td>\r\n";
                Content += "</tr>\r\n";
                Content += "</tbody>\r\n";
                Content += "</table >\r\n";

                Content += " </div> ";

                DataWater st = new DataWater();
                st.stationID = Convert.ToInt32(dr["IDStation"].ToString());
                st.Codestation = dr["Codestation"].ToString();
                st.stationName = dr["StationName"].ToString().Trim();
                st.stationLat = dr["Lat"].ToString().Trim();
                st.stationLong = dr["Long"].ToString().Trim();
                st.address1 = dr["address1"].ToString().Trim();
                st.address2 = dr["address2"].ToString().Trim();
                st.address3 = dr["address3"].ToString().Trim();
                st.content = Content;
                st.countnum = rowscount - runrow;
                string s = string.Empty;
                s = dr["On_Date"].ToString().Substring(0, 10) + " " + dr["On_Time"].ToString().Substring(0, 5);
                st.On_Datetime = s;

                st.On_Date = dr["DateCurrent"].ToString().Substring(0, 10);
                st.StatusShow = dr["StatusShow"].ToString();
                st.MinDo = dr["MinDo"].ToString();
                st.MaxDo = dr["MaxDo"].ToString();
                st.MinConductivity = dr["MinConductivity"].ToString();
                st.MaxConductivity = dr["MaxConductivity"].ToString();
                st.MinpH = dr["MinpH"].ToString();
                st.MaxpH = dr["MaxpH"].ToString();
                st.MinTemp = dr["MinTemp"].ToString();
                st.MaxTemp = dr["MaxTemp"].ToString();
                st.MinSalinity = dr["MinSalinity"].ToString();
                st.MaxSalinity = dr["MaxSalinity"].ToString();
                st.MinSolution = dr["MinSolution"].ToString();
                st.MaxSolution = dr["MaxSolution"].ToString();
                st.MinLevel_water = dr["MinLevel_water"].ToString();
                st.MaxLevel_water = dr["MaxLevel_water"].ToString();
                st.MinFlow = dr["MinFlow"].ToString();
                st.MaxFlow = dr["MaxFlow"].ToString();
                st.MinVelocity = dr["MinVelocity"].ToString();
                st.MaxVelocity = dr["MaxVelocity"].ToString();
                runrow++;
                listst.Add(st);
            }

            return Json(listst, JsonRequestBehavior.AllowGet);

        }

        public JsonResult StationDatawater(string station, string displaylist, string fromdate, string todate, string showtype)
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

            //string D1 = dt1.ToString("yyyyMMdd");
            //string D2 = dt2.ToString("yyyyMMdd");
            DateTime start = dt1;
            DateTime finish = dt2;
            if (displaylist == "15")
            {
                //tabletype = "RIDReport";
                //typedate = "On_Datetime";
                tabletype = "Tb_" + station;


                if (showtype == "table")
                {
                    orderby = "order by datechart asc ";
                }
                else if (showtype == "chart")
                {
                    orderby = "order by datechart asc ";
                }
                query = "select * ,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time , CONVERT(varchar(20)," + typedate[0] + ",120) as datechart from " + tabletype + " as dtsp left join Station st on dtsp.SerialSim = st.SerialSim where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + orderby;
            }
            else if (displaylist == "60")
            {
                tabletype = "Tb_SPHour";

                if (showtype == "table")
                {
                    orderby = "order by datechart asc ";
                }
                else if (showtype == "chart")
                {
                    orderby = "order by datechart asc ";
                }
                code = "and dtsp.CodeStation = '" + station + "'";
                query = "select * ,CONVERT(VARCHAR(10)," + typedate[0] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[0] + ",108) as On_time , CONVERT(varchar(20)," + typedate[0] + ",120) as datechart from Tb_SPHour as dtsp left join Station st on dtsp.SerialSim = st.SerialSim where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + orderby;
            }
            else
            {

                tabletype = "Tb_" + station;
                query = "select * from( ";


                for (DateTime x = start; x <= finish; x = x.AddDays(1))
                {
                    string D1 = x.ToString("yyyyMMdd");

                    if (x == finish)
                    {
                        query += "select top 1 * ,CONVERT(VARCHAR(10), " + typedate[1] + ", 103) as On_Date , CONVERT(VARCHAR(10), " + typedate[2] + ", 108) as On_time , CONVERT(varchar(20), " + typedate[0] + ", 120) as datechart from " + tabletype + "  where DatetimeServer between '" + D1 + " 06:00:00' and '" + D1 + " 23:29:59' order by datechart asc ";
                    }
                    else
                    {
                        query += "select top 1 * ,CONVERT(VARCHAR(10)," + typedate[1] + ", 103) as On_Date , CONVERT(VARCHAR(10), " + typedate[2] + ", 108) as On_time , CONVERT(varchar(20), " + typedate[0] + ", 120) as datechart from " + tabletype + "  where DatetimeServer between '" + D1 + " 06:00:00' and '" + D1 + " 23:29:59' order by datechart asc union ";

                    }

                }
                query += ") as b  left join station on b.SerialSim = station.SerialSim  order by DatetimeServer asc ";
            }



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
                dw.DataDo = String.Format("{0:0.00}", Convert.ToDouble(datareader["Do"].ToString()));
                dw.DataConductivity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Conductivity"].ToString()));
                dw.pH = String.Format("{0:0.00}", Convert.ToDouble(datareader["pH"].ToString()));
                dw.Temp = String.Format("{0:0.0}", Convert.ToDouble(datareader["Temp"].ToString()));
                dw.Salinity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Salinity"].ToString()));
                dw.Level_water = String.Format("{0:0.00}", Convert.ToDouble(datareader["Level_water"].ToString()));
                dw.Flow = String.Format("{0:0.00}", Convert.ToDouble(datareader["Flow"].ToString()));

                if (displaylist == "15")
                {
                    if (showtype == "chart")
                    {
                        //dw.On_Datetime = datareader["datechart"].ToString();
                        string s = datareader["datechart"].ToString();
                        s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                        string[] words = s.Split(':');
                        int a = Int32.Parse(words[1].ToString());
                        int b = a / 15;
                        string c = string.Empty;
                        if (b == 0)
                        {
                            c = "00";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else if (b == 1)
                        {
                            c = "15";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else if (b == 2)
                        {
                            c = "30";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else
                        {
                            c = "45";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                    }
                    else
                    {
                        //dw.On_Datetime = datareader["DatetimeServer"].ToString();
                        string s = datareader["DatetimeServer"].ToString();
                        s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy/MM/dd HH:mm");
                        string[] words = s.Split(':');
                        int a = Int32.Parse(words[1].ToString());
                        int b = a / 15;
                        string c = string.Empty;
                        if (b == 0)
                        {
                            c = "00";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 1)
                        {
                            c = "15";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 2)
                        {
                            c = "30";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else
                        {
                            c = "45";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                    }
                }
                else if (displaylist == "60")
                {
                    if (showtype == "chart")
                    {
                        //dw.On_Datetime = datareader["DatetimeServer"].ToString();
                        string s = datareader["datechart"].ToString();
                        s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                        string[] words = s.Split(':');
                        int a = Int32.Parse(words[1].ToString());
                        int b = a / 15;
                        string c = string.Empty;
                        if (b == 0)
                        {
                            c = "00";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 1)
                        {
                            c = "15";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 2)
                        {
                            c = "30";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else
                        {
                            c = "45";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                    }
                    else
                    {
                        //dw.On_Datetime = datareader["DatetimeServer"].ToString();
                        string s = datareader["DatetimeServer"].ToString();
                        s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                        string[] words = s.Split(':');
                        string[] hours = words[0].Split(' ');
                        string hour = hours[1];
                        
                        int a = Int32.Parse(words[1].ToString());
                        int b = a / 15;
                        string c = string.Empty;
                        
                            if (b == 0)
                        {
                            c = "00";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 1)
                        {
                            c = "15";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 2)
                        {
                            c = "30";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else
                        {
                            c = "45";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        
                    }
                }
                else
                {
                    dw.On_Datetime = datareader["DatetimeServer"].ToString();
                    string s = datareader["DatetimeServer"].ToString();
                    s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                    string[] words = s.Split(':');
                    int a = Int32.Parse(words[1].ToString());
                    int b = a / 15;
                    string c = string.Empty;
                    if (b == 0)
                    {
                        c = "00";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                    else if (b == 1)
                    {
                        c = "15";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                    else if (b == 2)
                    {
                        c = "30";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                    else
                    {
                        c = "45";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                }
                dw.TDS = String.Format("{0:0.00}", Convert.ToDouble(datareader["Solution"].ToString()));
                dw.velocity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Velocity"].ToString()));
                string datestring = datareader["On_Date"].ToString();
                datestring = Convert.ToDateTime(datestring).AddYears(543).ToString("yyyy/MM/dd");
                dw.On_Date = datestring;
                dw.On_time = datareader["On_time"].ToString();
                dw.address1 = datareader["address1"].ToString();
                dw.address2 = datareader["address2"].ToString();
                dw.address3 = datareader["address3"].ToString();
                dw.Entrance = datareader["Entrance"].ToString();
                dw.stationLat = datareader["Lat"].ToString();
                dw.stationLong = datareader["Long"].ToString();
                dw.Codestation = datareader["Codestation"].ToString();
                dw.HL4_Installed = datareader["HL4_Installed"].ToString();
                dw.HLD_Installed = datareader["HLD_Installed"].ToString();



                Data_water.Add(dw);
            }
            conn.Close();




            return Json(Data_water, JsonRequestBehavior.AllowGet);


        }

        public JsonResult Getvaluedatawater(string station, string displaylist, string fromdate, string todate, string showtype)
        {

            DateTime dt1 = new DateTime();
            dt1 = DateTime.Parse(fromdate, null);

            DateTime dt2 = DateTime.Parse(todate, null);
            
            string connection = ConnectionDB.Constring();

            string tabletype = string.Empty;
            string[] typedate = new string[3];
            string orderby = string.Empty;
            string code = string.Empty;
            string query = string.Empty;
            typedate[0] = "DatetimeServer";
            typedate[1] = "Data_Date";
            typedate[2] = "Data_Time";

            if (displaylist == "15")
            {
                tabletype = "Tb_" + station;

                query = "select Top 1 max(CONVERT(float,DO)) as Do,max(CONVERT(float,Conductivity)) as Conductivity,max(CONVERT(float,pH)) as pH,max(CONVERT(float,Temp)) as Temp,max(CONVERT(float,Salinity)) as Salinity,max(CONVERT(float,Solution)) as Solution,max(CONVERT(float,Level_water)) as Level_water,max(CONVERT(float,Flow)) as Flow,max(CONVERT(float,Velocity)) as Velocity ,max(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' union all \r\n";
                query += "select Top 1 min(CONVERT(float,DO)) as Do,min(CONVERT(float,Conductivity)) as Conductivity,min(CONVERT(float,pH)) as pH,min(CONVERT(float,Temp)) as Temp,min(CONVERT(float,Salinity)) as Salinity,min(CONVERT(float,Solution)) as Solution,min(CONVERT(float,Level_water)) as Level_water,min(CONVERT(float,Flow)) as Flow,min(CONVERT(float,Velocity)) as Velocity,min(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' union all\r\n";
                query += "select Top 1 avg(CONVERT(float,DO)) as Do,avg(CONVERT(float,Conductivity)) as Conductivity,avg(CONVERT(float,pH)) as pH,avg(CONVERT(float,Temp)) as Temp,avg(CONVERT(float,Salinity)) as Salinity,avg(CONVERT(float,Solution)) as Solution,avg(CONVERT(float,Level_water)) as Level_water,avg(CONVERT(float,Flow)) as Flow,avg(CONVERT(float,Velocity)) as Velocity,avg(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' \r\n";

            }
            else if (displaylist == "60")
            {
                tabletype = "Tb_SPHour";
                code = "and CodeStation = '" + station + "'";

                query = "select Top 1 max(CONVERT(float,DO)) as Do,max(CONVERT(float,Conductivity)) as Conductivity,max(CONVERT(float,pH)) as pH,max(CONVERT(float,Temp)) as Temp,max(CONVERT(float,Salinity)) as Salinity,max(CONVERT(float,Solution)) as Solution,max(CONVERT(float,Level_water)) as Level_water,max(CONVERT(float,Flow)) as Flow,max(CONVERT(float,Velocity)) as Velocity,max(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + " union all \r\n";
                query += "select Top 1 min(CONVERT(float,DO)) as Do,min(CONVERT(float,Conductivity)) as Conductivity,min(CONVERT(float,pH)) as pH,min(CONVERT(float,Temp)) as Temp,min(CONVERT(float,Salinity)) as Salinity,min(CONVERT(float,Solution)) as Solution,min(CONVERT(float,Level_water)) as Level_water,min(CONVERT(float,Flow)) as Flow,min(CONVERT(float,Velocity)) as Velocity,min(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + " union all\r\n";
                query += "select Top 1 avg(CONVERT(float,DO)) as Do,avg(CONVERT(float,Conductivity)) as Conductivity,avg(CONVERT(float,pH)) as pH,avg(CONVERT(float,Temp)) as Temp,avg(CONVERT(float,Salinity)) as Salinity,avg(CONVERT(float,Solution)) as Solution,avg(CONVERT(float,Level_water)) as Level_water,avg(CONVERT(float,Flow)) as Flow,avg(CONVERT(float,Velocity)) as Velocity,avg(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + " \r\n";
            }
            else
            {
                tabletype = "Tb_" + station;
                //typedate = "DatetimeServer";
                query = "select Top 1 max(CONVERT(float,DO)) as Do,max(CONVERT(float,Conductivity)) as Conductivity,max(CONVERT(float,pH)) as pH,max(CONVERT(float,Temp)) as Temp,max(CONVERT(float,Salinity)) as Salinity,max(CONVERT(float,Solution)) as Solution,max(CONVERT(float,Level_water)) as Level_water,max(CONVERT(float,Flow)) as Flow,max(CONVERT(float,Velocity)) as Velocity,max(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59'  union all \r\n";
                query += "select Top 1 min(CONVERT(float,DO)) as Do,min(CONVERT(float,Conductivity)) as Conductivity,min(CONVERT(float,pH)) as pH,min(CONVERT(float,Temp)) as Temp,min(CONVERT(float,Salinity)) as Salinity,min(CONVERT(float,Solution)) as Solution,min(CONVERT(float,Level_water)) as Level_water,min(CONVERT(float,Flow)) as Flow,min(CONVERT(float,Velocity)) as Velocity,min(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59'  union all\r\n";
                query += "select Top 1 avg(CONVERT(float,DO)) as Do,avg(CONVERT(float,Conductivity)) as Conductivity,avg(CONVERT(float,pH)) as pH,avg(CONVERT(float,Temp)) as Temp,avg(CONVERT(float,Salinity)) as Salinity,avg(CONVERT(float,Solution)) as Solution,avg(CONVERT(float,Level_water)) as Level_water,avg(CONVERT(float,Flow)) as Flow,avg(CONVERT(float,Velocity)) as Velocity,avg(CONVERT(float,Area)) as Area from " + tabletype + " where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59'  \r\n";

            }


            SqlConnection conn = new SqlConnection(connection);
            conn.Open();

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            DataTable dt = new DataTable();


            List<DataWater> Data_water = new List<DataWater>();
            while (datareader.Read())
            {
                DataWater dw = new DataWater();



                dw.DataDo = String.Format("{0:0.00}", Convert.ToDouble(datareader["Do"].ToString()));
                dw.DataConductivity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Conductivity"].ToString()));
                dw.pH = String.Format("{0:0.00}", Convert.ToDouble(datareader["pH"].ToString()));
                dw.Temp = String.Format("{0:0.0}", Convert.ToDouble(datareader["Temp"].ToString()));
                dw.Salinity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Salinity"].ToString()));
                dw.Level_water = String.Format("{0:0.00}", Convert.ToDouble(datareader["Level_water"].ToString()));
                dw.Flow = String.Format("{0:0.00}", Convert.ToDouble(datareader["Flow"].ToString()));
                if (datareader["Area"].ToString() == "" || datareader["Area"].ToString() == "null")
                {
                    dw.Area = " ";
                }
                else
                {
                    dw.Area = String.Format("{0:0.000}", Convert.ToDouble(datareader["Area"].ToString()));
                }


                dw.TDS = String.Format("{0:0.00}", Convert.ToDouble(datareader["Solution"].ToString()));
                dw.velocity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Velocity"].ToString()));


                Data_water.Add(dw);
            }
            conn.Close();

            return Json(Data_water, JsonRequestBehavior.AllowGet);

        }

        public ActionResult multiselect(string searchTerm)
        {
            List<multiselect> context = new List<multiselect>();

            context = GetData.GetParameters();
            

            if (searchTerm != null)
            {
                context = context.Where(x=>x.textselect.Contains(searchTerm)).ToList();
            }

            var modifiedData = context.Select(x => new
            {
                id = x.idselect,
                text = x.textselect
            });

            return Json(modifiedData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Save(string data)
        {
            return Json(0, JsonRequestBehavior.AllowGet);
        }

        public ActionResult multiselect2(string searchTerm)
        {
            List<DataWater> context = new List<DataWater>();

            context = GetData.Getstation();


            if (searchTerm != null)
            {
                context = context.Where(x => x.stationName.Contains(searchTerm)).ToList();
            }

            var modifiedData = context.Select(x => new
            {
                id = x.Codestation,
                text = x.stationName
            });

            return Json(modifiedData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Save2(string data)
        {
            return Json(0, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getstationlist(string searchTerm)
        {
            List<DataWater> context = new List<DataWater>();

            context = GetData.Getstation();

            return Json(context, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GraphDataStation(string station, string displaylist, string daystart, string dayend, string parameter)
        {
            if (daystart == null)
            {
                DateTime time = DateTime.Now;
                time = DateTime.Now;
                daystart = time.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            }

            if (dayend == null)
            {
                DateTime time = DateTime.Now;
                time = DateTime.Now;
                dayend = time.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            DateTime dt1 = new DateTime();
            DateTime dt2 = new DateTime();

            if (daystart != "-" && !String.IsNullOrEmpty(daystart))
            {
                dt1 = DateTime.ParseExact(daystart, "dd/MM/yyyy", new CultureInfo("en-US"));
            }


            if (dayend != "-" && !String.IsNullOrEmpty(dayend))
            {
                dt2 = DateTime.ParseExact(dayend, "dd/MM/yyyy", new CultureInfo("en-US"));
            }
            string tabletype = string.Empty;
            string[] typedate = new string[3];
            string orderby = string.Empty;
            string code = string.Empty;
            string query = string.Empty;
            typedate[0] = "DatetimeServer";
            typedate[1] = "Data_Date";
            typedate[2] = "Data_Time";
            System.IFormatProvider format = new System.Globalization.CultureInfo("en-US");
            System.Globalization.CultureInfo cultureinfo = new System.Globalization.CultureInfo("en-US");

            string connection = ConnectionDB.Constring();

            DateTime start = dt1;
            DateTime finish = dt2;
            if (displaylist == "15")
            {
                //tabletype = "RIDReport";
                //typedate = "On_Datetime";
                tabletype = "Tb_" + station;
                orderby = "order by datechart asc ";
                
                query = "select "+ parameter + ",CodeStation ,CONVERT(VARCHAR(10)," + typedate[1] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[2] + ",108) as On_time , CONVERT(varchar(20)," + typedate[0] + ",120) as datechart from " + tabletype + " as dtsp left join Station st on dtsp.SerialSim = st.SerialSim where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + orderby;
            }
            else if (displaylist == "60")
            {
                tabletype = "Tb_SPHour";
                orderby = "order by datechart asc ";
                
                code = "and dtsp.CodeStation = '" + station + "'";
                query = "select " + parameter + ",dtsp.CodeStation ,CONVERT(VARCHAR(10)," + typedate[0] + ",103) as On_Date , CONVERT(VARCHAR(10)," + typedate[0] + ",108) as On_time , CONVERT(varchar(20)," + typedate[0] + ",120) as datechart from Tb_SPHour as dtsp left join Station st on dtsp.SerialSim = st.SerialSim where " + typedate[0] + " between '" + dt1.ToString("yyyyMMdd") + " 00:00:00' and '" + dt2.ToString("yyyyMMdd") + " 23:29:59' " + code + orderby;
            }
           



            SqlConnection conn = new SqlConnection(connection);
            conn.Open();

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            DataTable dt = new DataTable();
            if (String.IsNullOrEmpty(parameter))
            {
                parameter = "Do";
            }
            string[] splitpara = parameter.Split(",".ToCharArray());
            List<DataWater> Data_water = new List<DataWater>();
            while (datareader.Read())
            {
                DataWater dw = new DataWater();
                for(int i = 0; i < splitpara.Length; i++)
                {
                    if (splitpara[i] == "Do")
                    {
                        dw.DataDo = String.Format("{0:0.00}", Convert.ToDouble(datareader["Do"].ToString()));
                    }
                    else if (splitpara[i] == "Conductivity")
                    {
                        dw.DataConductivity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Conductivity"].ToString()));
                    }
                    else if (splitpara[i] == "pH")
                    {
                        dw.pH = String.Format("{0:0.00}", Convert.ToDouble(datareader["pH"].ToString()));
                    }
                    else if (splitpara[i] == "Temp")
                    {
                        dw.Temp = String.Format("{0:0.0}", Convert.ToDouble(datareader["Temp"].ToString()));
                    }
                    else if (splitpara[i] == "Salinity")
                    {
                        dw.Salinity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Salinity"].ToString()));
                    }
                    else if (splitpara[i] == "Level_water")
                    {
                        dw.Level_water = String.Format("{0:0.00}", Convert.ToDouble(datareader["Level_water"].ToString()));
                    }
                    else if (splitpara[i] == "Flow")
                    {
                        dw.Flow = String.Format("{0:0.00}", Convert.ToDouble(datareader["Flow"].ToString()));
                    }
                    else if (splitpara[i] == "Solution")
                    {
                        dw.TDS = String.Format("{0:0.00}", Convert.ToDouble(datareader["Solution"].ToString()));
                        
                    }
                    else if (splitpara[i] == "Velocity")
                    {
                        dw.velocity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Velocity"].ToString()));
                    }
                }
               
                if (displaylist == "15")
                {

                    //dw.On_Datetime = datareader["datechart"].ToString();
                    string s = datareader["datechart"].ToString();
                    s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                    string[] words = s.Split(':');
                        int a = Int32.Parse(words[1].ToString());
                        int b = a / 15;
                        string c = string.Empty;
                        if (b == 0)
                        {
                            c = "00";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else if (b == 1)
                        {
                            c = "15";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else if (b == 2)
                        {
                            c = "30";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                        else
                        {
                            c = "45";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                        }
                    
                    
                }
                else if (displaylist == "60")
                {

                    //dw.On_Datetime = datareader["DatetimeServer"].ToString();
                    string s = datareader["datechart"].ToString();
                    s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                    string[] words = s.Split(':');
                        int a = Int32.Parse(words[1].ToString());
                        int b = a / 15;
                        string c = string.Empty;
                        if (b == 0)
                        {
                            c = "00";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 1)
                        {
                            c = "15";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else if (b == 2)
                        {
                            c = "30";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                        else
                        {
                            c = "45";
                            dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                        }
                   
                }
                
                
                dw.On_Date = datareader["On_Date"].ToString();
                dw.On_time = datareader["On_time"].ToString();
                
                dw.Codestation = datareader["Codestation"].ToString();
                



                Data_water.Add(dw);
            }
            conn.Close();




            return Json(Data_water, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GraphData(string station, string displaylist, string daystart, string dayend, string parameter)
        {
            
            if (displaylist == null)
            {
                displaylist = "60";
            }
            if (daystart == null)
            {
                DateTime time = DateTime.Now;
                time = DateTime.Now;
                daystart = time.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            }

            if (dayend == null)
            {
                DateTime time = DateTime.Now;
                time = DateTime.Now;
                dayend = time.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            DateTime date1 = new DateTime();
            DateTime date2 = new DateTime();

            if (daystart != "-" && !String.IsNullOrEmpty(daystart))
            {
                date1 = DateTime.ParseExact(daystart, "dd/MM/yyyy", new CultureInfo("en-US"));
            }


            if (dayend != "-" && !String.IsNullOrEmpty(dayend))
            {
                date2 = DateTime.ParseExact(dayend, "dd/MM/yyyy", new CultureInfo("en-US"));
            }
            string connection = ConnectionDB.Constring();

            string query = string.Empty;
            string[] typedate = new string[3];
            typedate[0] = "DatetimeServer";
            typedate[1] = "Data_Date";
            typedate[2] = "Data_Time";

            if (String.IsNullOrEmpty(station))
            {
                station = "SP01";
            }
            string[] splitstation = station.Split(",".ToCharArray());
            if (displaylist == "60")
            {
                query = "select* from(";

                for(int i = 0; i < splitstation.Length; i++)
                {
                    if (i == splitstation.Length - 1)
                    {
                        query += "select SerialSim," + parameter + " ,CONVERT(VARCHAR(10),DatetimeServer,103) as On_Date ,CONVERT(VARCHAR(10), DatetimeServer, 108) as On_time , CONVERT(varchar(20), DatetimeServer, 120) as datechart from Tb_SPHour   where DatetimeServer between '" + date1.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 00:00:00' and '" + date2.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 23:29:59' and CodeStation='"+splitstation[i]+"'  ";
                    }
                    else
                    {
                        query += "select SerialSim," + parameter + " ,CONVERT(VARCHAR(10),DatetimeServer,103) as On_Date ,CONVERT(VARCHAR(10), DatetimeServer, 108) as On_time ,CONVERT(varchar(20), DatetimeServer, 120) as datechart from Tb_SPHour   where DatetimeServer between '" + date1.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 00:00:00' and '" + date2.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 23:29:59' and CodeStation='" + splitstation[i] + "' union ";
                    }
                }
                
                query += ") as a left join station on a.SerialSim = station.SerialSim order by Codestation asc , datechart asc";
            }
            else if (displaylist == "15")
            {
                query = "select* from(";

                for (int i = 0; i < splitstation.Length; i++)
                {
                    if (i == splitstation.Length - 1)
                    {
                        query += "select SerialSim," + parameter + " as valueall ,CONVERT(VARCHAR(10),DatetimeServer, 103) as On_Date ,CONVERT(VARCHAR(10), DatetimeServer, 108) as On_time , CONVERT(varchar(20), DatetimeServer, 120) as datechart from Tb_" + splitstation[i] + "   where DatetimeServer between '" + date1.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 00:00:00' and '" + date2.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 23:29:59' ";
                    }
                    else
                    {
                        query += "select SerialSim," + parameter + " as valueall ,CONVERT(VARCHAR(10),DatetimeServer,103) as On_Date ,CONVERT(VARCHAR(10), DatetimeServer, 108) as On_time ,CONVERT(varchar(20), DatetimeServer, 120) as datechart from Tb_"+splitstation[i]+"   where DatetimeServer between '" + date1.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 00:00:00' and '" + date2.ToString("yyyyMMdd", new CultureInfo("en-US")) + " 23:29:59' union ";
                    }
                }
                
                query += ") as a left join station on a.SerialSim = station.SerialSim order by Codestation asc , datechart asc";
            }


            SqlConnection conn = new SqlConnection(connection);
            conn.Open();

            SqlCommand cmd = new SqlCommand(query, conn);
            SqlDataReader datareader = cmd.ExecuteReader();

            DataTable dt = new DataTable();

            if (String.IsNullOrEmpty(parameter))
            {
                parameter = "Do";
            }
            string[] splitpara = parameter.Split(",".ToCharArray());
            List<DataWater> Data_water = new List<DataWater>();
            while (datareader.Read())
            {
                DataWater dw = new DataWater();
                for (int i = 0; i < splitpara.Length; i++)
                {
                    if (splitpara[i] == "Do")
                    {
                        dw.DataDo = String.Format("{0:0.00}", Convert.ToDouble(datareader["Do"].ToString()));
                    }
                    else if (splitpara[i] == "Conductivity")
                    {
                        dw.DataConductivity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Conductivity"].ToString()));
                    }
                    else if (splitpara[i] == "pH")
                    {
                        dw.pH = String.Format("{0:0.00}", Convert.ToDouble(datareader["pH"].ToString()));
                    }
                    else if (splitpara[i] == "Temp")
                    {
                        dw.Temp = String.Format("{0:0.0}", Convert.ToDouble(datareader["Temp"].ToString()));
                    }
                    else if (splitpara[i] == "Salinity")
                    {
                        dw.Salinity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Salinity"].ToString()));
                    }
                    else if (splitpara[i] == "Level_water")
                    {
                        dw.Level_water = String.Format("{0:0.00}", Convert.ToDouble(datareader["Level_water"].ToString()));
                    }
                    else if (splitpara[i] == "Flow")
                    {
                        dw.Flow = String.Format("{0:0.00}", Convert.ToDouble(datareader["Flow"].ToString()));
                    }
                    else if (splitpara[i] == "Solution")
                    {
                        dw.TDS = String.Format("{0:0.00}", Convert.ToDouble(datareader["Solution"].ToString()));

                    }
                    else if (splitpara[i] == "Velocity")
                    {
                        dw.velocity = String.Format("{0:0.00}", Convert.ToDouble(datareader["Velocity"].ToString()));
                    }
                }

                if (displaylist == "15")
                {

                    //dw.On_Datetime = datareader["datechart"].ToString();
                    string s = datareader["datechart"].ToString();
                    s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                    string[] words = s.Split(':');
                    int a = Int32.Parse(words[1].ToString());
                    int b = a / 15;
                    string c = string.Empty;
                    if (b == 0)
                    {
                        c = "00";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                    }
                    else if (b == 1)
                    {
                        c = "15";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                    }
                    else if (b == 2)
                    {
                        c = "30";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                    }
                    else
                    {
                        c = "45";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/* + ':' + words[2].ToString()*/
                    }


                }
                else if (displaylist == "60")
                {

                    //dw.On_Datetime = datareader["DatetimeServer"].ToString();
                    string s = datareader["datechart"].ToString();
                    s = Convert.ToDateTime(s).AddYears(543).ToString("yyyy-MM-dd HH:mm");
                    string[] words = s.Split(':');
                    int a = Int32.Parse(words[1].ToString());
                    int b = a / 15;
                    string c = string.Empty;
                    if (b == 0)
                    {
                        c = "00";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                    else if (b == 1)
                    {
                        c = "15";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                    else if (b == 2)
                    {
                        c = "30";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }
                    else
                    {
                        c = "45";
                        dw.On_Datetime = words[0].ToString() + ':' + c.Trim();/*+ ':' + words[2].ToString()*/
                    }

                }


                dw.On_Date = datareader["On_Date"].ToString();
                dw.On_time = datareader["On_time"].ToString();

                dw.Codestation = datareader["Codestation"].ToString();




                Data_water.Add(dw);
            }
            conn.Close();


            return Json(Data_water, JsonRequestBehavior.AllowGet);
        }

    }
}