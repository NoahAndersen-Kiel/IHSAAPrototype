using System;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class Gymnast

    {
        [Key]
        public int? gymnastIndex { get; set; }
        public string pid { get; set; } // Primary key
        public string name { get; set; }
        public string schoolName { get; set; }
        public string year { get; set; }
        public DateOnly doB { get; set; } 

    }

}
