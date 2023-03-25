using System.ComponentModel.DataAnnotations;

namespace Eshop.webAPI.DTO
{
    public class CreateCategoryDTO
    {
        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Category Name Is Too Long")]
        public string Name { get; set; }
    }

    public class CategoryDTO : CreateCategoryDTO
    {
        public Guid Id { get; set; }
    }
    
}
