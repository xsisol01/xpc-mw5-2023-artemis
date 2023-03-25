

namespace Eshop.webAPI.Models
{
    public class Category : ModelBase
    {
        public string Name { get; set; }

        public Category()
        {
            Id= Guid.NewGuid();
        }

    }
}
