// I had to create a new class to update user thing as a admin 
namespace Fracto.API.Models
{
    public class UpdateUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}