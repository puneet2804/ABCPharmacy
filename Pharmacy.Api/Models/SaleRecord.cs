namespace Pharmacy.Api.Models
{
    public record SaleRecord
    {
        public Guid Id { get; set; }
        public Guid MedicineId { get; set; }
        public string MedicineName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public DateTime SoldAt { get; set; }
    }
}
