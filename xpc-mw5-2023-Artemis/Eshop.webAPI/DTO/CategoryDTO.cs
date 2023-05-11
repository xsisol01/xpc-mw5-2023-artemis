using System.ComponentModel.DataAnnotations;

namespace Eshop.webAPI.DTO
{
    public class CategoryDTO
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Category Name Is Too Long")]
        public string? Name { get; set; }
    }

}
