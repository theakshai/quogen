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
using System.Net.Mail;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Text;

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

        [HttpGet("/api/quotation/user/{userId}")]
        public async Task<IActionResult> GetQuotationOnUser(string userId)
        {
            if(userId is not null)
            {
                try
                {
                var Quotations =  _context.Quotations.Where(q => q.CreatedBy == userId).ToList();
                if(Quotations is not null)
                {
                    return Ok(Quotations);
                }
                return _response.NotFound("No Quotations Found");

                }catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
                return _response.NotFound("No Quotations Found");
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
                    var OrgId = payload["OrgId"].ToString();


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

                    var OrgQuotation = new OrgQuotationMappings
                    {
                        OrganisationId = OrgId,
                        QuotationId = _QuotationId.ToString()
                    };

                await _context.OrgQuotationMappings.AddAsync(OrgQuotation);
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


        [HttpPost("/api/quotation/sendpdf")]
        public async Task<IActionResult> SendPdfFile(IFormFile pdfFile)

        {
            Console.WriteLine("Invoking this function");
            if (pdfFile == null || pdfFile.Length == 0)
            {
                return BadRequest("No PDF file provided.");
            }

            // Convert the PDF file to a byte array
            byte[] pdfData;
            using (var memoryStream = new MemoryStream())
            {
                pdfFile.CopyTo(memoryStream);
                pdfData = memoryStream.ToArray();
            }

            // Configure the SMTP settings
            var smtpHost = "smtp.gmail.com";
            var smtpPort = 587;
            var smtpUsername = "123004015@sastra.ac.in";
            var smtpPassword = "Sairam2909";

            // Create the email message
            using (var message = new MailMessage())
            {
                message.From = new MailAddress("123004015@sastra.ac.in");
                message.To.Add(new MailAddress("akshaiakshai35@gmail.com"));
                message.Subject = "PDF Attachment";

                // Create the PDF attachment
                var attachment = new Attachment(new MemoryStream(pdfData), "document.pdf", "application/pdf");
                message.Attachments.Add(attachment);

                // Send the email using SMTP
                using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
                {
                    smtpClient.EnableSsl = true;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.Send(message);
                }
            }

            Console.WriteLine("pdfSent");
            return Ok();
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
