using System;

namespace Eshop.DAL.Entities
{
    internal abstract record EntityBase : IEntity
    {
        public Guid Id { get; set; }
    }
}
