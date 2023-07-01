using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Client
    {
        [Key]
        [Column("client_id")]
        public string? client_id { get; set; }
        [Column("client_name")]
        public string? ClientName { get; set; }
        [Column("client_address")]
        public string? ClientAddress { get; set; }
    }
}
