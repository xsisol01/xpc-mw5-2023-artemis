namespace Eshop.WebAPI.Models
{
    public abstract class ModelBase : IModel
    {
        public Guid Id { get; set; }
    }
}
