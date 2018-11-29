using Microsoft.EntityFrameworkCore;

namespace SmashDeck.Models
{
    public partial class SmashDeckContext : DbContext
    {
        public SmashDeckContext()
        {
        }

        public SmashDeckContext(DbContextOptions<SmashDeckContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contact> Contact { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=SmashDeck;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.Country)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.DirectorOfPharmacyPhone)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Fax)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LicensedBeds)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialManagerFax)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialManagerPhone)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PostalCode).IsUnicode(false);

                entity.Property(e => e.State)
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });
        }
    }
}
