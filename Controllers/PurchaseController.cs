using Microsoft.AspNetCore.Mvc;
using ReportProject.Services;

namespace ReportProject.Controllers
{
    [Route("api/purchase")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly PurchaseService _purchaseService;

        public PurchaseController(PurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
        }

        /// <summary>
        /// Toplam alış tutarı
        /// </summary>
        [HttpGet("total")]
        public async Task<IActionResult> GetTotal([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var total = await _purchaseService.GetTotalPurchasesAsync(startDate, endDate);
            return Ok(new { total });
        }

        /// <summary>
        /// Alış özeti
        /// </summary>
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var summary = await _purchaseService.GetPurchaseSummaryAsync(startDate, endDate);
            return Ok(summary);
        }

        /// <summary>
        /// Marka bazlı alışlar
        /// </summary>
        [HttpGet("by-brand")]
        public async Task<IActionResult> GetByBrand([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _purchaseService.GetPurchasesByBrandAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Kategori bazlı alışlar
        /// </summary>
        [HttpGet("by-category")]
        public async Task<IActionResult> GetByCategory([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _purchaseService.GetPurchasesByCategoryAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Tedarikçi bazlı alışlar
        /// </summary>
        [HttpGet("by-supplier")]
        public async Task<IActionResult> GetBySupplier([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _purchaseService.GetPurchasesBySupplierAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Aylık alışlar
        /// </summary>
        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthly([FromQuery] int year = 0)
        {
            if (year == 0) year = DateTime.Now.Year;
            var data = await _purchaseService.GetMonthlyPurchasesAsync(year);
            return Ok(data);
        }

        /// <summary>
        /// En çok alınan ürünler
        /// </summary>
        [HttpGet("top-products")]
        public async Task<IActionResult> GetTopProducts([FromQuery] int count = 10, [FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var data = await _purchaseService.GetTopPurchasedProductsAsync(count, startDate, endDate);
            return Ok(data);
        }
    }
}
