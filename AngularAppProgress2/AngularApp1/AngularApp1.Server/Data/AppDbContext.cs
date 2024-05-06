namespace AngularApp1.Server.Data;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Models;
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

    // Define DbSets for your entities
    public DbSet<Meet> Meets { get; set; }
    public DbSet<IndianaSchool> IndianaSchools { get; set; }
    public DbSet<Competitor> Competitors { get; set; }
    public DbSet<Score> Scores { get; set; }
    public DbSet<Gymnast> Gymnasts { get; set;}
}

