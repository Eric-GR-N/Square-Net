using Infrastructure.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){ }

    public DbSet<SquareNet> SquareNets { get; set; }
    public DbSet<Square> Squares { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Square>()
            .HasOne(s => s.SquareNet)
            .WithMany(sn => sn.Squares)
            .HasForeignKey(s => s.SquareNetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}



