using System;

namespace Eshop.webAPI.Models


{
    public class ProducerModel : ModelBase
    {
        public static ProducerModel Empty => new()
        {
            Id = Guid.NewGuid(),
            Name = string.Empty,
            Description = string.Empty
        };

        public string Name { get; set; }
        public int ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public List<Product> Products { get; set; }
    }
}
