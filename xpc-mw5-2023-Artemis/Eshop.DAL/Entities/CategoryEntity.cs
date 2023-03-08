using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.DAL.Entities
{
    internal class CategoryEntity
    {
        private string Name { get; set; }

        private ICollection<ProductEntity>  Products { get; set; }
    }
}
