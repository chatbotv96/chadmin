using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Chatbotadmin.Models
{
    public class Login
    {
        [Key]
        public int UserID { get; set; }

        //[Required(ErrorMessage = "First Name is required.")]
        //public string FirstName { get; set; }

        //[Required(ErrorMessage = "Last Name is required.")]
        //public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        //[RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z)]",ErrorMessage ="Please enter valid Email")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "Username is required.")]
        //public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[Compare("Password", ErrorMessage = "Please confirm your password.")]
        //[DataType(DataType.Password)]
        //public string Confirmpassword { get; set; }

    }
}