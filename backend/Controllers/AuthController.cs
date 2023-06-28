using backend.Data;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration? _configuration;
        public ApplicationDbContext? _context;

        public AuthController(IConfiguration? configuration, ApplicationDbContext? context)
        {
           this. _configuration = configuration;
           this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            if(_context is not null)
            {
                try { 
                   var TotalUsers = await _context.Authentications.ToListAsync();
                   return Ok(JsonConvert.SerializeObject(TotalUsers)); 
                }catch(Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return Ok("No Users Found");

        }

        public async Task<bool> UserExists(string user_id)
        {
            if(_context is not null)
            {
                try
                {
                    var user = await _context.Users.FindAsync(user_id);
                    if(user is not null)
                    {
                        return true;
                    }

                }catch(Exception ex)
                {
                    return false;
                }

            }
            return false;
        }
    }
}
