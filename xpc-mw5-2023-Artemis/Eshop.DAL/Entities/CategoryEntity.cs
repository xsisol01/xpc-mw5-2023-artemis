using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.DAL.Entities
{
    internal class CategoryEntity : EntityBase
    {
        public string Name { get; set; }
        public ICollection<ProductEntity>  Products { get; set; }
    }
}
