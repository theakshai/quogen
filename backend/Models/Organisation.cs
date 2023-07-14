using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Organisation
    {
        [Key]

        [Column("organisation_id")]
        public string? OrganistationId { get; set; }
        [Column("organisation_name")]
        public string? OrganisationName { get; set; }
        [Column("email")]
        public string? Email { get; set; }
        [Column("mobile")]
        public string? Mobile { get; set; }
        [Column("about")]
        public string? About { get; set; }
        [Column("created_by")]
        public string? CreatedBy { get; set; }
        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }
    }
}
