using ReportProject.Data;
using ReportProject.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ReportProject.Services
{
    public class SalesService
    {
        private readonly AppDbContext _context;

        public SalesService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Satış özeti - toplam satış, miktar, kar
        /// </summary>
        public async Task<SalesSummaryDto> GetSalesSummaryAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var sales = await _context.Sales
                .Include(s => s.Product)
                .ThenInclude(p => p.Brand)
                .Include(s => s.Product)
                .ThenInclude(p => p.Category)
                .Include(s => s.Customer)
                .Where(s => s.SaleDate >= startDate && s.SaleDate <= endDate)
                .ToListAsync();

            var totalSales = sales.Sum(s => s.UnitPrice * s.Quantity);
            var totalQuantity = sales.Sum(s => s.Quantity);
            var totalProfit = sales.Sum(s => (s.UnitPrice * s.Quantity) - (s.UnitPrice * 0.7m * s.Quantity));

            return new SalesSummaryDto
            {
                TotalSales = totalSales,
                TotalQuantity = totalQuantity,
                TotalProfit = totalProfit,
                AverageOrderValue = sales.Any() ? totalSales / sales.Count : 0,
                TotalOrders = sales.Count
            };
        }

        /// <summary>
        /// Marka bazlı satışlar
        /// </summary>
        public async Task<List<ChartDto>> GetSalesByBrandAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var sales = await _context.Sales
                .Include(s => s.Product)
                .ThenInclude(p => p.Brand)
                .Where(s => s.SaleDate >= startDate && s.SaleDate <= endDate)
                .ToListAsync();

            var salesByBrand = sales
                .GroupBy(s => s.Product.Brand.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(s => s.UnitPrice * s.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .ToList();

            return salesByBrand;
        }

        /// <summary>
        /// Kategori bazlı satışlar
        /// </summary>
        public async Task<List<ChartDto>> GetSalesByCategoryAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var sales = await _context.Sales
                .Include(s => s.Product)
                .ThenInclude(p => p.Category)
                .Where(s => s.SaleDate >= startDate && s.SaleDate <= endDate)
                .ToListAsync();

            var salesByCategory = sales
                .GroupBy(s => s.Product.Category.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(s => s.UnitPrice * s.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .ToList();

            return salesByCategory;
        }

        /// <summary>
        /// Müşteri bazlı satışlar
        /// </summary>
        public async Task<List<ChartDto>> GetSalesByCustomerAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Where(s => s.SaleDate >= startDate && s.SaleDate <= endDate)
                .ToListAsync();

            var salesByCustomer = sales
                .GroupBy(s => s.Customer.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(s => s.UnitPrice * s.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .ToList();

            return salesByCustomer;
        }

        /// <summary>
        /// Aylık satışlar (yıllık)
        /// </summary>
        public async Task<List<ChartDto>> GetMonthlySalesAsync(int year)
        {
            // Eğer veri yoksa, mevcut yılı kullan
            var salesExist = await _context.Sales.AnyAsync();
            if (!salesExist)
            {
                return new List<ChartDto>();
            }

            // Eğer belirtilen yılda veri yoksa, en son satış yılını kullan
            var hasDataForYear = await _context.Sales.AnyAsync(s => s.SaleDate.Year == year);
            if (!hasDataForYear)
            {
                var latestSale = await _context.Sales.OrderByDescending(s => s.SaleDate).FirstOrDefaultAsync();
                if (latestSale != null)
                {
                    year = latestSale.SaleDate.Year;
                }
            }

            var monthlySales = await _context.Sales
                .Where(s => s.SaleDate.Year == year)
                .ToListAsync();

            var grouped = monthlySales
                .GroupBy(s => s.SaleDate.Month)
                .Select(g => new ChartDto
                {
                    Label = g.Key.ToString(),
                    Value = g.Sum(s => s.UnitPrice * s.Quantity)
                })
                .OrderBy(x => int.Parse(x.Label))
                .ToList();

            return grouped;
        }

        /// <summary>
        /// En çok satan ürünler
        /// </summary>
        public async Task<List<ChartDto>> GetTopSellingProductsAsync(int count = 10, DateTime? startDate = null, DateTime? endDate = null)
        {
            var today = DateTime.Today;
            startDate ??= today.AddMonths(-1);
            endDate ??= today;

            var sales = await _context.Sales
                .Include(s => s.Product)
                .Where(s => s.SaleDate >= startDate && s.SaleDate <= endDate)
                .ToListAsync();

            var topProducts = sales
                .GroupBy(s => s.Product.Name)
                .Select(g => new ChartDto
                {
                    Label = g.Key,
                    Value = g.Sum(s => s.UnitPrice * s.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .Take(count)
                .ToList();

            return topProducts;
        }

        /// <summary>
        /// Satış kanalı bazlı satışlar (simülasyon)
        /// </summary>
        public async Task<List<ChartDto>> GetSalesByChannelAsync(DateTime? startDate = null, DateTime? endDate = null)
        {
            // Simülasyon - gerçek kanal verisi olmadığı için
            var channels = new List<ChartDto>
            {
                new ChartDto { Label = "Online Mağaza", Value = 450000 },
                new ChartDto { Label = "Fiziksel Mağaza", Value = 380000 },
                new ChartDto { Label = "Toptan Satış", Value = 320000 },
                new ChartDto { Label = "Bayi", Value = 280000 }
            };

            return await Task.FromResult(channels);
        }
    }
}
