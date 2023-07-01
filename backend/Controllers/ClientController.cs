using backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    public class ClientController : ControllerBase
    {

        public IConfiguration _configuration { get; set; }
        public ApplicationDbContext _context { get; set; }

        public ClientController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("/api/client")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var Clients = await _context.Clients.ToListAsync();
                if(Clients is null)
                {
                    return StatusCode(400, "No Clients Found");
                }
                return Ok(JsonConvert.SerializeObject(Clients));
            }catch(Exception ex)
            {
                return StatusCode(500, "Internal Server error");

            }
        }
    }
}
