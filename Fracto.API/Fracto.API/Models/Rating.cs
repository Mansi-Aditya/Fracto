namespace Fracto.API.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public int DoctorId { get; set; }
        public int UserId { get; set; }
        public int RatingValue { get; set; }
        public Doctor Doctor { get; set; }
        public User User { get; set; }
    }
}