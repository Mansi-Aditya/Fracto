namespace Fracto.API.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }
        public string Name { get; set; }
        public int SpecializationId { get; set; }
        public string? City { get; set; }
        public decimal Rating { get; set; }
        public string? ProfileImage { get; set; }
        public Specialization? Specialization { get; set; }
    }
}