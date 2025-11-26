namespace ReportProject.Models
{
	public class Customer
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		public ICollection<Sale> Sales { get; set; }
	}
}
