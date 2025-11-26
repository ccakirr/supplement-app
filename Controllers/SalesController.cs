using Microsoft.AspNetCore.Mvc;
using ReportProject.Services;

namespace ReportProject.Controllers
{
    [Route("api/sales")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesService _salesService;

        public SalesController(SalesService salesService)
        {
            _salesService = salesService;
        }

        /// <summary>
        /// Satış özeti
        /// </summary>
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var summary = await _salesService.GetSalesSummaryAsync(startDate, endDate);
            return Ok(summary);
        }

        /// <summary>
        /// Marka bazlı satışlar
        /// </summary>
        [HttpGet("by-brand")]
        public async Task<IActionResult> GetByBrand([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _salesService.GetSalesByBrandAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Kategori bazlı satışlar
        /// </summary>
        [HttpGet("by-category")]
        public async Task<IActionResult> GetByCategory([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _salesService.GetSalesByCategoryAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Müşteri bazlı satışlar
        /// </summary>
        [HttpGet("by-customer")]
        public async Task<IActionResult> GetByCustomer([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _salesService.GetSalesByCustomerAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Satış kanalı bazlı satışlar
        /// </summary>
        [HttpGet("by-channel")]
        public async Task<IActionResult> GetByChannel([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var data = await _salesService.GetSalesByChannelAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Aylık satışlar
        /// </summary>
        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthly([FromQuery] int year = 0)
        {
            if (year == 0) year = DateTime.Now.Year;
            var data = await _salesService.GetMonthlySalesAsync(year);
            return Ok(data);
        }

        /// <summary>
        /// En çok satan ürünler
        /// </summary>
        [HttpGet("top-products")]
        public async Task<IActionResult> GetTopProducts([FromQuery] int count = 10, [FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var data = await _salesService.GetTopSellingProductsAsync(count, startDate, endDate);
            return Ok(data);
        }
    }
}
