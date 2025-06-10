using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TopGSport.Database.Data;
using TopGSport.Database.Models;

namespace TopGSport.Controllers
{
    [Route("api/memberships")]
    [ApiController]
    public class MembershipsController : ControllerBase
    {
        private readonly DataContext _context;

        public MembershipsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Membership>>> GetMemberships()
        {
            return await _context.Membership.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Membership>> GetMembership(int id)
        {
            var membership = await _context.Membership.FindAsync(id);
            if (membership == null)
            {
                return NotFound();
            }
            return membership;
        }
    }
}