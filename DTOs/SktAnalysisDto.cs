namespace ReportProject.DTOs
{
    public class SktAnalysisDto
    {
        public int Expiring2Months { get; set; }
        public int Expiring6Months { get; set; }
        public int Expiring12Months { get; set; }
        public int Expired { get; set; }
        public int TotalStock { get; set; }

        public decimal Expiring2MonthsValue { get; set; }
        public decimal Expiring6MonthsValue { get; set; }
        public decimal Expiring12MonthsValue { get; set; }
        public decimal ExpiredValue { get; set; }
        public decimal TotalStockValue { get; set; }
    }
}
