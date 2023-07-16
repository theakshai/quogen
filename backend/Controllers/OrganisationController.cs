using backend.Data;
using backend.Models;
using backend.Services;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using backend.Attributes;
using System.IdentityModel.Tokens.Jwt;
using backend.ControllerHelpers;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers
{
    [ApiController]
    public class OrganisationController : ControllerBase
    {
        public string  lcSacUrl = "D:\\quogen\\backend\\backend\\public\\fonts\\lcSac.ttf";
        public string euclidUrl = "D:\\quogen\\backend\\backend\\public\\fonts\\eculidRegular.ttf";
        public IConfiguration? _configuration;
        public ApplicationDbContext? _context;
        ResponseAction _response = new ResponseAction();
        JWTTokenDecoder jWTTokenDecoder = new JWTTokenDecoder();
        JWTToken _token = new JWTToken();

        public OrganisationController(IConfiguration? configuration, ApplicationDbContext? context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        [Route("/api/organisation")]

        public async Task<IActionResult> Get()
        {
            if(_context is not null)
            {
                try
                {
                    var Organistaion = await _context.Organisations.ToListAsync();
                    return Ok(Organistaion);
                }catch(Exception ex)
                {
                    return _response.InternalServerError();
                }
            }
            return _response.NotFound("Organisation not Found");
        }


        [HttpGet]
        [Route("/api/organisation/{id}")]
        public async Task<IActionResult> GetById(string? id)
        {
            if(id is not null)
            {
                try
                {
                    var Organisation = await _context.Organisations.FirstOrDefaultAsync(o => o.OrganistationId == id); 
                    if(Organisation is null)
                    {
                        return _response.NotFound("No Organisation have the id "+id);
                    }
                    return Ok(Organisation);
                }catch(Exception ex)
                {
                   return _response.InternalServerError();
                }

            }

            return StatusCode(404, "Organisation Not Found");
        }


        [NonAction]
        public async Task<bool> OrganisationExists(string name)
        {
            if(name is not null)
            {
                try
                {
                    var Organisation = await _context!.Organisations.FirstOrDefaultAsync(org => org.OrganisationName == name);
                    if(Organisation != null)
                    {
                        return true;
                    }

                }catch(Exception e)
                {
                    return false;
                }
            }
            return false;
        }

        [HttpPost]
        [Route("/api/organisation/")]
        public async Task<IActionResult> Create([FromBody] TOrganisation organisation)
        {
            if(organisation is not null)
            {
                if(await OrganisationExists(organisation?.OrganisationName!))
                {
                    return _response.NotFound("Organisation with this name already exists");
                }
                else
                {
                    try
                    {
                                string value = _token.GetToken(HttpContext);
                                Tuple<JwtHeader,JwtPayload> result = jWTTokenDecoder.TokenDecoder(value);
                                JwtPayload payload =result.Item2;
                                var UserId = payload["UserId"].ToString();
                                Guid guid = Guid.NewGuid();

                        var Organisation = new Organisation
                        {
                            OrganistationId = guid.ToString(),
                            OrganisationName = organisation.OrganisationName,
                            Email = organisation.Email,
                            Mobile = organisation.Mobile,
                            About = organisation.About,
                            CreatedBy = UserId,
                            CreatedAt = DateTime.Now,

                        };

                        var UserOrganisationMapping = new UserOrganisationMappings
                        {
                            UserId = UserId,
                            OrganisationId = guid.ToString(),
                        };


                            var token = JWTTokenGenerator.CreateAdminToken(UserId, guid.ToString(), _configuration);
                            await _context!.Organisations.AddAsync(Organisation);
                            await _context!.UserOrganisationMappings.AddAsync(UserOrganisationMapping);
                            await _context.SaveChangesAsync();
                            Response.Headers.Add("Authorization", "Bearer " + token);
                            return _response.OK("Organisation Created Successfully");

                    }catch(Exception e)
                    {
                        return _response.InternalServerError();
                    }
                }
            }

            return _response.Conflict();
        }

        [NonAction]
        public void SendEmail(string? Mail, string? orgId)
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("123004015@sastra.ac.in");
            mailMessage.To.Add(Mail);
            mailMessage.Subject = "Gleam: You have been added as member in Gleam Studio";
            Guid UserId = Guid.NewGuid();
            var token =UserId.ToString()+ "+" +orgId;
            string url =  $"http://localhost:5173/newmember/{token}"	;
            string htmlBody = $@"
<html lang=""en"">
    <head>
    <style>
        .invite{{
            height: 30rem;
            width: 50rem;
            background-color: #26262e;
            
        }}
        .title{{
            color: #fcf8f2;
            text-align: center;
            padding-top: .8rem;
        }}
        .message{{
            color: #fcf8f2;
            margin: 2rem;
        }}
        .regards{{
            text-align: left;
            margin: 2rem;
            color: #fcf8f2;
        }}

        .button{{
 display: inline-block;
            padding: 10px 20px;
            background-color: transparent;
border: 1px solid #fcf8f2;
            text-decoration: none;
text-align: center;
                   }}
        a{{
            text-decoration: none;
            color: #fcf8f2;
        }}
        .center{{
            display: flex;
            justify-content: center;
        }}


    </style>
    </head>
<body>
    
    <div class=""invite"">
        <h1 class=""title"">Welcome to QuoGen</h1>
        <p class=""message"">
            You have been added to the Sai Photography organization. We are excited to have you on board!

To accept the membership invitation, please click on the following link:


        </p>
        <div class=""center"">
        <p class=""button""><a href={url}>Accept</a></p>
        </div>
        <p class=""message"">
If you have any questions or need further information, please feel free to reach out to us.
        </p>
        <p class=""regards"">
            Regards, <br>
            Sai Photography
        </p>

    </div>
</body>
</html>";

            mailMessage.Body = htmlBody;
            mailMessage.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.Port = 587;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("123004015@sastra.ac.in", "Sairam2909");
            smtpClient.EnableSsl = true;

            try
            {
                smtpClient.Send(mailMessage);
                Console.WriteLine("Email Sent Successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }


        [HttpPost("/api/organisation/addusermail")]
        public async Task<IActionResult> AddUserMail(TAddUserMail user)
        {
            string Email = user.Email; 
            string OrgId = user.OrgId;



            try
            {
                var TempUser = new TempTable
                {
                    OrgId = OrgId,
                    Email = Email,
                    Accepted = "Pending",
                };
                await _context.TempTables.AddAsync(TempUser);
                await _context.SaveChangesAsync();
                SendEmail(Email, OrgId);
            return Ok("Email Sent Successfully");
            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
            return Ok();
            }

        }

        [HttpPost]
        [Route("/api/organisation/adduser")]
        public async Task<IActionResult> AddUser(TNewMember member)
        {

            if(member is not null)
            {
                var orgId = member.OrgId;
                var user = await _context.TempTables.FirstOrDefaultAsync(u => u.OrgId == orgId);
                var email = "";
                    if(user is not null)
                {
                    email = user.Email;
                user.Accepted = "accepted";
                }
                _context.SaveChanges();

                var pass = BCrypt.Net.BCrypt.HashPassword(member.Password);
                var Auth = new Authentication
                {
                    UserId = member.UserId,
                    Password = pass,
                };
                await _context.Authentications.AddAsync(Auth);
                await _context.SaveChangesAsync();

                var User = new User
                {
                    UserId = member.UserId,
                    FirstName = member.FirstName,
                    Email = email,
                    LastName = member.LastName,
                    Designation = member.Designation,
                    CreatedAt = DateTime.Now,
                };
                await _context.Users.AddAsync(User);
                await _context.SaveChangesAsync();

                var mapping = new UserOrganisationMappings
                {
                    UserId = member.UserId,
                    OrganisationId = orgId,
                };
                await _context.UserOrganisationMappings.AddAsync(mapping);

                await _context.SaveChangesAsync();
                var token = JWTTokenGenerator.CreateOrgUserToken(member.UserId, email, orgId, _configuration!); ;
                Response.Headers.Add("Authorization", "Bearer " + token);

                return Ok("Member Successfully Added");
            }
            return StatusCode(409, "Not able to add user to the organisation. See logs for more details");
        }



        [HttpGet("/api/organisation/members/{orgId}")]

        public async Task<IActionResult> OrgMember(string? orgId)
        {
            if(orgId is not null)
            {
                try
                {
                 //   var OrgMembers = await _context.UserOrganisationMappings.Where(o => o.OrganisationId == orgId).ToListAsync();
                    var OrgMembers = await _context.UserOrganisationMappings
        .Where(uom => uom.OrganisationId == orgId)
        .Join(_context.Users,
            uom => uom.UserId,
            u => u.UserId,
            (uom, u) => new
            {
                u.UserId,
                u.FirstName,
                u.LastName,
                u.Designation,
                u.CreatedAt
            })
        .ToListAsync();
                    if (OrgMembers is not null)
                    {
                        return Ok(OrgMembers);
                    }
                    return _response.NotFound("No org Members found");
                }catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
                    return _response.NotFound("No org Members found");

        }
        [HttpGet("/api/organisation/quotations/{orgId}")]

        public async Task<IActionResult> OrgQuotation(string? orgId)
        {
            if(orgId is not null)
            {
                try
                {
                    var OrgQuotations = await _context.OrgQuotationMappings.Where(o => o.OrganisationId == orgId).ToListAsync();
                    if(OrgQuotations is not null)
                    {
                        return Ok(OrgQuotations);
                    }
                    return _response.NotFound("No org Quotations found");
                }catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
                    return _response.NotFound("No org Quotations found");

        }

        [HttpDelete]
        [Route("/api/organisation/{id}")]
        public async Task<IActionResult> DelelteOrganistaion(string? id)
        {
            if(id is not null)
            {
                try
                {
                    var Organisation = await _context.Organisations.FirstOrDefaultAsync(o => o.OrganistationId == id); 
                    if(Organisation == null)
                    {
                        return _response.NotFound("Organisation Not found");
                    }
                     _context.Organisations.Remove(Organisation);
                    await _context.SaveChangesAsync();
                    return _response.ResourceDeleted("Organisation Deleted Successfully");
                }catch(Exception ex)
                {
                    return StatusCode(500, "Internal Server Error");
                }

            }

            return StatusCode(409, "Unable to delete Organisation");
        }

        [HttpDelete]
        [Route("/api/organisation/removeuser/{id}")]
        public async Task<IActionResult> RemoveUser()
        {
            return StatusCode(409, "Not able to remove user from the organisation . See logs for more details");
        }

        [HttpGet]
        [Route("/api/organisation/{id}/users")]
        public async Task<IActionResult> OrgQuotations(string? id)
        {
            if(id is not null)
            {
                try
                {
                    var Organisation = await _context.Organisations.FirstOrDefaultAsync(o => o.OrganistationId == id); 
                    if(Organisation == null)
                    {
                        return _response.NotFound("Organisation Not found");
                    }
                    var OrgUsers =  _context.UserOrganisationMappings.Where(o => o.OrganisationId == id).ToList();
                    return Ok(OrgUsers);

                }catch(Exception ex)
                {
                    return StatusCode(500, "Internal Server Error");
                }

            }

            return StatusCode(409, "Unable to get the  Organisation Users");
        }

    }
}
