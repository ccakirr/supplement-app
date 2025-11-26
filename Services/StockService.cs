using ReportProject.Data;
using ReportProject.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ReportProject.Services
{
    public class StockService
    {
        private readonly AppDbContext _context;

        public StockService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Genel stok durumu özetini hesaplar
        /// </summary>
        public async Task<StockSummaryDto> GetStockSummaryAsync()
        {
            var today = DateTime.Today;
            var in3Months = today.AddMonths(3);
            var in12Months = today.AddMonths(12);

            var products = await _context.Products
                .Include(p => p.PriceHistory)
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .ToListAsync();

            decimal totalStockValue = 0;
            int expiringIn3Months = 0;
            int expiringIn12Months = 0;
            int expired = 0;

            foreach (var product in products)
            {
                var latestPrice = product.PriceHistory?
                    .Where(ph => ph.EffectiveDate <= today)
                    .OrderByDescending(ph => ph.EffectiveDate)
                    .FirstOrDefault();

                if (latestPrice != null)
                {
                    totalStockValue += product.Stock * latestPrice.SalePrice;
                }

                if (product.ExpirationDate < today)
                {
                    expired++;
                }
                else if (product.ExpirationDate <= in3Months)
                {
                    expiringIn3Months++;
                }
                else if (product.ExpirationDate <= in12Months)
                {
                    expiringIn12Months++;
                }
            }

            return new StockSummaryDto
            {
                TotalStockValue = totalStockValue,
                ExpiringIn3Months = expiringIn3Months,
                ExpiringIn12Months = expiringIn12Months,
                Expired = expired,
                TotalProducts = products.Count
            };
        }

        /// <summary>
        /// Kritik stok listesi (stok < 10)
        /// </summary>
        public async Task<List<ChartDto>> GetCriticalStockAsync()
        {
            var criticalStock = await _context.Products
                .Include(p => p.Brand)
                .Where(p => p.Stock < 10)
                .Select(p => new ChartDto
                {
                    Label = p.Name,
                    Value = (decimal)p.Stock
                })
                .ToListAsync();

            return criticalStock.OrderBy(x => x.Value).Take(12).ToList();
        }

        /// <summary>
        /// Stok devir hızı (simülasyon)
        /// </summary>
        public async Task<StockTurnoverDto> GetStockTurnoverAsync()
        {
            // Simülasyon - gerçek hesaplama için satış ve stok geçmişi gerekir
            return await Task.FromResult(new StockTurnoverDto
            {
                Daily = 0.42m,
                Weekly = 1.06m,
                Monthly = 2.14m,
                Yearly = 4.24m
            });
        }

        /// <summary>
        /// SKT durumu analizi
        /// </summary>
        public async Task<SktAnalysisDto> GetSktAnalysisAsync()
        {
            var today = DateTime.Today;
            var in2Months = today.AddMonths(2);
            var in6Months = today.AddMonths(6);
            var in12Months = today.AddMonths(12);

            var products = await _context.Products
                .Include(p => p.PriceHistory)
                .ToListAsync();

            var analysis = new SktAnalysisDto
            {
                Expiring2Months = 0,
                Expiring6Months = 0,
                Expiring12Months = 0,
                Expired = 0,
                TotalStock = 0,
                Expiring2MonthsValue = 0,
                Expiring6MonthsValue = 0,
                Expiring12MonthsValue = 0,
                ExpiredValue = 0,
                TotalStockValue = 0
            };

            foreach (var product in products)
            {
                var latestPrice = product.PriceHistory?
                    .Where(ph => ph.EffectiveDate <= today)
                    .OrderByDescending(ph => ph.EffectiveDate)
                    .FirstOrDefault();

                var value = latestPrice != null ? product.Stock * latestPrice.SalePrice : 0;

                if (product.ExpirationDate < today)
                {
                    analysis.Expired++;
                    analysis.ExpiredValue += value;
                }
                else if (product.ExpirationDate <= in2Months)
                {
                    analysis.Expiring2Months++;
                    analysis.Expiring2MonthsValue += value;
                }
                else if (product.ExpirationDate <= in6Months)
                {
                    analysis.Expiring6Months++;
                    analysis.Expiring6MonthsValue += value;
                }
                else if (product.ExpirationDate <= in12Months)
                {
                    analysis.Expiring12Months++;
                    analysis.Expiring12MonthsValue += value;
                }

                analysis.TotalStock++;
                analysis.TotalStockValue += value;
            }

            return analysis;
        }

        /// <summary>
        /// Marka bazlı stok dağılımı
        /// </summary>
        public async Task<List<ChartDto>> GetStockByBrandAsync()
        {
            var stockByBrand = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.PriceHistory)
                .GroupBy(p => p.Brand.Name)
                .Select(g => new
                {
                    Brand = g.Key,
                    Products = g.ToList()
                })
                .ToListAsync();

            var result = new List<ChartDto>();
            var today = DateTime.Today;

            foreach (var group in stockByBrand)
            {
                decimal totalValue = 0;
                foreach (var product in group.Products)
                {
                    var latestPrice = product.PriceHistory?
                        .Where(ph => ph.EffectiveDate <= today)
                        .OrderByDescending(ph => ph.EffectiveDate)
                        .FirstOrDefault();

                    if (latestPrice != null)
                    {
                        totalValue += product.Stock * latestPrice.SalePrice;
                    }
                }

                result.Add(new ChartDto
                {
                    Label = group.Brand,
                    Value = totalValue
                });
            }

            return result.OrderByDescending(x => x.Value).ToList();
        }

        /// <summary>
        /// Kategori bazlı stok dağılımı
        /// </summary>
        public async Task<List<ChartDto>> GetStockByCategoryAsync()
        {
            var stockByCategory = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.PriceHistory)
                .GroupBy(p => p.Category.Name)
                .Select(g => new
                {
                    Category = g.Key,
                    Products = g.ToList()
                })
                .ToListAsync();

            var result = new List<ChartDto>();
            var today = DateTime.Today;

            foreach (var group in stockByCategory)
            {
                decimal totalValue = 0;
                foreach (var product in group.Products)
                {
                    var latestPrice = product.PriceHistory?
                        .Where(ph => ph.EffectiveDate <= today)
                        .OrderByDescending(ph => ph.EffectiveDate)
                        .FirstOrDefault();

                    if (latestPrice != null)
                    {
                        totalValue += product.Stock * latestPrice.SalePrice;
                    }
                }

                result.Add(new ChartDto
                {
                    Label = group.Category,
                    Value = totalValue
                });
            }

            return result.OrderByDescending(x => x.Value).ToList();
        }
    }
}
