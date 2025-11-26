namespace ReportProject.DTOs
{
	public class StockSummaryDto
	{
		public decimal TotalStockValue { get; set; }
		public int ExpiringIn3Months { get; set; }
		public int ExpiringIn12Months { get; set; }
		public int Expired { get; set; }
		public int TotalProducts { get; set; }
	}
	}
	