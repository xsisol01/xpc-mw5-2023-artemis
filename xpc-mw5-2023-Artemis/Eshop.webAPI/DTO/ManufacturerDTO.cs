using System.ComponentModel.DataAnnotations;

namespace Eshop.webAPI.DTO
{
    public class CreateManufacturerDTO
    {
        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Manufacturer Name Is Too Long")]
        public string Name { get; set; }
    }

    public class ManufacturerDTO : CreateManufacturerDTO
    {
        public Guid Id { get; set; }
    }

}
