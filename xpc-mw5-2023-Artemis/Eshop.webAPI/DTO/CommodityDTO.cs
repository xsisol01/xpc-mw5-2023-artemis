using Eshop.webAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace Eshop.webAPI.DTO
{
    public class CreateCommodityDTO
    {
        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Category Name Is Too Long")]
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public float? Price { get; set; }
        public float? Weight { get; set; }
        public int StockQuantity { get; set; }
        public CategoryModel Category { get; set; }
        public ManufacturerModel Manufacturer { get; set; }
    }

    public class CommodityDTO : CreateCommodityDTO
    {
        public Guid Id { get; set; }
    }
}
