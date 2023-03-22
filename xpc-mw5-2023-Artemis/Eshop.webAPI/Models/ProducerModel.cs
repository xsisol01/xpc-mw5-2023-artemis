namespace Eshop.webAPI.Models

{
    public class Producer : EntityBase
    {
        public string Name { get; set; }
        public int ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public List<Product> Products { get; set; }
    }
}
