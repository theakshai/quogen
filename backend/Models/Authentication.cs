using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Authentication
    {
        [Key]
        [Column("user_id")]
        public string? UserId { get; set; }

        [Column("password")]
        public string? Password { get; set; }
    }
}
