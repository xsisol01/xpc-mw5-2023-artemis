using System;

namespace Eshop.webAPI.Models
{
    public abstract class EntityBase : IEntity
    {
        public int Id { get; set; }
    }
}
