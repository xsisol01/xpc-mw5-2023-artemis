using System;

namespace Eshop.webAPI.Models
{
    internal abstract class EntityBase : IEntity
    {
        public Guid Id { get; set; }
    }
}
