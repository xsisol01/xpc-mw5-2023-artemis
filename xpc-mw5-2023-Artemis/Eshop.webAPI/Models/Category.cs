

namespace Eshop.webAPI.Models
{
    internal class Category : EntityBase
    {
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
