namespace Eshop.webAPI.Models
{
    public class CategoryModel : ModelBase
    {
        public string Name { get; set; }

        public CategoryModel()
        {
            Id = Guid.NewGuid();
        }

    }
}
