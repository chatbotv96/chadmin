using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chatbotadmin.Models
{
    public class Intent
    {
        public int Id { get; set; }
        public string IntentName { get; set; }
        public string Event { get; set; }
        public string Trainingphrase { get; set; }
        public string Botresponses { get; set; }
        public string Inputcontext { get; set; }
        public string Outputcontext { get; set; }
        public string Actionname { get; set; }
        public string Parameters { get; set; }
        public string ParamPrompt { get; set; }
       // public string MyProperty { get; set; }
       
    }
}