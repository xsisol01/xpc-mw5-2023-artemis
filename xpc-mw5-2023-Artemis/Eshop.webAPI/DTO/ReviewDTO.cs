namespace Eshop.WebAPI.DTO
{
    public class ReviewDTO
    {
        public Guid Id { get; set; }

        public int Stars { get; set; }
        public string? Description { get; set; }
        public string? Title { get; set; }
    }


}
