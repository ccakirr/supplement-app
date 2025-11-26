namespace ReportProject.DTOs
{
    public class PurchaseSummaryDto
    {
        public decimal TotalPurchases { get; set; }
        public int TotalQuantity { get; set; }
        public decimal AveragePurchaseValue { get; set; }
        public int TotalOrders { get; set; }
    }
}
