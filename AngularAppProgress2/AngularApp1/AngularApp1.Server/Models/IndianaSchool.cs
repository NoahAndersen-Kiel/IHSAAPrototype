using System;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class IndianaSchool
    {
        [Key] // This attribute identifies this property as the primary key
        public string SchoolName { get; set; }
        public string Address { get; set; }
        public string Principal { get; set; }
        public string AthleticDirector { get; set; }
    }
}
