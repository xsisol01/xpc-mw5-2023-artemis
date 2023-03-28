namespace Eshop.webAPI.Models
{
    public class CommodityModel : ModelBase
    {
        private List<ReviewModel> reviews= new List<ReviewModel>();

        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public float? Price { get; set; }
        public float? Weight { get; set; }
        public int StockQuantity { get; set; }
        public CategoryModel Category { get; set; }
        public ProducerModel Manufacturer { get; set; }
        public List<ReviewModel>? Reviews { get { return reviews; }}

        public CommodityModel()
        {
            Id= Guid.NewGuid();
        }
        public void addReview(ReviewModel newReview)
        {
            reviews.Add(newReview);
        }

    }
}
