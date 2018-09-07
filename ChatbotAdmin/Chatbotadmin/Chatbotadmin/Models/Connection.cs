using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Chatbotadmin.Models
{
    public class Connection
    {
        public SqlConnection con;
        public SqlConnection connection()
        {
            string constring = ConfigurationManager.ConnectionStrings["StudentConn"].ToString();
            con = new SqlConnection(constring);
            return con;
        }

        // **************** Login *********************
        public bool Login(Login smodel)
        {
            try
            {
                connection();
                SqlCommand cmd = new SqlCommand("Login", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Email", smodel.Email);
                cmd.Parameters.AddWithValue("@Password", smodel.Password);
                SqlDataAdapter sd = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                con.Open();
                sd.Fill(dt);

                con.Close();

                if (dt.Rows.Count >= 1)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        // **************** ADD NEW STUDENT *********************
        public bool AddStudent(Admin smodel)
        {
            connection();
            SqlCommand cmd = new SqlCommand("Add", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Name", smodel.Name);
            cmd.Parameters.AddWithValue("@City", smodel.City);
            cmd.Parameters.AddWithValue("@Address", smodel.Address);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        // ********** VIEW STUDENT DETAILS ********************
        public List<Admin> GetStudent()
        {
            connection();
            List<Admin> studentlist = new List<Admin>();
            
            SqlCommand cmd = new SqlCommand("GetDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sd = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con.Open();
            sd.Fill(dt);
            con.Close();

            foreach (DataRow dr in dt.Rows)
            {
                studentlist.Add(
                    new Admin
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Name = Convert.ToString(dr["Name"]),
                        City = Convert.ToString(dr["City"]),
                        Address = Convert.ToString(dr["Address"])
                    });
            }
            return studentlist;
        }

        // ***************** UPDATE STUDENT DETAILS *********************
        public bool UpdateDetails(Admin smodel)
        {
            connection();
            SqlCommand cmd = new SqlCommand("Update", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StdId", smodel.Id);
            cmd.Parameters.AddWithValue("@Name", smodel.Name);
            cmd.Parameters.AddWithValue("@City", smodel.City);
            cmd.Parameters.AddWithValue("@Address", smodel.Address);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        // ********************** DELETE STUDENT DETAILS *******************
        public bool DeleteStudent(int id)
        {
            connection();
            SqlCommand cmd = new SqlCommand("Delete", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StdId", id);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        // **************** ADD NEW Intent *********************
        public bool AddIntent(Intent smodel)
        {
            connection();
            SqlCommand cmd = new SqlCommand("AddIntent", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Intentname", smodel.IntentName);
            cmd.Parameters.AddWithValue("@Event", smodel.Event);
            cmd.Parameters.AddWithValue("@Trainingphrase", smodel.Trainingphrase);
            cmd.Parameters.AddWithValue("@Botresponses", smodel.Botresponses);
            cmd.Parameters.AddWithValue("@Inputcontext", smodel.Inputcontext);
            cmd.Parameters.AddWithValue("@Outputcontext", smodel.Outputcontext);
            cmd.Parameters.AddWithValue("@Actionname", smodel.Actionname);
            cmd.Parameters.AddWithValue("@Parameters", smodel.Parameters);
            cmd.Parameters.AddWithValue("@ParamPrompt", smodel.ParamPrompt);
            cmd.Parameters.AddWithValue("@Actionname", smodel.Actionname);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        // ********** VIEW  Intent ********************
        public List<Intent> GetIntent()
        {
            connection();
            List<Intent> studentlist = new List<Intent>();

            SqlCommand cmd = new SqlCommand("GetIntent", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sd = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con.Open();
            sd.Fill(dt);
            con.Close();

            foreach (DataRow dr in dt.Rows)
            {
                studentlist.Add(
                    new Intent
                    {
                        Id=Convert.ToInt32(dr["Id"]),
                        IntentName = Convert.ToString(dr["IntentName"]),
                        Event = Convert.ToString(dr["Event"]),
                        Trainingphrase = Convert.ToString(dr["Trainingphrase"]),
                        Botresponses = Convert.ToString(dr["Botresponses"]),
                        Inputcontext = Convert.ToString(dr["Inputcontext"]),
                        Outputcontext = Convert.ToString(dr["Outputcontext"]),
                        Actionname = Convert.ToString(dr["Actionname"]),
                        Parameters = Convert.ToString(dr["Parameters"]),
                        ParamPrompt = Convert.ToString(dr["ParamPrompt"])


                    });
            }
            return studentlist;
        }

        // ***************** UPDATE Intent *********************
        public bool UpdateIntent(Intent smodel)
        {
            connection();
            SqlCommand cmd = new SqlCommand("Update", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Intentname", smodel.IntentName);
            cmd.Parameters.AddWithValue("@Event", smodel.Event);
            cmd.Parameters.AddWithValue("@Trainingphrase", smodel.Trainingphrase);
            cmd.Parameters.AddWithValue("@Botresponses", smodel.Botresponses);
            cmd.Parameters.AddWithValue("@Inputcontext", smodel.Inputcontext);
            cmd.Parameters.AddWithValue("@Outputcontext", smodel.Outputcontext);
            cmd.Parameters.AddWithValue("@Actionname", smodel.Actionname);
            cmd.Parameters.AddWithValue("@Parameters", smodel.Parameters);
            cmd.Parameters.AddWithValue("@ParamPrompt", smodel.ParamPrompt);
            cmd.Parameters.AddWithValue("@Actionname", smodel.Actionname);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        // ********************** DELETE Intent *******************
        public bool DeleteIntent(int id)
        {
            connection();
            SqlCommand cmd = new SqlCommand("DeleteIntent", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StdId", id);

            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }
    }
}