using Chatbotadmin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Chatbotadmin.Controllers
{
    public class AdminController : Controller
    {
        // 1. *************RETRIEVE ALL STUDENT DETAILS ******************
        // GET: Student
        public ActionResult Index()
        {
            Connection dbhandle = new Connection();
            ModelState.Clear();
            return View(dbhandle.GetStudent());
        }

        // 2. *************ADD NEW STUDENT ******************
        // GET: Student/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Student/Create
        [HttpPost]
        public ActionResult Create(Admin smodel)
        {
            try
            {
                
                if (ModelState.IsValid)
                {
                    Connection sdb = new Connection();
                    if (sdb.AddStudent(smodel))
                    {
                        ViewBag.Message = "Student Details Added Successfully";
                        ModelState.Clear();
                    }
                }
                return View();
            }
            catch(Exception ex)
            {
                throw ex;
               // return View();
            }
        }

        // 3. ************* EDIT STUDENT DETAILS ******************
        // GET: Student/Edit/5
        public ActionResult Edit(int id)
        {
            Connection sdb = new Connection();
            return View(sdb.GetStudent().Find(smodel => smodel.Id == id));
        }

        // POST: Student/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, Admin smodel)
        {
            try
            {
                Connection sdb = new Connection();
                sdb.UpdateDetails(smodel);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // 4. ************* DELETE STUDENT DETAILS ******************
        // GET: Student/Delete/5
        public ActionResult Delete(int id)
        {
            try
            {
                Connection sdb = new Connection();
                if (sdb.DeleteStudent(id))
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