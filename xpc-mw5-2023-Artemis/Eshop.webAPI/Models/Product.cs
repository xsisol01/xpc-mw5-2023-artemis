namespace Eshop.webAPI.Models
{
    public class Product : ModelBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public float? Price { get; set; }
        public float? Weight { get; set; }
        public int StockQuantity { get; set; }
        public CategoryModel Category { get; set; }
        public ProducerModel Producer { get; set; }
        public Rating Rating { get; set; }

        public static Product Empty => new()
        {
            Id = Guid.NewGuid(),
            Name = string.Empty,
            ImageUrl = string.Empty,
            Description = string.Empty,
            Price = null,
            Weight = null,
            StockQuantity = 0,
            Category = null,
            Producer = null,
            Rating = null


        };
    }
}
