namespace ReportProject.Models
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Barcode { get; set; }
		public int BrandId { get; set; }
		public Brand Brand { get; set; }
		public int CategoryId { get; set; }
		public Category Category { get; set; }
		public int Stock { get; set; }
		public DateTime ExpirationDate { get; set; }
		public ICollection<PriceRecord> PriceHistory { get; set; }
	}
}
