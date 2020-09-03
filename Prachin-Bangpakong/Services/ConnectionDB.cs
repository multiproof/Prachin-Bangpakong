using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Prachin_Bangpakong.Services
{
    public class ConnectionDB
    {
        public static string Constring()
        {
            string ConnectType = ConfigurationManager.ConnectionStrings["ConnectDB"].ConnectionString;
            return ConnectType;
        }
    }
}