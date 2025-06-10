using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopGSport.Database.Data;
using TopGSport.Database.Models;

namespace TopGSport.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Membership)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "Użytkownik nie znaleziony" });
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserRequest request)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Użytkownik nie znaleziony" });
            }

            if (await _context.Users.AnyAsync(u => u.Email == request.Email && u.Id != id))
            {
                return BadRequest(new { message = "Email już istnieje" });
            }

            user.Name = request.Name;
            user.Email = request.Email;
            user.Phone = request.Phone;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Dane zaktualizowane" });
        }
    }

    public class UpdateUserRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}