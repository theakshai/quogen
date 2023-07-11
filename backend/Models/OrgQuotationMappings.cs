using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class OrgQuotationMappings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int? Id { get; set; }
        [Column("organisation_id")]
        public string? OrganisationId { get; set; }
        [Column("quotation_id")]
        public string? QuotationId { get; set; }
    }
}
