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
    public class GymnastController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GymnastController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Gymnasts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gymnast>>> GetGymnasts([FromQuery] string? schoolName)
        {
            Console.WriteLine($"API called with schoolName: {schoolName}");
            var query = _context.Gymnasts.AsQueryable();

            if (!string.IsNullOrEmpty(schoolName))
            {
                query = query.Where(c => c.schoolName == schoolName);
            }

            var gymnasts = await query.ToListAsync();
            return Ok(gymnasts);
        }

        // GET: api/Gymnasts/5
        [HttpGet("{gymnastIndex}")]
        public async Task<ActionResult<Gymnast>> GetGymnast(int gymnastIndex)
        {
            var gymnast = await _context.Gymnasts.FindAsync(gymnastIndex);
            if (gymnast == null)
            {
                return NotFound();
            }

            return gymnast;
        }

        // POST: api/Gymnasts
        [HttpPost]
        public async Task<ActionResult<Gymnast>> PostGymnast(Gymnast gymnast)
        {
            _context.Gymnasts.Add(gymnast);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGymnast), new { gymnastIndex = gymnast.gymnastIndex }, gymnast);
        }

        // PUT: api/Gymnasts/5
        [HttpPut("{gymnastIndex}")]
        public async Task<IActionResult> PutGymnast(int gymnastIndex, Gymnast gymnast)
        {
            if (gymnastIndex != gymnast.gymnastIndex)
            {
                return BadRequest("The ID in the URL does not match the ID of the entity.");
            }

            var existingGymnast = await _context.Gymnasts.FindAsync(gymnastIndex);
            if (existingGymnast == null)
            {
                return NotFound($"Gymnast with PID {gymnastIndex} not found.");
            }

            // Add validation logic if there are specific fields that need checking
            // For example:
            if (string.IsNullOrWhiteSpace(gymnast.name))
            {
                return BadRequest("Name cannot be empty.");
            }

            // Apply the updates to the existing entity
            _context.Entry(existingGymnast).CurrentValues.SetValues(gymnast);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!GymnastExists(gymnastIndex))
                {
                    return NotFound($"Gymnast with Index {gymnastIndex} no longer exists.");
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
                return StatusCode(500, "An error occurred while updating the gymnast.");
            }

            return NoContent();
        }

        // DELETE: api/Gymnasts/5
        [HttpDelete("{gymnastIndex}")]
        public async Task<IActionResult> DeleteGymnast(int gymnastIndex)
        {
            var gymnast = await _context.Gymnasts.FindAsync(gymnastIndex);
            if (gymnast == null)
            {
                return NotFound();
            }

            _context.Gymnasts.Remove(gymnast);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GymnastExists(int gymnastIndex)
        {
            return _context.Gymnasts.Any(e => e.gymnastIndex == gymnastIndex);
        }
    }
}