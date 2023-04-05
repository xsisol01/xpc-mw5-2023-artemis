namespace Eshop.webAPI.DTO
{
    public class CreateReviewDTO
    {
        public int Stars { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
    }
    public class ReviewDTO : CreateReviewDTO
    {
        public Guid Id { get; set; }
    }


}
