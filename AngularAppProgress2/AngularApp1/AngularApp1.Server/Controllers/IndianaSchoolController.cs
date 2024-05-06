using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using AngularApp1.Server.Models;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IndianaSchoolController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IndianaSchoolController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/IndianaSchool
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndianaSchool>>> GetAllIndianaSchools()
        {
            return await _context.IndianaSchools.ToListAsync();
        }

        // GET: api/IndianaSchool/{schoolName}
        [HttpGet("{schoolName}")]
        public async Task<ActionResult<IndianaSchool>> GetIndianaSchool(string schoolName)
        {
            var indianaSchool = await _context.IndianaSchools.FirstOrDefaultAsync(s => s.SchoolName == schoolName);

            if (indianaSchool == null)
            {
                return NotFound();
            }

            return indianaSchool;
        }

        // POST: api/IndianaSchool
        [HttpPost]
        public async Task<ActionResult<IndianaSchool>> PostIndianaSchool(IndianaSchool indianaSchool)
        {
            _context.IndianaSchools.Add(indianaSchool);
            await _context.SaveChangesAsync();

            // Return the newly created school
            return CreatedAtAction(nameof(GetIndianaSchool), new { schoolName = indianaSchool.SchoolName }, indianaSchool);
        }

        // PUT: api/IndianaSchool/{schoolName}
        [HttpPut("{schoolName}")]
        public async Task<IActionResult> PutIndianaSchool(string schoolName, IndianaSchool indianaSchool)
        {
            if (schoolName != indianaSchool.SchoolName)
            {
                return BadRequest();
            }

            _context.Entry(indianaSchool).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndianaSchoolExists(schoolName))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Indicates success
        }

        // DELETE: api/IndianaSchool/{schoolName}
        [HttpDelete("{schoolName}")]
        public async Task<IActionResult> DeleteIndianaSchool(string schoolName)
        {
            var indianaSchool = await _context.IndianaSchools.FindAsync(schoolName);
            if (indianaSchool == null)
            {
                return NotFound();
            }

            _context.IndianaSchools.Remove(indianaSchool);
            await _context.SaveChangesAsync();

            return NoContent(); // Indicates success
        }

        private bool IndianaSchoolExists(string schoolName) => _context.IndianaSchools.Any(e => e.SchoolName == schoolName);
    }
}

