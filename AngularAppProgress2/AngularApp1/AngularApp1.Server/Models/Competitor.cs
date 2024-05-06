using System;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class Competitor
    {
        [Key]
        public int Id { get; set; } // Primary key
        public string Pid { get; set; }
        public string Name { get; set; }
        public string schoolName { get; set; }
        public int? BarPos { get; set; }
        public int? BeamPos { get; set; }
        public int? FloorPos { get; set; }
        public int? VaultPos { get; set; }
        public bool? Sub { get; set; }
        public int? MeetId { get; set; }
        // Consider adding navigation properties for relationships
    }

}
