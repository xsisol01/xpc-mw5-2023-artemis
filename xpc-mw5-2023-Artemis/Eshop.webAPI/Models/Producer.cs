namespace Eshop.webAPI.Models
{
    internal class Producer : EntityBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Country { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
