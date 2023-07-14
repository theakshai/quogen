using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class UserOrganisationMappings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int? Id { get; set; }
        [Column("user_id")]
        public string? UserId { get; set; }
        [Column("organisation_id")]
        public string? OrganisationId { get; set; }

    }
}
