using backend.Data;
using backend.Models;
using backend.Services;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using backend.Attributes;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
    [ApiController]
    public class OrganisationController : ControllerBase
    {
        public IConfiguration? _configuration;
        public ApplicationDbContext? _context;
        JWTTokenDecoder jWTTokenDecoder = new JWTTokenDecoder();

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
                    return StatusCode(500, "Internal Server error in database. See logs for more details");
                }
            }
            return StatusCode(400, "Organistaion Not found");
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
                    if(Organisation == null)
                    {
                        return StatusCode(400, "Organisation Not Found");
                    }
                    return Ok(Organisation);
                }catch(Exception ex)
                {
                    return StatusCode(500, "Internal Server Error");
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
        [CustomAuth("admin")]
        public async Task<IActionResult> Create([FromBody] TOrganisation organisation)
        {
            if(organisation is not null)
            {
                if(await OrganisationExists(organisation?.OrganisationName!))
                {
                    return StatusCode(409, "Organisation Name already Exists");
                }
                else
                {
                    try
                    {
                        var cookies = Request.Cookies;
                        var UserId = "";

                        foreach (var cookie in cookies)
                        {
                            if(cookie.Key == "jwt")
                            {
                                string value = cookie.Value;
                                Tuple<JwtHeader,JwtPayload> result = jWTTokenDecoder.TokenDecoder(value);
                                JwtPayload payload =result.Item2;
                                UserId = payload["UserId"].ToString();

                            }
                        }
                        Guid guid = Guid.NewGuid();

                        var Organisation = new Organisation
                        {
                            OrganistationId = guid.ToString(),
                            OrganisationName = organisation.OrganisationName,
                            Email = organisation.Email,
                            Mobile = organisation.Mobile,
                            About = organisation.About,
                            TermsAndCondition = organisation.TermsAndCondition,
                            CreatedBy = UserId,
                            CreatedAt = DateTime.Now,

                        };
                            await _context!.Organisations.AddAsync(Organisation);
                            await _context.SaveChangesAsync();
                            return Ok("Organisation Created Successfully");

                    }catch(Exception e)
                    {
                        return StatusCode(500, "Unable to create Organisation. See logs for more information");
                    }
                }
            }

            return StatusCode(409, "Unable to create Organisation. See logs for more details");
        }

        [HttpPost]
        [Route("/api/organisation/adduser")]
        public async Task<IActionResult> AddUser()
        {
            return StatusCode(409, "Not able to add user to the organisation. See logs for more details");
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
                        return StatusCode(400, "Organisation Not Found");
                    }
                     _context.Organisations.Remove(Organisation);
                    await _context.SaveChangesAsync();
                    return StatusCode(204, "Organisation Deleted Successfully");
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
    }
}
