using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Attributes;
using backend.TypeCheckingModel;
using backend.Models;
using System.IdentityModel.Tokens.Jwt;
using backend.Services;
using backend.ControllerHelpers;
using Microsoft.Extensions.Diagnostics.HealthChecks;

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
        [HttpGet("/api/quotation/{id}")]
        public async Task<IActionResult> Get(string id)
        {

            try
            {
                var result = _context.Quotations
        .Where(q => q.QuotationId == id)
        .Join(
            _context.Clients,
            q => q.ClientId,
            c => c.Client_id,
            (q, c) => new { Quotation = q, Client = c }
        )
        .Join(
            _context.Senders,
            q => q.Quotation.SenderId,
            s => s.SenderId,
            (q, s) => new { q.Quotation, q.Client, Sender = s }
        )
        .Select(qcs => new
        {
            QuotationId = qcs.Quotation.QuotationId,
            Confirmed = qcs.Quotation.Confirmed,
            CreatedAt = qcs.Quotation.CreatedAt,
            CreatedBy = qcs.Quotation.CreatedBy,
            About = qcs.Quotation.About,
            Tc = qcs.Quotation.Tc,
            Service = qcs.Quotation.Service,
            ClientId = qcs.Client.Client_id,
            ClientName = qcs.Client.ClientName,
            ClientEmail = qcs.Client.ClientEmail,
            ClientMobile = qcs.Client.ClientMobile,
            ClientState = qcs.Client.ClientState,
            SenderId = qcs.Sender.SenderId,
            SenderName = qcs.Sender.SenderName,
            SenderEmail = qcs.Sender.SenderEmail,
            SenderMobile = qcs.Sender.SenderMobile,
            SenderState = qcs.Sender.SenderState
        })
        .FirstOrDefault();
                if(result is not null)
                {
                    return Ok(result);
                }
                     return Ok("No Quotations");
            }catch(Exception e)
            {
                     return StatusCode(500, "Internal Server Error");
            }

        }


        [HttpPost("/api/quotation")]

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

                    Console.WriteLine("success service and client");

                    Guid _QuotationId = Guid.NewGuid();
                    var Quotation = new Quotation
                    {
                        QuotationId = _QuotationId.ToString(),
                        Confirmed = false,
                        CreatedAt = DateTime.Now,
                        CreatedBy = UserId,
                        About = quotation.About,
                        Tc = quotation.Tc,
                        ClientName = quotation.ClientName,
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

        [HttpPost("/api/quotation/convert/{id}")]
        public async Task<IActionResult> Convert(string? id)
        {

            try
            {
                var Quotation = await _context.Quotations.FirstOrDefaultAsync(q => q.QuotationId == id);
                if(Quotation is not null)
                {
                    Quotation.Confirmed = true;
                     _context.SaveChanges();
                }
                     return Ok("Confirmed");
            }catch(Exception e)
            {
                     return StatusCode(500, "Internal Server Error");
            }

        }
        [HttpGet("/api/quotation/converted/")]
        public async Task<IActionResult> Converted()
        {

            try
            {
                var Quotation =  _context.Quotations.Where(q => q.Confirmed == true).ToList();
                if(Quotation is not null)
                {
                    return Ok(Quotation);
                }
                return _response.NotFound("No Quotations Found");
            }catch(Exception e)
            {
                     return StatusCode(500, "Internal Server Error");
            }

        }

    }
}
