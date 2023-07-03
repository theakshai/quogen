using backend.Data;
using backend.Models;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using backend.ControllerHelpers;
using System.IdentityModel.Tokens.Jwt;
using backend.Services;
using backend.Attributes;

namespace backend.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration? _configuration;
        public ApplicationDbContext? _context;
        AuthHelper _authHelper = new AuthHelper();
        JWTTokenDecoder jWTTokenDecoder = new JWTTokenDecoder();

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
                   return Ok(TotalUsers); 
                }catch(Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }
            return Ok("No Users Found");

        }

        [HttpPost("/api/signup")]
        public async Task<IActionResult> SigningUp([FromBody] TUserAuth user)
        {
            if(user is not null) 
            {
                if(await _authHelper!.UserExists(user?.Email, _context!)) 
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

                    var token = JWTTokenGenerator.CreateToken(guid.ToString(),user,_configuration!);
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

        [HttpPost("/api/login")]
        public async Task<IActionResult> Login([FromBody] TLogin user)
        {
            if(user is not null)
            {
                if (!await _authHelper!.UserExists(user.Email, _context!))
                {
                    return StatusCode(404, "User not Signed in");

                }
                else
                {
                    try
                    {
                        var UserId = await _authHelper.GetUserId(user.Email, _context);
                        if (UserId != null)
                        {
                            var token = JWTTokenGenerator.CreateToken(UserId, user, _configuration!);
                            var CookieOptions = new CookieOptions();
                            CookieOptions.Expires = DateTime.Now.AddDays(1);
                            CookieOptions.Path = "/";
                            CookieOptions.HttpOnly = true;
                            Response.Cookies.Append("jwt", token, CookieOptions);
                            return StatusCode(200, "User loggedin successfully");
                        }
                        else
                        {
                            return StatusCode(500, "Internal error occured in token generation. See logs for more information.");
                        }

                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, "Internal error occured in token generation. See logs for more information.");
                    }
                }

            }
                    return StatusCode(404, "User not Signed in");
        }

        [HttpGet("/api/logout")]
        [CustomAuth("user")]
        public IActionResult Logout()
        {
            var cookies = Request.Cookies;

            foreach (var cookie in cookies)
            {
                if(cookie.Key == "jwt")
                {
                    string value = cookie.Value;
                    Tuple<JwtHeader,JwtPayload> result = jWTTokenDecoder.TokenDecoder(value);
                    JwtPayload payload =result.Item2;
                    Console.WriteLine(payload["role"]);

                    Response.Cookies.Delete("jwt");
                }
            }


            return Ok("Cookie removed");
        }

    }
}
