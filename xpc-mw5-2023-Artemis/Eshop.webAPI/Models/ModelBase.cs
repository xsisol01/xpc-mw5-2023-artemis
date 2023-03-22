using System;

namespace Eshop.webAPI.Models
{
    public abstract class ModelBase : IModel
    {
        public Guid Id { get; set; }
    }
}
