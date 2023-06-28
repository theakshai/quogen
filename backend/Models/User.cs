﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        [Key]

        [Column("user_id")]
        public string? UserId { get; set; }
        [Column("first_name")]
        public string? FirstName { get; set; }
        [Column("last_name")]
        public string? LastName { get; set; }
        [Column("email")]
        public string? Email { get; set; }
        [Column("designation")]
        public string? Designation { get; set; }
        [Column("isPremium")]
        public bool? IsPremium { get; set; }
        [Column("created_at")]
        public DateTime? DateTime { get; set; }
    }
}
