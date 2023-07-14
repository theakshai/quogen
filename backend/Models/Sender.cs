using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Sender
    {
        [Key]
        [Column("sender_id")]
        public string? SenderId { get; set; }
        [Column("sender_name")]
        public string? SenderName { get; set; }
        [Column("sender_email")]
        public string? SenderEmail { get; set; }
        [Column("sender_mobile")]
        public string? SenderMobile { get; set; }
        [Column("sender_state")]
        public string? SenderState { get; set; }
    }
}
