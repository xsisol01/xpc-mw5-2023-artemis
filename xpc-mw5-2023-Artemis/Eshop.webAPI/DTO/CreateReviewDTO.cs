namespace Eshop.WebAPI.DTO
{
    public class CreateReviewDTO
    {
        public int Stars { get; set; }
        public string? Description { get; set; }
        public string? Title { get; set; }
    }
}
