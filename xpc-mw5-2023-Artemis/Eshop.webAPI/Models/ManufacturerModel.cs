using System;

namespace Eshop.webAPI.Models


{
    public class ManufacturerModel : ModelBase
    {
        private readonly List<CommodityModel> _commodities = new List<CommodityModel>();
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public List<CommodityModel> Commodities { get; }

        public ManufacturerModel()
        {
            Id = Guid.NewGuid();
        }

        public void addCommodity(CommodityModel commodity)
        {
            _commodities.Add(commodity);
        }

    }
}
