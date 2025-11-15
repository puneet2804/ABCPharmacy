namespace Pharmacy.Api.Models
{
    public record CreateSaleRequest
    {
        public Guid MedicineId { get; set; }
        public int Quantity { get; set; }
    }
}
