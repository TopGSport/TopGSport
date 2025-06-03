using Microsoft.AspNetCore.Mvc;
using TopGSport.Database.Data;

namespace TopGSport.Controllers
{
    [Route("api/purchases")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly DataContext _context;

        public PurchasesController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PurchaseMembership([FromBody] PurchaseRequest request)
        {
            if (request.UserId <= 0)
            {
                return BadRequest(new { message = "Nieprawidłowy identyfikator użytkownika." });
            }

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return NotFound(new { message = "Użytkownik nie znaleziony." });
            }

            var membership = await _context.Membership.FindAsync(request.MembershipId);
            if (membership == null)
            {
                return NotFound(new { message = "Karnet nie znaleziony." });
            }

            user.MembershipId = request.MembershipId;
            user.MembershipPurchaseDate = DateTime.Now;
            user.MembershipStartDate = request.StartDate;
            user.Options = System.Text.Json.JsonSerializer.Serialize(request.Options);

            await _context.SaveChangesAsync();


            return Ok(new { message = "Zakup udany!"});
        }
    }

    public class PurchaseRequest
    {
        public int UserId { get; set; }
        public int MembershipId { get; set; }
        public DateTime StartDate { get; set; }
        public Options? Options { get; set; }
    }

    public class Options
    {
        public bool Trener { get; set; }
        public bool Towel { get; set; }
        public bool Locker { get; set; }
    }
}