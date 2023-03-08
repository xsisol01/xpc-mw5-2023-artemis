using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.DAL.Entities
{
    internal class ProductEntity
    {
        //TODO implementaion of IEntity = ID

        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public float Weight { get; set; }
        public int StockQuantity { get; set; }
        public CategoryEntity Category { get; set; }
        public ProducerEntity Producer { get; set; }
        public RatingEntity Rating { get; set; }


    }
}
