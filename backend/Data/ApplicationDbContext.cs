using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Authentication> Authentications { get; set; } 
        public DbSet<User> Users { get; set; } 
        public DbSet<Organisation> Organisations  { get; set; } 
        public DbSet<Client> Clients  { get; set; } 
        public DbSet<Sender> Senders  { get; set; } 
        public DbSet<Quotation> Quotations  { get; set; } 
        public DbSet<UserOrganisationMappings> UserOrganisationMappings  { get; set; } 
        public DbSet<OrgQuotationMappings> OrgQuotationMappings  { get; set; } 
        public DbSet<TempTable> TempTables  { get; set; } 
    }
}
