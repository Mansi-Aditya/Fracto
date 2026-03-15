using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fracto.API.Data;
using Fracto.API.Models;

namespace Fracto.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly FractoDbContext _context;

        public AppointmentController(FractoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments = await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Doctor)
                .ToListAsync();
            return Ok(appointments);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserAppointments(int userId)
        {
            var appointments = await _context.Appointments
                .Include(a => a.Doctor)
                .Where(a => a.UserId == userId)
                .ToListAsync();
            if (appointments.Count == 0)
                return NotFound("No appointments found.");
            return Ok(appointments);
        }

        [HttpGet("slots")]
        public async Task<IActionResult> GetAvailableSlots(int doctorId, DateTime date)
        {
            var allSlots = new List<string>
            {
                "09:00 AM", "10:00 AM", "11:00 AM",
                "02:00 PM", "03:00 PM", "04:00 PM"
            };

            var bookedSlots = await _context.Appointments
                .Where(a => a.DoctorId == doctorId
                    && a.AppointmentDate.Date == date.Date
                    && a.Status != "Cancelled")
                .Select(a => a.TimeSlot)
                .ToListAsync();

            var availableSlots = allSlots
                .Where(s => !bookedSlots.Contains(s))
                .ToList();

            return Ok(availableSlots);
        }

        [HttpPost]
        public async Task<IActionResult> BookAppointment(Appointment appointment)
        {
            var existingAppointment = await _context.Appointments
                .FirstOrDefaultAsync(a =>
                    a.DoctorId == appointment.DoctorId &&
                    a.AppointmentDate == appointment.AppointmentDate &&
                    a.TimeSlot == appointment.TimeSlot &&
                    a.Status != "Cancelled");

            if (existingAppointment != null)
                return BadRequest("This slot is already booked.");

            appointment.Status = "Pending";
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return Ok("Appointment booked successfully.");
        }

        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
                return NotFound("Appointment not found.");
            appointment.Status = "Confirmed";
            await _context.SaveChangesAsync();
            return Ok("Appointment confirmed.");
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
                return NotFound("Appointment not found.");
            appointment.Status = "Cancelled";
            await _context.SaveChangesAsync();
            return Ok("Appointment cancelled.");
        }
    }
}