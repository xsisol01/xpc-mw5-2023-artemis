﻿

namespace Eshop.webAPI.Models
{
    public class Category : ModelBase
    {
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
