namespace ReportProject.Models
{
	public class StockReportViewModel
	{
		public int id { get; set;}
		public string Name { get; set; }
		public string Brand {get; set; }
		public string Category { get; set; }
		public int Stock { get; set; }
		public decimal LatestPrice { get; set; }
		public decimal TotalStockValue {get; set; }
	}
}