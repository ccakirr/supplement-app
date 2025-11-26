using ReportProject.Data;
using ReportProject.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ReportProject.Services
{
    public class PurchaseService
    {
        private readonly AppDbContext _context;

        public PurchaseService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Toplam alış tutarı
        /// </summary>
        public async Task<decimal> GetTotalPurchasesAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var totalPurchases = await _context.Purchases
                .Where(p => p.PurchaseDate >= startDate && p.PurchaseDate <= endDate)
                .SumAsync(p => p.CostPrice * p.Quantity);

            return totalPurchases;
        }

        /// <summary>
        /// Alış özeti
        /// </summary>
        public async Task<PurchaseSummaryDto> GetPurchaseSummaryAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var purchases = await _context.Purchases
                .Include(p => p.Product)
                .Where(p => p.PurchaseDate >= startDate && p.PurchaseDate <= endDate)
                .ToListAsync();

            var totalPurchases = purchases.Sum(p => p.CostPrice * p.Quantity);
            var totalQuantity = purchases.Sum(p => p.Quantity);

            return new PurchaseSummaryDto
            {
                TotalPurchases = totalPurchases,
                TotalQuantity = totalQuantity,
                AveragePurchaseValue = purchases.Any() ? totalPurchases / purchases.Count : 0,
                TotalOrders = purchases.Count
            };
        }

        /// <summary>
        /// Marka bazlı alışlar
        /// </summary>
        public async Task<List<ChartDto>> GetPurchasesByBrandAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var purchases = await _context.Purchases
                .Include(p => p.Product)
                .ThenInclude(pr => pr.Brand)
                .Where(p => p.PurchaseDate >= startDate && p.PurchaseDate <= endDate)
                .ToListAsync();

            var purchasesByBrand = purchases
                .GroupBy(p => p.Product.Brand.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(p => p.CostPrice * p.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .ToList();

            return purchasesByBrand;
        }

        /// <summary>
        /// Kategori bazlı alışlar
        /// </summary>
        public async Task<List<ChartDto>> GetPurchasesByCategoryAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var purchases = await _context.Purchases
                .Include(p => p.Product)
                .ThenInclude(pr => pr.Category)
                .Where(p => p.PurchaseDate >= startDate && p.PurchaseDate <= endDate)
                .ToListAsync();

            var purchasesByCategory = purchases
                .GroupBy(p => p.Product.Category.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(p => p.CostPrice * p.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .ToList();

            return purchasesByCategory;
        }

        /// <summary>
        /// Aylık alışlar
        /// </summary>
        public async Task<List<ChartDto>> GetMonthlyPurchasesAsync(int year)
        {
            // Eğer veri yoksa, boş liste dön
            var purchasesExist = await _context.Purchases.AnyAsync();
            if (!purchasesExist)
            {
                return new List<ChartDto>();
            }

            // Eğer belirtilen yılda veri yoksa, en son alış yılını kullan
            var hasDataForYear = await _context.Purchases.AnyAsync(p => p.PurchaseDate.Year == year);
            if (!hasDataForYear)
            {
                var latestPurchase = await _context.Purchases.OrderByDescending(p => p.PurchaseDate).FirstOrDefaultAsync();
                if (latestPurchase != null)
                {
                    year = latestPurchase.PurchaseDate.Year;
                }
            }

            var monthlyPurchases = await _context.Purchases
                .Where(p => p.PurchaseDate.Year == year)
                .ToListAsync();

            var grouped = monthlyPurchases
                .GroupBy(p => p.PurchaseDate.Month)
                .Select(g => new ChartDto
                {
                    Label = g.Key.ToString(),
                    Value = g.Sum(p => p.CostPrice * p.Quantity)
                })
                .OrderBy(x => int.Parse(x.Label))
                .ToList();

            return grouped;
        }

        /// <summary>
        /// Tedarikçi bazlı alışlar (simülasyon)
        /// </summary>
        public async Task<List<ChartDto>> GetPurchasesBySupplierAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            // Simülasyon - gerçek tedarikçi verisi olmadığı için
            var suppliers = new List<ChartDto>
            {
                new ChartDto { Label = "Tedarikçi A", Value = 520000 },
                new ChartDto { Label = "Tedarikçi B", Value = 480000 },
                new ChartDto { Label = "Tedarikçi C", Value = 420000 },
                new ChartDto { Label = "Tedarikçi D", Value = 380000 },
                new ChartDto { Label = "Tedarikçi E", Value = 320000 }
            };

            return await Task.FromResult(suppliers);
        }

        /// <summary>
        /// En çok alınan ürünler
        /// </summary>
        public async Task<List<ChartDto>> GetTopPurchasedProductsAsync(int count = 10, DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var purchases = await _context.Purchases
                .Include(p => p.Product)
                .Where(p => p.PurchaseDate >= startDate && p.PurchaseDate <= endDate)
                .ToListAsync();

            var topProducts = purchases
                .GroupBy(p => p.Product.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(p => p.CostPrice * p.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .Take(count)
                .ToList();

            return topProducts;
        }
    }
}
