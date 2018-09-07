using Chatbotadmin.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Chatbotadmin.Controllers
{
    public class IntentController : Controller
    {
        private SqlConnection con;
        // 1. *************RETRIEVE ALL STUDENT DETAILS ******************
        // GET: Student
        public ActionResult Index()
        {
            Connection dbhandle = new Connection();
            ModelState.Clear();
            return View(dbhandle.GetIntent());
        }

        // 2. *************ADD NEW STUDENT ******************
        // GET: Student/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Student/Create
        [HttpPost]
        public ActionResult CreateIntent(string IntentName,string Event,string Trainingphrase, string Botresponses,string Inputcontext,string Outputcontext,string Actionname,string Parameters)
        {
            try
            {
                Connection cn = new Connection();
               con= cn.connection();
                SqlCommand cmd = new SqlCommand("AddIntent", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Intentname", IntentName);
                cmd.Parameters.AddWithValue("@Event", Event);
                cmd.Parameters.AddWithValue("@Trainingphrase",Trainingphrase);
                cmd.Parameters.AddWithValue("@Botresponses",Botresponses);
                cmd.Parameters.AddWithValue("@Inputcontext", Inputcontext);
                cmd.Parameters.AddWithValue("@Outputcontext",Outputcontext);
                cmd.Parameters.AddWithValue("@Actionname",Actionname);
                cmd.Parameters.AddWithValue("@Parameters",Parameters);
                cmd.Parameters.AddWithValue("@ParamPrompt","");
               // cmd.Parameters.AddWithValue("@Actionname",Actionname);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i >= 1)
                    return Json(2, JsonRequestBehavior.AllowGet);
                else
                    return Json(1, JsonRequestBehavior.AllowGet);
                // else
                // return false;
            }
            catch (Exception ex)
            {
                throw ex;
                // return View();
            }
        }

        // 3. ************* EDIT STUDENT DETAILS ******************
        // GET: Student/Edit/5
        public ActionResult Edit(int id)
        {
            try
            {
                Intent model = new Intent();
                Connection cn = new Connection();
                con = cn.connection();
                string query = " select * from [dbo].[Intent] where id=" + id;
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter sd = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                con.Open();
                sd.Fill(dt);
                con.Close();

                if (dt.Rows.Count >= 1)
                {
                    ViewBag.hdnFlag = id;
                    ViewBag.IntentName = dt.Rows[0]["IntentName"].ToString();
                    ViewBag.Event = dt.Rows[0]["Event"].ToString();
                    ViewBag.Trainingphrase = dt.Rows[0]["Trainingphrase"].ToString();
                    ViewBag.Botresponses = dt.Rows[0]["Botresponses"].ToString();
                    ViewBag.Inputcontext = dt.Rows[0]["Inputcontext"].ToString();
                    ViewBag.Outputcontext = dt.Rows[0]["Outputcontext"].ToString();
                    ViewBag.Actionname = dt.Rows[0]["Actionname"].ToString();
                    ViewBag.Parameters = dt.Rows[0]["Parameters"].ToString();
                    return View();
                }


                else
                    return Json(1, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: Student/Edit/5
        [HttpPost]
        public ActionResult EditIntent(int id,string IntentName, string Event, string Trainingphrase, string Botresponses, string Inputcontext, string Outputcontext, string Actionname, string Parameters)
        {
            try
            {
                Connection cn = new Connection();
                con = cn.connection();
                SqlCommand cmd = new SqlCommand("UpdateIntent", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@stdid", id);
                cmd.Parameters.AddWithValue("@Intentname", IntentName);
                cmd.Parameters.AddWithValue("@Event", Event);
                cmd.Parameters.AddWithValue("@Trainingphrase", Trainingphrase);
                cmd.Parameters.AddWithValue("@Botresponses", Botresponses);
                cmd.Parameters.AddWithValue("@Inputcontext", Inputcontext);
                cmd.Parameters.AddWithValue("@Outputcontext", Outputcontext);
                cmd.Parameters.AddWithValue("@Actionname", Actionname);
                cmd.Parameters.AddWithValue("@Parameters", Parameters);
                cmd.Parameters.AddWithValue("@ParamPrompt", "");
                // cmd.Parameters.AddWithValue("@Actionname",Actionname);
                con.Open();
                int i = cmd.ExecuteNonQuery();
                con.Close();
                if (i >= 1)
                    return Json(2, JsonRequestBehavior.AllowGet);
                else
                    return Json(1, JsonRequestBehavior.AllowGet);
                // else
                // return false;
            }
            catch (Exception ex)
            {
                throw ex;
                // return View();
            }
        }

        // 4. ************* DELETE STUDENT DETAILS ******************
        // GET: Student/Delete/5
        public ActionResult Delete(int id)
        {
            try
            {
                Connection sdb = new Connection();
                if (sdb.DeleteIntent(id))
                {
                    ViewBag.AlertMsg = "Student Deleted Successfully";
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}