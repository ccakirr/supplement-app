namespace ReportProject.DTOs
{
    public class SalesSummaryDto
    {
        public decimal TotalSales { get; set; }
        public int TotalQuantity { get; set; }
        public decimal TotalProfit { get; set; }
        public decimal AverageOrderValue { get; set; }
        public int TotalOrders { get; set; }
    }
}
