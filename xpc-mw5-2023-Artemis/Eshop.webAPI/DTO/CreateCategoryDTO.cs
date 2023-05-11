using System.ComponentModel.DataAnnotations;

namespace Eshop.WebAPI.DTO
{
    public class CreateCategoryDTO
    {
        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Category Name Is Too Long")]
        public string? Name { get; set; }
    }
}
