namespace Eshop.webAPI.Models
{
    public class ReviewModel : ModelBase
    {
        public int Stars { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }

        public ReviewModel()
        {
            Id = Guid.NewGuid();
        }
    }
}
