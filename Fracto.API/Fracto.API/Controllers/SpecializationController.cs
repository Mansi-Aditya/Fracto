using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fracto.API.Data;
using Fracto.API.Models;

namespace Fracto.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationController : ControllerBase
    {
        private readonly FractoDbContext _context;

        public SpecializationController(FractoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var specializations = await _context.Specializations.ToListAsync();
            return Ok(specializations);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Specialization specialization)
        {
            _context.Specializations.Add(specialization);
            await _context.SaveChangesAsync();
            return Ok("Specialization added successfully.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var specialization = await _context.Specializations.FindAsync(id);
            if (specialization == null)
                return NotFound("Specialization not found.");

            _context.Specializations.Remove(specialization);
            await _context.SaveChangesAsync();
            return Ok("Specialization deleted successfully.");
        }
    }
}