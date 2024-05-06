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
    [Route("api/[controller]")]
    [ApiController]
    public class MeetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MeetController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Meet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meet>>> GetAllMeets()
        {
            return await _context.Meets.ToListAsync();
        }

        // GET: api/Meet/5
        [HttpGet("{mid}")]
        public async Task<ActionResult<Meet>> GetMeet(int mid)
        {
            var meet = await _context.Meets.FirstOrDefaultAsync(m => m.Mid == mid);

            if (meet == null)
            {
                return NotFound();
            }

            return meet;
        }

        // POST: api/Meet
        [HttpPost]
        public async Task<ActionResult<Meet>> PostMeet(Meet meet)
        {
            _context.Meets.Add(meet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMeet), new { mid = meet.Mid }, meet);
        }

        // PUT: api/Meet/5
        [HttpPut("{mid}")]
        public async Task<IActionResult> PutMeet(int mid, Meet meet)
        {
            if (mid != meet.Mid)
            {
                return BadRequest();
            }

            _context.Entry(meet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetExists(mid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Meet/5
        [HttpDelete("{mid}")]
        public async Task<IActionResult> DeleteMeet(int mid)
        {
            var meet = await _context.Meets.FindAsync(mid);
            if (meet == null)
            {
                return NotFound();
            }

            _context.Meets.Remove(meet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeetExists(int mid) => _context.Meets.Any(e => e.Mid == mid);
    }
}
