using System;

namespace Eshop.webAPI.Models


{
    public class ManufacturerModel : ModelBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public List<CommodityModel> Commodities { get; }

        public static ManufacturerModel Empty => new()
        {
            Id = Guid.NewGuid(),
        };


    }
}
