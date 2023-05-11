namespace Eshop.WebAPI.Models
{
    public class CommodityModel : ModelBase
    {
        private readonly List<ReviewModel> _reviews = new List<ReviewModel>();

        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public float? Price { get; set; }
        public float? Weight { get; set; }
        public int StockQuantity { get; set; }
        public float? AverageRating
        {
            get
            {
                int sum = 0;
                int reviewsCount = _reviews.Count();
                if (reviewsCount > 0)
                {
                    foreach (ReviewModel review in _reviews)
                    {
                        sum = sum + review.Stars;
                    }
                    return sum / reviewsCount;
                }

                return 0;
            }
        }
        public CategoryModel Category { get; set; }
        public ManufacturerModel Manufacturer { get; set; }
        public List<ReviewModel>? Reviews { get { return _reviews; } }


        public void addReview(ReviewModel review)
        {
            _reviews.Add(review);
        }

    }
}
