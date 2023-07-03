using Microsoft.EntityFrameworkCore;
namespace backend.Models
{

    [Keyless]
    public class QuotationServiceMappings
    {
        public string? QuotationId { get; set; }
        public string? ServiceId { get; set; }
    }
}
