using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.DAL.Entities
{
    internal class ProducerEntity :EntityBase
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Country { get; set; }
        public ICollection<ProductEntity> Products { get; set; }
    }
}
