using Microsoft.AspNetCore.Mvc;
using ReportProject.Data;
using ReportProject.Models;

namespace ReportProject.Controllers
{
    [Route("api/seed")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly AppDbContext _db;

        public SeedController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("demo")]
        public IActionResult SeedDemo()
        {
            if (_db.Products.Any())
                return BadRequest("Demo data already exists.");

            var brand1 = new Brand { Name = "Hardline" };
            var brand2 = new Brand { Name = "BigJoy" };

            var cat1 = new Category { Name = "Supplement" };
            var cat2 = new Category { Name = "Vitamin" };

            var p1 = new Product
            {
                Name = "Creatine 500g",
                Barcode = "111111",
                Stock = 45,
                Brand = brand1,
                Category = cat1,
                ExpirationDate = DateTime.Now.AddMonths(10),
                PriceHistory = new List<PriceRecord>
                {
                    new PriceRecord { SalePrice = 450, EffectiveDate = DateTime.Now.AddDays(-30) }
                }
            };

            var p2 = new Product
            {
                Name = "Omega 3 Softgel",
                Barcode = "222222",
                Stock = 8, // kritik stok
                Brand = brand2,
                Category = cat2,
                ExpirationDate = DateTime.Now.AddMonths(2), // yakında SKT
                PriceHistory = new List<PriceRecord>
                {
                    new PriceRecord { SalePrice = 350, EffectiveDate = DateTime.Now.AddDays(-20) }
                }
            };

            var p3 = new Product
            {
                Name = "Whey Protein 2.2kg",
                Barcode = "333333",
                Stock = 120,
                Brand = brand1,
                Category = cat1,
                ExpirationDate = DateTime.Now.AddMonths(-1), // SKT geçmiş
                PriceHistory = new List<PriceRecord>
                {
                    new PriceRecord { SalePrice = 1250, EffectiveDate = DateTime.Now.AddDays(-10) }
                }
            };

            _db.Products.AddRange(p1, p2, p3);
            _db.SaveChanges();

            return Ok("Demo products added!");
        }
    }
}
