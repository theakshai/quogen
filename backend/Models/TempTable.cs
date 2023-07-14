using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class TempTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int? Id { get; set; }
        [Column("org_id")]
        public string? OrgId { get; set; }
        [Column("email")]
        public string?  Email { get; set; }
        [Column("accepted")]
        public string?  Accepted { get; set; }

    }
}
