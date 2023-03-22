using System;

namespace Eshop.webAPI.Models


{
    public class ProducerModel : ModelBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public List<Product> Products { get; set; }
        
        public static ProducerModel Empty => new()
        {
            Id = Guid.NewGuid(),
            Name = string.Empty,
            ImageUrl = string.Empty,
            Description = string.Empty,
            Country = string.Empty,
            Products = new List<Product>()
        };

        
    }
}
