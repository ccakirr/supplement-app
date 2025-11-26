using Microsoft.EntityFrameworkCore;
using ReportProject.Models;

namespace ReportProject.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Brand> Brands => Set<Brand>();
        public DbSet<Warehouse> Warehouses => Set<Warehouse>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Sale> Sales => Set<Sale>();
        public DbSet<Purchase> Purchases => Set<Purchase>();
        public DbSet<PriceRecord> PriceRecords => Set<PriceRecord>();
    }
}

