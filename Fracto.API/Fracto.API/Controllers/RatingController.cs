using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fracto.API.Data;
using Fracto.API.Models;

namespace Fracto.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly FractoDbContext _context;

        public RatingController(FractoDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddRating(Rating rating)
        {
            var existingRating = await _context.Ratings
                .FirstOrDefaultAsync(r =>
                    r.UserId == rating.UserId &&
                    r.DoctorId == rating.DoctorId);

            if (existingRating != null)
                return BadRequest("You have already rated this doctor.");

            if (rating.RatingScore < 1 || rating.RatingScore > 5)
                return BadRequest("Rating must be between 1 and 5.");

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            var avgRating = await _context.Ratings
                .Where(r => r.DoctorId == rating.DoctorId)
                .AverageAsync(r => r.RatingScore);

            var doctor = await _context.Doctors.FindAsync(rating.DoctorId);
            if (doctor != null)
            {
                doctor.Rating = (decimal)avgRating;
                await _context.SaveChangesAsync();
            }

            return Ok("Rating added successfully.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRating(Rating rating)
        {
            var existingRating = await _context.Ratings
                .FirstOrDefaultAsync(r =>
                    r.UserId == rating.UserId &&
                    r.DoctorId == rating.DoctorId);

            if (existingRating == null)
                return NotFound("You have not rated this doctor yet.");

            if (rating.RatingScore < 1 || rating.RatingScore > 5)
                return BadRequest("Rating must be between 1 and 5.");

            existingRating.RatingScore = rating.RatingScore;
            await _context.SaveChangesAsync();

            var avgRating = await _context.Ratings
                .Where(r => r.DoctorId == rating.DoctorId)
                .AverageAsync(r => r.RatingScore);

            var doctor = await _context.Doctors.FindAsync(rating.DoctorId);
            if (doctor != null)
            {
                doctor.Rating = (decimal)avgRating;
                await _context.SaveChangesAsync();
            }

            return Ok("Rating updated successfully.");
        }

        [HttpGet("doctor/{doctorId}")]
        public async Task<IActionResult> GetDoctorRatings(int doctorId)
        {
            var ratings = await _context.Ratings
                .Where(r => r.DoctorId == doctorId)
                .ToListAsync();
            return Ok(ratings);
        }
    }
}