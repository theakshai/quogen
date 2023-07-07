﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Quotation
    {
        [Key]
        [Column("quotation_id")]
        public string? QuotationId { get; set; }
        [Column("confirmed")]
        public int? Confirmed { get; set; }
        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }
        [Column("created_by")]
        public string? CreatedBy { get; set; }
        [Column("service")]
        public string? Service { get; set; }
        [Column("total_cost")]
        public int? TotalCost { get; set; }
        [Column("client_id")]
        public string? ClientId { get; set; }
        [Column("sender_id")]
        public string? SenderId { get; set; }
    }
}
