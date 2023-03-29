namespace Eshop.webAPI.Models
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
        public CategoryModel Category { get; set; }
        public ManufacturerModel Manufacturer { get; set; }
        public List<ReviewModel>? Reviews { get { return _reviews; }}

        public CommodityModel()
        {
            Id= Guid.NewGuid();
        }
        public void addReview(ReviewModel review)
        {
            _reviews.Add(review);
        }

    }
}
