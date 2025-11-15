using Microsoft.AspNetCore.Mvc;
using Pharmacy.Api.Data;
using Pharmacy.Api.Models;

namespace Pharmacy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : ControllerBase
    {
        private readonly JsonStore _store;

        public MedicinesController(JsonStore store)
        {
            _store = store;
        }

        [HttpGet]
        public IActionResult GetMedicines([FromQuery] string? name)
        {
            var meds = _store.Read<List<Medicine>>("medicines.json") ?? new List<Medicine>();
            if (!string.IsNullOrWhiteSpace(name))
            {
                var term = name.Trim().ToLowerInvariant();
                meds = meds.Where(m => m.FullName.ToLowerInvariant().Contains(term)).ToList();
            }
            return Ok(meds);
        }

        [HttpPost]
        public IActionResult CreateMedicine([FromBody] MedicineDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.FullName))
                return BadRequest("FullName is required.");
            if (dto.Price < 0 || dto.Quantity < 0)
                return BadRequest("Price and Quantity must be non-negative.");

            var meds = _store.Read<List<Medicine>>("medicines.json") ?? new List<Medicine>();

            var med = new Medicine
            {
                Id = Guid.NewGuid(),
                FullName = dto.FullName.Trim(),
                Notes = dto.Notes?.Trim() ?? string.Empty,
                ExpiryDate = dto.ExpiryDate.Date,
                Quantity = dto.Quantity,
                Price = Math.Round(dto.Price, 2, MidpointRounding.AwayFromZero),
                Brand = dto.Brand?.Trim() ?? string.Empty
            };

            meds.Add(med);
            _store.Write("medicines.json", meds);

            return Created($"/api/medicines/{med.Id}", med);
        }
    }
}
