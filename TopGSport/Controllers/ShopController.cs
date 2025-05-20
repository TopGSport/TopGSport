using Microsoft.AspNetCore.Mvc;
using TopGSport.Database.Data;

[ApiController]
[Route("api/[controller]")]
public class ShopController : ControllerBase
{
    private readonly DataContext _context;

    public ShopController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = _context.Shop.ToList();
        return Ok(items);
    }
}
