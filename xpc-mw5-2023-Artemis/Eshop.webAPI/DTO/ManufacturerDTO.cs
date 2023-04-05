using Eshop.webAPI.FakeDB;
using Eshop.webAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace Eshop.webAPI.DTO
{
    public class CreateManufacturerDTO
    {
        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Manufacturer Name Is Too Long")]
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
    }

    public class ManufacturerDTO : CreateManufacturerDTO
    {
        
        public List<Guid> CommodityIds { get; set; }
        public Guid Id { get; set; }

        
    }

}
