using backend.Data;
using backend.Services;
using backend.Models;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Controllers
{
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

        [Route("/api/auth")]
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
                    return StatusCode(500, ex.Message);
                }
            }
            return Ok("No Users Found");

        }

        [NonAction]
        public async Task<bool> UserExists(string email)
        {
                try
                {
                    var user = await _context!.Users.FirstOrDefaultAsync(user => user.Email == email);
                    if(user != null)
                    {
                        Console.WriteLine("The user is" + user == null);
                        return true;
                    }

                }catch(Exception ex)
                {
                    return false;
                }
            return false;
        }

        [HttpPost]
        [Route("api/signup")]
        public async Task<IActionResult> SigningUp([FromBody] UserAuth user)
        {
            if(user is not null) 
            {
                if(!await UserExists(user!.Email)) 
                {
                    return Conflict("User/Mail Already Exists");

                }
                try
                {
                    Guid guid = Guid.NewGuid();

                    var Authentication = new Authentication
                    {
                        UserId = guid.ToString(),
                        Password  = user.Password,
                    };



                    var User = new User
                    {
                        UserId = guid.ToString(),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Designation = user.Designation,
                        IsPremium = false,
                        CreatedAt = DateTime.Now
                        
                    };

                    var token = JWTTokenGenerator.CreateToken(user,_configuration!);
                    var CookieOptions = new CookieOptions();
                    CookieOptions.Expires = DateTime.Now.AddDays(1);
                    CookieOptions.Path = "/";


                    await _context!.Authentications.AddAsync(Authentication);
                    await _context!.Users.AddAsync(User);
                    await _context!.SaveChangesAsync();

                    Response.Cookies.Append("jwt", token, CookieOptions);
                    return StatusCode(201, "User Created Successfully");

                }catch(Exception e)
                {
                    return StatusCode( 500 ,"An unknown internal server error in database" + e.Message);
                }
                
            }
            return Ok(); 
        }

        [HttpPost]
        [Route("/api/login/")]
        public async Task<IActionResult> Login([FromBody] Login user)
        {
            if(user is not null)
            {
                if (!await UserExists(user.Email))
                {
                    return StatusCode(404, "User not Signed in");

                }
                else
                {
                    try
                    {
                        var token = JWTTokenGenerator.CreateToken(user, _configuration!);
                        var CookieOptions = new CookieOptions();
                        CookieOptions.Expires = DateTime.Now.AddDays(1);
                        CookieOptions.Path = "/";
                        Response.Cookies.Append("jwt", token, CookieOptions);
                        return StatusCode(200, "User loggedin successfully");

                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, "Internal error occured in token generation");
                    }
                }

            }
                    return StatusCode(404, "User not Signed in");
        }

        [HttpGet]
        [Route("/api/logout")]
        public IActionResult Logout()
        {
            var cookies = Request.Cookies;

            // Iterate over the cookies and print their values
            foreach (var cookie in cookies)
            {
                if(cookie.Key == "jwt")
                {
                    Response.Cookies.Delete("jwt");
                    Console.WriteLine(cookie.Value);
                }
            }


            return Ok("Cookie removed");
        }

    }
}
