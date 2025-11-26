using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReportProject.Data;
using ReportProject.Services;

namespace ReportProject.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly StockService _stockService;

        public StockController(AppDbContext db, StockService stockService)
        {
            _db = db;
            _stockService = stockService;
        }

        /// <summary>
        /// Stok özeti - Dashboard için
        /// </summary>
        [HttpGet("summary")]
        public async Task<IActionResult> Summary()
        {
            var summary = await _stockService.GetStockSummaryAsync();

            var criticalStockCount = await _db.Products
                .CountAsync(p => p.Stock < 10);

            return Ok(new
            {
                totalStockValue = summary.TotalStockValue,
                totalStock = summary.TotalProducts,
                criticalStock = criticalStockCount,
                expired = summary.Expired,
                expiringIn3Months = summary.ExpiringIn3Months,
                expiringIn12Months = summary.ExpiringIn12Months
            });
        }

        /// <summary>
        /// Kritik stok listesi
        /// </summary>
        [HttpGet("critical")]
        public async Task<IActionResult> Critical()
        {
            var data = await _stockService.GetCriticalStockAsync();
            return Ok(data);
        }

        /// <summary>
        /// Stok devir hızı
        /// </summary>
        [HttpGet("turnover")]
        public async Task<IActionResult> Turnover()
        {
            var data = await _stockService.GetStockTurnoverAsync();
            return Ok(data);
        }

        /// <summary>
        /// SKT analizi
        /// </summary>
        [HttpGet("skt")]
        public async Task<IActionResult> SKT()
        {
            var data = await _stockService.GetSktAnalysisAsync();
            return Ok(data);
        }

        /// <summary>
        /// Marka bazlı stok dağılımı
        /// </summary>
        [HttpGet("by-brand")]
        public async Task<IActionResult> GetByBrand()
        {
            var data = await _stockService.GetStockByBrandAsync();
            return Ok(data);
        }

        /// <summary>
        /// Kategori bazlı stok dağılımı
        /// </summary>
        [HttpGet("by-category")]
        public async Task<IActionResult> GetByCategory()
        {
            var data = await _stockService.GetStockByCategoryAsync();
            return Ok(data);
        }

        /// <summary>
        /// Tüm ürünler listesi
        /// </summary>
        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _db.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.PriceHistory)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Barcode,
                    Brand = p.Brand.Name,
                    Category = p.Category.Name,
                    p.Stock,
                    p.ExpirationDate,
                    LatestPrice = p.PriceHistory
                        .Where(ph => ph.EffectiveDate <= DateTime.Today)
                        .OrderByDescending(ph => ph.EffectiveDate)
                        .Select(ph => new { ph.SalePrice, ph.CostPrice })
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(products);
        }
    }
}
