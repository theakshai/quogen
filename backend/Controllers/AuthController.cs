using backend.Data;
using backend.Models;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        ResponseAction _response = new ResponseAction();
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
            if (_context is not null)
            {

                try
                {
                    var TotalUsers = await _context.Authentications.ToListAsync();
                    if(TotalUsers is not null)
                    {
                        return Ok(TotalUsers);
                    }
                    return _response.OK("No Users Found");
                }catch(Exception e)
                {
                    return _response.InternalServerError();

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
                    await _context!.Authentications.AddAsync(Authentication);
                    await _context!.Users.AddAsync(User);
                    await _context!.SaveChangesAsync();
                    Response.Headers.Add("Authorization", "Bearer " + token);
                    return _response.ResourceCreated("User Created Succesfully");

                }catch(Exception e)
                {
                    return _response.InternalServerError();
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
                            Response.Headers.Add("Authorization", "Bearer " + token);


                            return _response.OK("User Logged in Successfully");

                        }
                        return _response.NotFound("User not found.");
                    }
                    catch (Exception ex)
                    {
                        return _response.InternalServerError();
                    }
                }

            }
                    return _response.NotFound("User not found");
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
