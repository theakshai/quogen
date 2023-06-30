using backend.Data;
using backend.Models;
using backend.TypeCheckingModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    public class OrganisationController : ControllerBase
    {
        public IConfiguration? _configuration;
        public ApplicationDbContext? _context;

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
                    return Ok(JsonConvert.SerializeObject(Organistaion));
                }catch(Exception ex)
                {
                    return StatusCode(500, "Internal Server error in database. See logs for more details");
                }
            }
            return StatusCode(400, "Organistaion Not found");
        }


        [HttpGet]
        [Route("/api/organisation/{id}")]
        public async Task<IActionResult> GetById()
        {
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
        [Route("/api/organisation/create")]
        public async Task<IActionResult> Create([FromBody] TOrganisation organisation)
        {
            if(organisation is not null)
            {
                if(await OrganisationExists(organisation?.OrganisationName))
                {
                    return StatusCode(409, "Organisation Name already Exists");
                }
                else
                {
                    try
                    {
                        Guid guid = Guid.NewGuid();
                        var Organisation = new Organisation
                        {
                            OrganistationId = guid.ToString(),
                            OrganisationName = organisation.OrganisationName,
                            Address = organisation.Address,
                            About = organisation.About,
                            TermsAndCondition = organisation.TermsAndCondition,
                            CreatedBy = "akshai",
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
        public async Task<IActionResult> DelelteOrganistaion()
        {
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
