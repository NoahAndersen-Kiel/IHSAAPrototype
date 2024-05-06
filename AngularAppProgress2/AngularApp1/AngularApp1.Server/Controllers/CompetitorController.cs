using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using AngularApp1.Server.Models;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CompetitorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Competitors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Competitor>>> GetCompetitors([FromQuery] string? schoolName, [FromQuery] int? meetId)
        {
            Console.WriteLine($"API called with schoolName: {schoolName}, meetId: {meetId}");
            var query = _context.Competitors.AsQueryable();

            if (!string.IsNullOrEmpty(schoolName))
            {
                // Filtering by 'schoolName' which is a string
                query = query.Where(c => c.schoolName == schoolName);
            }

            if (meetId.HasValue)
            {
                // Filtering by 'MeetId' which is an integer
                query = query.Where(c => c.MeetId == meetId);
            }
            return await query.ToListAsync();
        }

        // GET: api/Competitors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Competitor>> GetCompetitor(int id)
        {
            var competitor = await _context.Competitors.FindAsync(id);
            if (competitor == null)
            {
                return NotFound();
            }

            return competitor;
        }

        // POST: api/Competitors
        [HttpPost]
        public async Task<ActionResult<Competitor>> PostCompetitor(Competitor competitor)
        {
            _context.Competitors.Add(competitor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompetitor), new { id = competitor.Id }, competitor);
        }

        // PUT: api/Competitors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetitor(int id, Competitor competitor)
        {
            if (id != competitor.Id)
            {
                return BadRequest("The ID in the URL does not match the ID of the entity.");
            }

            var existingCompetitor = await _context.Competitors.FindAsync(id);
            if (existingCompetitor == null)
            {
                return NotFound($"Competitor with ID {id} not found.");
            }

            // Add validation logic if there are specific fields that need checking
            // For example:
            if (string.IsNullOrWhiteSpace(competitor.Name))
            {
                return BadRequest("Name cannot be empty.");
            }

            // Apply the updates to the existing entity
            _context.Entry(existingCompetitor).CurrentValues.SetValues(competitor);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!CompetitorExists(id))
                {
                    return NotFound($"Competitor with ID {id} no longer exists.");
                }
                else
                {
                    // Optionally log the exception
                    return StatusCode(500, "A concurrency error occurred.");
                }
            }
            catch (Exception ex)
            {
                // Optionally log the exception
                return StatusCode(500, "An error occurred while updating the competitor.");
            }

            return NoContent();
        }

        // DELETE: api/Competitors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetitor(int id)
        {
            var competitor = await _context.Competitors.FindAsync(id);
            if (competitor == null)
            {
                return NotFound();
            }

            _context.Competitors.Remove(competitor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompetitorExists(int id)
        {
            return _context.Competitors.Any(e => e.Id == id);
        }
    }
}