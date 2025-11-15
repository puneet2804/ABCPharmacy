namespace Pharmacy.Api.Models
{
    public record MedicineDto
    {
        public string FullName { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string? Brand { get; set; }
    }
}
