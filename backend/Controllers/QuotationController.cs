using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Attributes;
using backend.TypeCheckingModel;
using backend.Models;
using System.IdentityModel.Tokens.Jwt;
using backend.Services;
using backend.ControllerHelpers;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotationController : ControllerBase
    {
        public IConfiguration _configuration { get; set; }
        public ApplicationDbContext _context { get; set; }

        ResponseAction _response = new ResponseAction();

        JWTTokenDecoder jWTTokenDecoder = new JWTTokenDecoder();
        JWTToken _token = new JWTToken();

        public QuotationController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("/api/quotation")]
        public async Task<IActionResult> Get()
        {

            try
            {
                var Quotations = await _context.Quotations.ToListAsync();
                if(Quotations is not null)
                {
                     return Ok(Quotations);
                }
                     return Ok("No Quotations");
            }catch(Exception e)
            {
                     return StatusCode(500, "Internal Server Error");
            }

        }

        [HttpPost("/api/quotation")]
        [CustomAuth("akkshai")]

        public async Task<IActionResult> Create([FromBody] TClientQuotation quotation)
        {
            if(quotation is not null)
            {
                try
                {
                    Guid _ClientId = Guid.NewGuid();
                    var Client = new Client
                    {
                        Client_id = _ClientId.ToString(),
                        ClientName = quotation.ClientName,
                        ClientEmail = quotation.ClientEmail,
                        ClientMobile = quotation.ClientMobile,
                        ClientState = quotation.ClientState
                    };
                     await _context.Clients.AddAsync(Client);


                    string value = _token.GetToken(HttpContext);
                    Tuple<JwtHeader,JwtPayload> result = jWTTokenDecoder.TokenDecoder(value);
                    JwtPayload payload =result.Item2;
                    var UserId = payload["UserId"].ToString();


                    Guid _SenderId = Guid.NewGuid();

                    var Sender = new Sender
                    {
                        SenderId = _SenderId.ToString(),
                        SenderName = quotation.SenderName,
                        SenderEmail = quotation.SenderEmail,
                        SenderMobile = quotation.SenderEmail,
                        SenderState = quotation.SenderState
                    };
                     await _context.Senders.AddAsync(Sender);
                     await _context.SaveChangesAsync();

                    Console.WriteLine("success servuce and client");

                    Guid _QuotationId = Guid.NewGuid();
                    var Quotation = new Quotation
                    {
                        QuotationId = _QuotationId.ToString(),
                        Confirmed = 0,
                        CreatedAt = DateTime.Now,
                        CreatedBy = UserId,
                        TotalCost = quotation.TotalCost,
                        Service = quotation.Service,
                        ClientId = _ClientId.ToString(),
                        SenderId = _SenderId.ToString(),

                    };

                    await _context.Quotations.AddAsync(Quotation); 
                    await _context.SaveChangesAsync();
                    return Ok("Quotation Created Successfully");

                }catch(Exception e)
                {
                    Console.WriteLine("this is after last");
                    Console.WriteLine(e.Message);
                    return _response.InternalServerError();
                }
            }

            return _response.Conflict();

        }

    }
}
