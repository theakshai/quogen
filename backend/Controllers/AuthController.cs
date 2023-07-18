using backend.Data;
using backend.Models;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.ControllerHelpers;
using System.IdentityModel.Tokens.Jwt;
using backend.Services;
using backend.Attributes;
using BCrypt.Net;
using Newtonsoft.Json;

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
        JWTToken _token = new JWTToken(); 

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
                    var token = _token.GetToken(HttpContext);
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
        [Route("/api/users")]
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            if (_context is not null)
            {

                try
                {
                    var TotalUsers = await _context.Users.ToListAsync();
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

        [Route("/api/user/{id}")]
        [HttpGet]
        public async Task<ActionResult> GetUser(string? id)
        {
            if (_context is not null)
            {

                try
                {

                    var User = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
                    Console.WriteLine("The user is " + User);
                    if(User is not null)
                    {
                        return Ok(User);
                    }
                    return _response.OK("No User Found");
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
                        Password  = BCrypt.Net.BCrypt.HashPassword(user.Password),
                    };



                    var User = new User
                    {
                        UserId = guid.ToString(),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Designation = user.Designation,
                        CreatedAt = DateTime.Now
                        
                    };

                    await _context!.Authentications.AddAsync(Authentication);
                    await _context!.Users.AddAsync(User);
                    await _context!.SaveChangesAsync();
                    var token = JWTTokenGenerator.CreateToken(guid.ToString(),user,_configuration!);
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
                        var HashedPassword = await _authHelper.GetPassword(UserId, _context!);

                        if (UserId != null && HashedPassword != null) 
                        {
                            

                            try
                            {

                                var UserInOrg = await _context.UserOrganisationMappings.FirstOrDefaultAsync(u => u.UserId == UserId);


                                bool isMatch = BCrypt.Net.BCrypt.Verify(user.Password, HashedPassword);
                                if (isMatch)
                                {
                                 if(UserInOrg is not null)
                                    {
                                 var tokens = JWTTokenGenerator.CreateOrgUserToken(UserId,user.Email, UserInOrg.OrganisationId, _configuration!);
                                 Response.Headers.Add("Authorization", "Bearer " + tokens);
                                    }
                                    else { 
                                 var token = JWTTokenGenerator.CreateToken(UserId, user, _configuration!);
                                 Response.Headers.Add("Authorization", "Bearer " + token);
}

                                 return _response.OK("User Logged in Successfully");

                                }
                                else
                                {
                                    return _response.NotFound("Password Wrong");
                                }

                            }catch(Exception e)
                            {
                                Console.WriteLine(e);
                            }
                        }
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

        [HttpGet("/api/userorg")]
        public  IActionResult UserOrg()
        {
                    string value = _token.GetToken(HttpContext);
                    Tuple<JwtHeader,JwtPayload> result = jWTTokenDecoder.TokenDecoder(value);
                    JwtPayload payload =result.Item2;
            Console.WriteLine(JsonConvert.SerializeObject(payload));
            if (payload.ContainsKey("OrgId"))
            {
                return _response.OK("Organisation Member");
            }
                return _response.NotFound("Not a Organisation Member");
        }

        [HttpGet("/api/userorg/all")]
        public async Task<IActionResult> UserOrgAll()
        {
            var  UsersInOrganisation = await _context.UserOrganisationMappings.ToListAsync();
            if(UsersInOrganisation is not null)
            {
                return Ok(UsersInOrganisation);
            }
                Console.Write("hey bro 00000000000000000000000000000000");
            return Ok();
        }

        [HttpPut("/api/signup")]
        public async Task<IActionResult> UpdateProfile([FromBody] TUserAuth user)
        {
            if(user is not null) 
            {
                if(await _authHelper!.UserExists(user?.Email, _context!)) 
                {
                    try
                    {
                    var User = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

                        Console.WriteLine("The username is"+User.FirstName);
                    User.FirstName = user.FirstName;
                    User.LastName = user.LastName;
                    User.Designation = user.Designation;
                    User.Email = user.Email;
                        await _context.SaveChangesAsync();
                        return Ok("User Updated Successfully");

                    }catch(Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }

                }
                return _response.InternalServerError();
            }
                return _response.NotFound("User Not Found");
        }

    }
}
