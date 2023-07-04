using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.ControllerHelpers;

namespace backend.Controllers
{
    [ApiController]
    public class ClientController : ControllerBase
    {

        public IConfiguration _configuration { get; set; }
        public ApplicationDbContext _context { get; set; }

        ResponseAction _response = new ResponseAction();

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
                    return _response.NotFound("No Clients Found");
                }
                return Ok(Clients);
            }catch(Exception ex)
            {
                return _response.InternalServerError();

            }
        }
    }
}
