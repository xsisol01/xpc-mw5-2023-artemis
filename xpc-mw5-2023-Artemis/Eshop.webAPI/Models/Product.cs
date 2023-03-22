namespace Eshop.webAPI.Models
{
    public class Product : EntityBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public float Weight { get; set; }
        public int StockQuantity { get; set; }
        public Category Category { get; set; }
        public Producer Producer { get; set; }
        public Rating Rating { get; set; }

    }
}
