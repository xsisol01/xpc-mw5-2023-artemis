

namespace Eshop.webAPI.Models
{
    public class Category : ModelBase
    {
        public string Name { get; set; }




        public static Category Empty => new()
        {
            Id = Guid.NewGuid(),
            Name = string.Empty
        };

    }
}
