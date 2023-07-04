using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using backend.Attributes;
using backend.TypeCheckingModel;
using backend.Models;
using Microsoft.VisualBasic;
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
                return _response.InternalServerError() ;
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
                    Guid _QuotationId = Guid.NewGuid();
                    var Quotation = new Quotation
                    {
                        QuotationId = _QuotationId.ToString(),
                        CreatedAt = DateTime.Now,
                        CreatedBy = UserId,
                        TotalCost = quotation.TotalCost,
                        ClientId = _ClientId.ToString(),

                    };

                    await _context.Quotations.AddAsync(Quotation);

                    await _context.SaveChangesAsync();
                    return Ok("Quotation Created Successfully");

                }catch(Exception e)
                {
                    return _response.InternalServerError();
                }
            }

            return _response.Conflict();

        }

    }
}
