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

namespace backend.Controllers
{
    [ApiController]
    public class OrganisationController : ControllerBase
    {
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
                    return _response.Conflict();
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
    }
}
