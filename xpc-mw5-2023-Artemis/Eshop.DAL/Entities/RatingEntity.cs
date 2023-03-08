using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.DAL.Entities
{
    internal class RatingEntity
    {
        private int _stars;
        public string Text { get; set; }
        public int Stars
        {
            get { return _stars; }
            set
            {
                if (value < 1 || value > 5)
                {
                    throw new ArgumentException("Star rating must be between 1 and 5.");
                }
            }
        }
    }
}
