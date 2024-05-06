using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using AngularApp1.Server.Models;
using Newtonsoft.Json;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]  // This attribute is used to denote that this controller responds to web API requests.
    public class ScoreController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ScoreController> _logger; // Logger definition

        public ScoreController(AppDbContext context, ILogger<ScoreController> logger)
        {
            _context = context;
            _logger = logger;  // Initialize logger
        }

        // GET: api/Score
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Score>>> GetScores([FromQuery] int? MeetID, [FromQuery] string selectedEvent)
        {
            var query = _context.Scores.AsQueryable();

            if (MeetID.HasValue)
            {
                // Using the correct database column name "MeetID" if necessary
                query = query.Where(s => s.MeetID == MeetID);
            }

            if (!string.IsNullOrEmpty(selectedEvent))
            {
                query = query.Where(s => s.selectedEvent == selectedEvent);
            }

            try
            {
                var scores = await query.ToListAsync();
                return Ok(scores);
            }
            catch (Exception ex)
            {
                // Log the exception details to understand which field is causing the issue
                return StatusCode(500, "Server error: " + ex.Message);
            }
        }

        // GET: api/Score/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Score>> GetScore(string id)
        {
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }
            return score;
        }

        // POST: api/Score
        [HttpPost]
        public async Task<ActionResult<Score>> PostScore(Score score)
        {
            _context.Scores.Add(score);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetScore), new { id = score.Pid }, score);
        }

        // PUT: api/Score/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScore(int id, ScoreUpdateDto scoreUpdate)
        {
            _logger.LogInformation($"Attempting to update Score with ReferenceID {id}: {JsonConvert.SerializeObject(scoreUpdate)}");

            if (scoreUpdate == null)
            {
                _logger.LogError("Update failed: scoreUpdate data is null.");
                return BadRequest("Update data cannot be null.");
            }

            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                _logger.LogWarning($"No score found with ReferenceID {id}.");
                return NotFound($"Score with ReferenceID {id} not found.");
            }

            if (id != score.ReferenceID)
            {
                _logger.LogError($"Mismatched ReferenceID: Passed {id}, found {score.ReferenceID}.");
                return BadRequest("The ReferenceID in the URL does not match the ReferenceID of the entity.");
            }

            // Validate necessary fields
            if (scoreUpdate.Judge1 == null || scoreUpdate.Judge2 == null)
            {
                _logger.LogError("Validation failed: Judge scores cannot be null.");
                return BadRequest("Judge scores cannot be null.");
            }

            // Map the changes from DTO to the score entity
            score.Judge1 = scoreUpdate.Judge1;
            score.Judge2 = scoreUpdate.Judge2;
            score.Judge12 = scoreUpdate.Judge12;
            score.Judge22 = scoreUpdate.Judge22;
            score.Ded1 = scoreUpdate.Ded1;
            score.Ded2 = scoreUpdate.Ded2;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Score with ReferenceID {id} updated successfully.");
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!_context.Scores.Any(e => e.ReferenceID == id))
                {
                    _logger.LogError($"Concurrency error: Score with ReferenceID {id} no longer exists.", ex);
                    return NotFound($"Score with ReferenceID {id} no longer exists.");
                }
                else
                {
                    _logger.LogError("A concurrency error occurred while updating the score.", ex);
                    return StatusCode(500, "A concurrency error occurred while updating the score.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while updating the score with ReferenceID {id}.", ex);
                return StatusCode(500, "An error occurred while updating the score.");
            }
        }

        // DELETE: api/Score/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore(string id)
        {
            var score = await _context.Scores.FindAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            _context.Scores.Remove(score);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class ScoreUpdateDto
    {
        public decimal? Judge1 { get; set; }
        public decimal? Judge2 { get; set; }
        public decimal? Judge12 { get; set; }
        public decimal? Judge22 { get; set; }
        public decimal? Ded1 { get; set; }
        public decimal? Ded2 { get; set; }
        // Make sure not to include Avg1, Avg2, Total1, Total2, MaxScore
    }
}

