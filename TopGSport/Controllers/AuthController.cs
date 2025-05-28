using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopGSport.Database.Data;
using TopGSport.Database.Models;

namespace TopGSport.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Nieprawidłowy email lub hasło" });
            }
            return Ok(new { userId = user.Id, message = "Zalogowano pomyślnie" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email już istnieje" });
            }

            var user = new Users
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Password = request.Password, // W produkcji: hashuj hasło
                MembershipId = null, // Nie ustawiamy karnetu przy rejestracji
                MembershipStartDate = null,
                Options = null,
                MembershipPurchaseDate = null
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { userId = user.Id, message = "Rejestracja udana" });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}