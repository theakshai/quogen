using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Service
    {
        [Key]
        [Column("service_id")]
        public string? ServiceId { get; set; }
        [Column("service_name")]
        public string? ServiceName { get; set; }
        [Column("cost")]
        public int? Cost { get; set; }
    }
}
