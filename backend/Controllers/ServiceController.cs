using backend.Data;
using backend.Attributes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using backend.TypeCheckingModel;
using backend.Models;
using backend.ControllerHelpers;

namespace backend.Controllers
{
    [ApiController]
    public class ServiceController : ControllerBase
    {
        public IConfiguration _configuration;
        public ApplicationDbContext _context;
        ServiceHelper _serviceHelper = new ServiceHelper();

        public ServiceController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }


        [HttpGet("/api/service/")]
        [CustomAuth("admin")]

        public async Task<IActionResult> Get()
        {
            if(_context is not null)
            {
                try
                {
                 var Services = await _context.Services.ToListAsync();
                 return Ok(JsonConvert.SerializeObject(Services));
                }catch(Exception ex)
                {
                 return StatusCode(500, "Internal Server Error.");
                }

            }
            return Ok("No Services Found");
        }

        [HttpPost("/api/service/")]
        [CustomAuth("admin")]
        public async Task<IActionResult> Create([FromBody] TService service)
        {

            if (await _serviceHelper.ServiceExist(service.ServiceName, _context))
            {
                return StatusCode(409, "Service Exists Already");
            }
            else {
                try
                {
                    Guid guid = Guid.NewGuid();

                    var Service = new Service
                    {
                        ServiceId = guid.ToString(),
                        ServiceName = service.ServiceName,
                        Cost = service.Cost,

                    };

                    await _context.Services.AddAsync(Service);
                    await _context.SaveChangesAsync();
                    return StatusCode(200, "Service Created Successfully");

                } catch (Exception ex)
                {
                    return StatusCode(500, "Internal Server Error");
                }
            }

            return StatusCode(409, "Service Exist already");

        }

    }
}
