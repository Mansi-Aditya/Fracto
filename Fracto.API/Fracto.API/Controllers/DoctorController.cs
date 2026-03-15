using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fracto.API.Data;
using Fracto.API.Models;

namespace Fracto.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly FractoDbContext _context;

        public DoctorController(FractoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _context.Doctors
                .Include(d => d.Specialization)
                .ToListAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(int id)
        {
            var doctor = await _context.Doctors
                .Include(d => d.Specialization)
                .FirstOrDefaultAsync(d => d.DoctorId == id);
            if (doctor == null)
                return NotFound("Doctor not found.");
            return Ok(doctor);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchDoctors(string city, int specializationId)
        {
            var doctors = await _context.Doctors
                .Include(d => d.Specialization)
                .Where(d => d.City == city && d.SpecializationId == specializationId)
                .ToListAsync();
            if (doctors.Count == 0)
                return NotFound("No doctors found.");
            return Ok(doctors);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterByRating(decimal minRating)
        {
            var doctors = await _context.Doctors
                .Include(d => d.Specialization)
                .Where(d => d.Rating >= minRating)
                .ToListAsync();
            return Ok(doctors);
        }

        [HttpPost]
        public async Task<IActionResult> AddDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return Ok("Doctor added successfully.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, Doctor doctor)
        {
            var existingDoctor = await _context.Doctors.FindAsync(id);
            if (existingDoctor == null)
                return NotFound("Doctor not found.");
            existingDoctor.Name = doctor.Name;
            existingDoctor.City = doctor.City;
            existingDoctor.SpecializationId = doctor.SpecializationId;
            existingDoctor.Rating = doctor.Rating;
            await _context.SaveChangesAsync();
            return Ok("Doctor updated successfully.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
                return NotFound("Doctor not found.");
            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return Ok("Doctor deleted successfully.");
        }
    }
}