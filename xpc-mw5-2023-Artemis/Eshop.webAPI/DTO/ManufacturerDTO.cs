using System.ComponentModel.DataAnnotations;

namespace Eshop.WebAPI.DTO
{
    public class ManufacturerDTO : CreateManufacturerDTO
    {
        public Guid Id { get; set; }
        public List<Guid>? CommodityIds { get; set; }

        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Manufacturer Name Is Too Long")]
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public string? Country { get; set; }
    }

}
