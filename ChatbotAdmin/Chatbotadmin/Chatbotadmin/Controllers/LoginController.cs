using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Chatbotadmin.Models;

namespace Chatbotadmin.Controllers
{
    public class LoginController : Controller
    {
        private SqlConnection con;
        // GET: Login
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

       [HttpPost]
        public ActionResult Logincheck(string email,string password)
        {
            try
            {
                Connection cn = new Connection();
                con = cn.connection();  
                SqlCommand cmd = new SqlCommand("Login", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Password", password);
                SqlDataAdapter sd = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                con.Open();
                sd.Fill(dt);

                con.Close();

                if (dt.Rows.Count >= 1)
                    return Json(2, JsonRequestBehavior.AllowGet);

                else
                    return Json(1, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        
            //return View(objUser);
        }

        public ActionResult Register()
        {
            return View();
        }
    }
}