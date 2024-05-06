using System;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class Meet
    {
        [Key] // This attribute identifies this property as the primary key
        public int Mid { get; set; }
        public string? HostSchool { get; set; }
        public DateTime? Time { get; set; }
    }
}
