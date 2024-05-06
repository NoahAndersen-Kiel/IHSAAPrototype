using System;
using System.ComponentModel.DataAnnotations;
namespace AngularApp1.Server.Models
{
    public class Score
    {
        [Key]
        public int ReferenceID { get; set; }
        public string Pid { get; set; }
        public string Name { get; set; }
        public string selectedEvent { get; set; }
        public decimal? Judge1 { get; set; }
        public decimal? Judge2 { get; set; }
        public decimal? Judge12 { get; set; }
        public decimal? Judge22 { get; set; }
        public decimal? Avg1 { get; set; }
        public decimal? Ded1 { get; set; }
        public decimal? Total1 { get; set; }
        public decimal? Avg2 { get; set; }
        public decimal? Ded2 { get; set; }
        public decimal? Total2 { get; set; }
        public decimal MaxScore { get; set; }
        public int? Place { get; set; }
        public int? MeetID { get; set; } 
    }
}
