using System;
using System.Text.Json.Serialization;

namespace Eshop.webAPI.Models
{
    public abstract class ModelBase : IModel
    {
        public Guid Id { get; set; }
    }
}
