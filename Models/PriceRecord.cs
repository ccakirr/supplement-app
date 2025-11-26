namespace ReportProject.Models
{
	public class PriceRecord
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public Product Product { get; set; }
		public decimal CostPrice { get; set; }
		public decimal SalePrice { get; set; }
		public DateTime EffectiveDate { get; set; }
	}
}
