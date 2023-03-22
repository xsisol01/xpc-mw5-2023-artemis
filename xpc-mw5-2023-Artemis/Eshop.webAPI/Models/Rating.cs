namespace Eshop.webAPI.Models
{
    public class Rating : ModelBase
    {
        private int _stars;
        public string Text { get; set; }
        public required int Stars
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
