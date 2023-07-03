using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Keyless]
    public class UserOrganisationMappings
    {
        public string? UserId { get; set; }
        public string? organisation_id { get; set; }
    }
}
