using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Client
    {
        [Key]
        [Column("client_id")]
        public string? Client_id { get; set; }
        [Column("client_name")]
        public string? ClientName { get; set; }
        [Column("client_email")]
        public string? ClientEmail { get; set; }
        [Column("client_mobile")]
        public string? ClientMobile { get; set; }
        [Column("client_state")]
        public string? ClientState { get; set; }
    }
}
