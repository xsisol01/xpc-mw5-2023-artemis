using Eshop.WebAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace Eshop.WebAPI.DTO
{
    public class CommodityDTO
    {
        public Guid Id { get; set; }
        public float AverageRating { get; set; }
        public List<ReviewModel>? Reviews { get; set; }

        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Category Name Is Too Long")]
        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public float? Price { get; set; }
        public float? Weight { get; set; }
        public int StockQuantity { get; set; }
        public Guid CategoryId { get; set; }
        public Guid ManufacturerId { get; set; }

    }
}
