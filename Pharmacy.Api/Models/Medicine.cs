namespace Pharmacy.Api.Models
{
    public record Medicine
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty; // not shown in grid
        public DateTime ExpiryDate { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Brand { get; set; } = string.Empty;
    }
}
