using Microsoft.AspNetCore.Mvc;
using Pharmacy.Api.Data;
using Pharmacy.Api.Models;

namespace Pharmacy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly JsonStore _store;

        public SalesController(JsonStore store)
        {
            _store = store;
        }

        [HttpPost]
        public IActionResult CreateSale([FromBody] CreateSaleRequest request)
        {
            if (request.Quantity <= 0)
                return BadRequest("Quantity must be > 0");

            var meds = _store.Read<List<Medicine>>("medicines.json") ?? new List<Medicine>();
            var target = meds.FirstOrDefault(m => m.Id == request.MedicineId);
            if (target is null)
                return NotFound("Medicine not found");
            if (target.Quantity < request.Quantity)
                return BadRequest("Insufficient stock for this sale");

            target.Quantity -= request.Quantity;

            var sales = _store.Read<List<SaleRecord>>("sales.json") ?? new List<SaleRecord>();
            var sale = new SaleRecord
            {
                Id = Guid.NewGuid(),
                MedicineId = target.Id,
                MedicineName = target.FullName,
                Quantity = request.Quantity,
                UnitPrice = target.Price,
                SoldAt = DateTime.UtcNow
            };

            sales.Add(sale);
            _store.Write("medicines.json", meds);
            _store.Write("sales.json", sales);

            return Ok(sale);
        }

        [HttpGet]
        public IActionResult GetSales()
        {
            var sales = _store.Read<List<SaleRecord>>("sales.json") ?? new List<SaleRecord>();
            return Ok(sales.OrderByDescending(s => s.SoldAt));
        }
    }
}
