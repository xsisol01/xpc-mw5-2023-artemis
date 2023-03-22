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

        public ProducerModel(string name, string imageUrl, string description, string country)
        {
            Id= Guid.NewGuid();
            Name= name;
            ImageUrl= imageUrl;
            Description= description;
            Country= country;
            Products= new List<Product>();
        }


        
    }
}
